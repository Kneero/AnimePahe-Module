
# AnimePahe Streaming Module

This is a custom streaming module for anime from [AnimePahe](https://animepahe.com), designed for use with streaming frontends like **Sora**.

## Features

- HLS stream playback
- Prioritized quality selection (360p / 480p)
- Subtitle support (.vtt / .srt)
- Works asynchronously

## Config Format

Example `module.json`:

```json
{
  "sourceName": "AnimePahe (ENG SUB)",
  "iconUrl": "https://animepahe.com/static/img/icon/apple-touch-icon.png",
  "author": {
    "name": "MartinsGPT",
    "icon": "https://animepahe.com/static/img/icon/apple-touch-icon.png",
    "url": "https://animepahe.com"
  },
  "version": "1.1.0",
  "language": "English (SUB)",
  "streamType": "HLS",
  "quality": "360p / 480p",
  "preferredQualities": ["480p", "360p"],
  "type": "anime",
  "baseUrl": "https://animepahe.com/",
  "searchBaseUrl": "https://animepahe.com/api?m=search&q=%s",
  "scriptUrl": "https://raw.githubusercontent.com/Kneero/AnimePahe-Module/main/AnimePahe.js",
  "asyncJS": true,
  "streamAsyncJS": true,
  "softsub": true
}
```

## License

MIT License
