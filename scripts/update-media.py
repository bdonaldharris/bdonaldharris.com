#!/usr/bin/env python3
"""Generate the Home Media artifact from three public YouTube playlist pages."""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import sys
from urllib.parse import urlencode
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "content" / "media.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--podcast-playlist-id", default=os.environ.get("YOUTUBE_PODCAST_PLAYLIST_ID", ""))
    parser.add_argument("--recent-videos-playlist-id", default=os.environ.get("YOUTUBE_RECENT_VIDEOS_PLAYLIST_ID", ""))
    parser.add_argument("--shorts-playlist-id", default=os.environ.get("YOUTUBE_SHORTS_PLAYLIST_ID", ""))
    parser.add_argument("--podcast-feed-file", type=Path)
    parser.add_argument("--recent-videos-feed-file", type=Path)
    parser.add_argument("--shorts-feed-file", type=Path)
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    return parser.parse_args()


def read_feed(playlist_id: str, feed_file: Path | None) -> bytes:
    if feed_file:
        return feed_file.read_bytes()
    if not playlist_id:
        raise ValueError("A YouTube playlist ID is required.")

    page_url = "https://www.youtube.com/playlist?" + urlencode({"list": playlist_id})
    request = Request(page_url, headers={"User-Agent": "Mozilla/5.0 (compatible; bdonaldharris.com media updater)", "Accept-Language": "en-US,en;q=0.9"})
    with urlopen(request, timeout=30) as response:
        return response.read()


def extract_initial_data(page: bytes) -> dict:
    html = page.decode("utf-8", errors="replace")
    marker = "var ytInitialData = "
    start = html.find(marker)
    if start == -1:
        raise ValueError("The playlist page did not contain playlist data.")
    data, _ = json.JSONDecoder().raw_decode(html[start + len(marker):])
    return data


def find_renderers(node: object) -> list[dict]:
    found: list[dict] = []
    if isinstance(node, dict):
        for key, value in node.items():
            if key == "playlistVideoRenderer" and isinstance(value, dict):
                found.append(value)
            else:
                found.extend(find_renderers(value))
    elif isinstance(node, list):
        for value in node:
            found.extend(find_renderers(value))
    return found


def load_previous(path: Path) -> dict[str, dict[str, str]]:
    if not path.exists():
        return {}
    try:
        artifact = json.loads(path.read_text())
    except ValueError:
        return {}
    items = [artifact.get("featuredPodcast", {})] + artifact.get("recentVideos", []) + artifact.get("shorts", [])
    return {item["videoId"]: item for item in items if isinstance(item, dict) and item.get("videoId")}


def parse_entries(
    page: bytes, *, format: str, limit: int, previous: dict[str, dict[str, str]] | None = None
) -> list[dict[str, str]]:
    previous = previous or {}
    items: list[dict[str, str]] = []

    for renderer in find_renderers(extract_initial_data(page))[:limit]:
        video_id = renderer.get("videoId", "")
        runs = renderer.get("title", {}).get("runs", [])
        title = "".join(run.get("text", "") for run in runs).strip()

        if not video_id or not title:
            raise ValueError("A playlist entry is missing required video data.")

        known = previous.get(video_id, {})
        url = (
            f"https://www.youtube.com/shorts/{video_id}"
            if format == "short"
            else f"https://www.youtube.com/watch?v={video_id}"
        )
        items.append(
            {
                "videoId": video_id,
                "title": title,
                "description": known.get("description", ""),
                "url": url,
                "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg",
                "publishedAt": known.get("publishedAt", ""),
                "format": format,
            }
        )

    return items


def main() -> int:
    args = parse_args()
    previous = load_previous(args.output)
    try:
        featured = parse_entries(
            read_feed(args.podcast_playlist_id, args.podcast_feed_file), format="landscape", limit=1, previous=previous
        )
        if not featured:
            raise ValueError("The Podcast playlist did not contain any episodes.")
        recent_videos = parse_entries(
            read_feed(args.recent_videos_playlist_id, args.recent_videos_feed_file), format="landscape", limit=4, previous=previous
        )
        recent_videos = [
            item for item in recent_videos if item["videoId"] != featured[0]["videoId"]
        ][:3]
        shorts = parse_entries(
            read_feed(args.shorts_playlist_id, args.shorts_feed_file), format="short", limit=3, previous=previous
        )
    except (OSError, ValueError) as error:
        print(f"Media update failed: {error}", file=sys.stderr)
        return 1

    artifact = {
        "featuredPodcast": featured[0],
        "recentVideos": recent_videos,
        "shorts": shorts,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    previous = args.output.read_text() if args.output.exists() else ""
    updated = json.dumps(artifact, indent=2, ensure_ascii=False) + "\n"
    if updated == previous:
        print("Media artifact is already current.")
        return 0

    args.output.write_text(updated)
    print("Updated Media artifact.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
