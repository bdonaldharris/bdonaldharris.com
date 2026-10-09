#!/usr/bin/env python3
"""Generate the Home Media artifact from three public YouTube playlist feeds."""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import sys
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "content" / "media.json"
NAMESPACES = {
    "atom": "http://www.w3.org/2005/Atom",
    "media": "http://search.yahoo.com/mrss/",
    "yt": "http://www.youtube.com/xml/schemas/2015",
}


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

    feed_url = "https://www.youtube.com/feeds/videos.xml?" + urlencode({"playlist_id": playlist_id})
    request = Request(feed_url, headers={"User-Agent": "bdonaldharris.com media updater"})
    with urlopen(request, timeout=30) as response:
        return response.read()


def text(entry: ET.Element, path: str) -> str:
    node = entry.find(path, NAMESPACES)
    return node.text.strip() if node is not None and node.text else ""


def parse_entries(feed: bytes, *, format: str, limit: int) -> list[dict[str, str]]:
    root = ET.fromstring(feed)
    items: list[dict[str, str]] = []

    for entry in root.findall("atom:entry", NAMESPACES)[:limit]:
        video_id = text(entry, "yt:videoId")
        title = text(entry, "atom:title")
        description = text(entry, "media:group/media:description").split("\n\n", 1)[0]
        published_at = text(entry, "atom:published")
        link = entry.find("atom:link[@rel='alternate']", NAMESPACES)
        url = link.get("href", "") if link is not None else ""

        if not video_id or not title or not url:
            raise ValueError("A playlist entry is missing required video data.")

        items.append(
            {
                "videoId": video_id,
                "title": title,
                "description": description,
                "url": url,
                "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg",
                "publishedAt": published_at,
                "format": format,
            }
        )

    return items


def main() -> int:
    args = parse_args()
    try:
        featured = parse_entries(
            read_feed(args.podcast_playlist_id, args.podcast_feed_file), format="landscape", limit=1
        )
        if not featured:
            raise ValueError("The Podcast playlist did not contain any episodes.")
        recent_videos = parse_entries(
            read_feed(args.recent_videos_playlist_id, args.recent_videos_feed_file), format="landscape", limit=4
        )
        recent_videos = [
            item for item in recent_videos if item["videoId"] != featured[0]["videoId"]
        ][:3]
        shorts = parse_entries(
            read_feed(args.shorts_playlist_id, args.shorts_feed_file), format="short", limit=3
        )
    except (OSError, ValueError, ET.ParseError) as error:
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
