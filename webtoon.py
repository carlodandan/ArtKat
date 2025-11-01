import requests
from bs4 import BeautifulSoup
import json
import sys
import os
from urllib.parse import urlparse

def scrape_webtoon(url):
    """Scrape webtoon data from a given URL"""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        r = requests.get(url, headers=headers, timeout=10)
        r.raise_for_status()
    except requests.RequestException as e:
        print(f"❌ Error fetching URL: {e}")
        return None

    soup = BeautifulSoup(r.text, "html.parser")
    
    # Detect the platform from the URL
    if "/canvas/" in url:
        platform = "canvas"
    elif "/originals/" in url:
        platform = "originals"
    else:
        platform = "unknown"

    # Extract metadata
    title = soup.select_one("meta[property='og:title']")
    description = soup.select_one("meta[property='og:description']")
    poster = soup.select_one("meta[property='og:image']")

    if not all([title, description, poster]):
        print("❌ Could not extract all required metadata from the page")
        return None

    # Format description with consistent ending
    description_text = description.get("content", "").strip()
    if not description_text.endswith("—Wanna know more? Click 'Read on Webtoon' button."):
        description_text += "—Wanna know more? Click 'Read on Webtoon' button."

    data = {
        "title": title.get("content", "").strip(),
        "description": description_text,
        "poster": poster.get("content", ""),
        "platform": platform,
        "url": url
    }

    return data

def main():
    if len(sys.argv) != 2:
        print("Usage: python webtoon.py <webtoon_url>")
        print("Example: python webtoon.py \"https://www.webtoons.com/en/canvas/two-suns-apart/list?title_no=1098714\"")
        sys.exit(1)

    url = sys.argv[1]
    
    # Validate URL
    parsed = urlparse(url)
    if not parsed.scheme or not parsed.netloc:
        print("❌ Invalid URL provided")
        sys.exit(1)

    # Define the webtoon.json path
    webtoon_json_path = "artkat/src/data/webtoon.json"
    
    # Check if the file exists
    if not os.path.exists(webtoon_json_path):
        print(f"❌ webtoon.json not found at: {webtoon_json_path}")
        print("Please make sure you're running this script from the correct directory")
        sys.exit(1)

    # Scrape the webtoon data
    print(f"🔍 Scraping webtoon data from: {url}")
    new_webtoon = scrape_webtoon(url)
    
    if not new_webtoon:
        print("❌ Failed to scrape webtoon data")
        sys.exit(1)

    # Load existing data
    try:
        with open(webtoon_json_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        print("❌ Error reading existing webtoon.json, initializing new file")
        existing_data = []

    # Check if this webtoon already exists (by URL)
    existing_urls = [item.get("url", "") for item in existing_data]
    if new_webtoon["url"] in existing_urls:
        print("⚠️  This webtoon already exists in webtoon.json")
        # Update the existing entry instead of adding duplicate
        for i, item in enumerate(existing_data):
            if item.get("url") == new_webtoon["url"]:
                existing_data[i] = new_webtoon
                print("✅ Updated existing webtoon entry")
                break
    else:
        # Add new webtoon to the END of the list
        existing_data.append(new_webtoon)
        print("✅ Added new webtoon to the end of webtoon.json")

    # Save updated data
    try:
        with open(webtoon_json_path, "w", encoding="utf-8") as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=2)
        print(f"💾 Successfully updated: {webtoon_json_path}")
        print(f"📊 Total webtoons in collection: {len(existing_data)}")
    except Exception as e:
        print(f"❌ Error saving to webtoon.json: {e}")
        sys.exit(1)

    # Print the added/updated webtoon info
    print("\n📖 Webtoon Details:")
    print(f"   Title: {new_webtoon['title']}")
    print(f"   Platform: {new_webtoon['platform']}")
    print(f"   Description: {new_webtoon['description'][:100]}...")

if __name__ == "__main__":
    main()