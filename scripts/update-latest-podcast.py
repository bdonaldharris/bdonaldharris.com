#!/usr/bin/env python3
"""Update the homepage podcast proof point from a public YouTube playlist feed."""

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
OUTPUT_PATH = ROOT / "content" / "latest-podcast.json"
NAMESPACES = {
    "atom": "http://www.w3.org/2005/Atom",
    "media": "http://search.yahoo.com/mrss/",
    "yt": "http://www.youtube.com/xml/schemas/2015",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--playlist-id",
        default=os.environ.get("YOUTUBE_PLAYLIST_ID", ""),
        help="Public YouTube playlist ID (or set YOUTUBE_PLAYLIST_ID).",
    )
    parser.add_argument("--feed-file", type=Path, help="Read a local feed fixture instead.")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    return parser.parse_args()


def read_feed(playlist_id: str, feed_file: Path | None) -> bytes:
    if feed_file:
        return feed_file.read_bytes()
    if not playlist_id:
        raise ValueError("A YouTube playlist ID is required.")

    feed_url = "https://www.youtube.com/feeds/videos.xml?" + urlencode(
        {"playlist_id": playlist_id}
    )
    request = Request(feed_url, headers={"User-Agent": "bdonaldharris.com podcast updater"})
    with urlopen(request, timeout=30) as response:
        return response.read()


def text(entry: ET.Element, path: str) -> str:
    node = entry.find(path, NAMESPACES)
    return node.text.strip() if node is not None and node.text else ""


def latest_episode(feed: bytes) -> dict[str, str]:
    root = ET.fromstring(feed)
    entry = root.find("atom:entry", NAMESPACES)
    if entry is None:
        raise ValueError("The playlist feed did not contain any episodes.")

    video_id = text(entry, "yt:videoId")
    title = text(entry, "atom:title")
    description = text(entry, "media:group/media:description").split("\n\n", 1)[0]
    published_at = text(entry, "atom:published")
    link = entry.find("atom:link[@rel='alternate']", NAMESPACES)
    url = link.get("href", "") if link is not None else ""

    if not video_id or not title or not url:
        raise ValueError("The newest playlist entry is missing required fields.")

    return {
        "videoId": video_id,
        "title": title,
        "description": description or "A new conversation from BIT Voices Podcast.",
        "url": url,
        "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg",
        "publishedAt": published_at,
    }


def main() -> int:
    args = parse_args()
    try:
        episode = latest_episode(read_feed(args.playlist_id, args.feed_file))
    except (OSError, ValueError, ET.ParseError) as error:
        print(f"Podcast update failed: {error}", file=sys.stderr)
        return 1

    args.output.parent.mkdir(parents=True, exist_ok=True)
    previous = args.output.read_text() if args.output.exists() else ""
    updated = json.dumps(episode, indent=2, ensure_ascii=False) + "\n"
    if updated == previous:
        print(f"Already current: {episode['title']}")
        return 0

    args.output.write_text(updated)
    print(f"Updated latest episode: {episode['title']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
