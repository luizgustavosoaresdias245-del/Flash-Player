# Flash Player Extension (Pure JS Engine)

A custom, open-source Chromium extension built under Manifest V3 designed to intercept, parse, and render legacy `.swf` (Flash) files directly within modern web pages using a custom JavaScript-based engine, completely independent of heavy external runtimes like Ruffle.

---

## 🚀 Overview

Modern browsers completely dropped native support for NPAPI plugins years ago, leaving millions of legacy web animations, interactive widgets, and retro games broken. While major preservation projects rely on heavy WebAssembly emulators, this repository explores an alternative approach: a native, modular extension architecture combined with a custom JavaScript engine pipeline to process and render SWF bytes directly onto an HTML5 `<canvas>`.

Whether you are here to examine the source code, audit the Manifest V3 structure, or contribute to solving the complex binary parsing and ActionScript execution pipeline, your contributions are welcome!

---

## 📂 Project Architecture

The extension is structured cleanly without bloated subfolders, adhering to standard Manifest V3 development requirements:

```text
flash-player-extension/
├── manifest.json       # Core extension configuration (Manifest V3)
├── content.js          # DOM injector and native Flash element interceptor
├── embed.js            # Page-context communication bridge for binary fetching
├── engine.js           # Custom JavaScript engine and SWF parser pipeline
├── popup.html          # Extension popup UI structure
├── popup.js            # Extension popup logic and state management
├── viewer.html         # Dedicated standalone viewer page for raw SWF playback
├── icon.png            # Extension branding icon
├── LICENSE             # Creative Commons licensing terms
└── README.md           # Project documentation and developer guide
