# 🟩 Hack The Box (HTB) Modular Presentation Base Deck

A modular, scalable, dark cyber-themed slide presentation base built with [Reveal.js](https://revealjs.com/) and styled in **Hack The Box (HTB)** visual brand identity.

This repository serves as a base slide deck (`slide_base/`) that can be duplicated to create new presentations.

---

## 📁 Repository Architecture

```
slide_base/
├── index.html                   # 🚀 Main compiled Reveal.js slide deck
├── media/                       # 🖼️ Centralized Media Assets (Images, GIFs, SVGs)
├── slides/                      # 🧩 Modular HTML Slide Files
│   ├── title.html
│   ├── agenda.html
│   ├── slides.json              # 📋 Master Slide Sequence Manifest
│   └── summary.html
├── templates/                   # 📋 7 Copy-Paste Modular Slide Templates
│   ├── 01_standard_card_slide.html
│   ├── 02_terminal_code_slide.html
│   ├── 03_image_diagram_slide.html
│   ├── 04_warning_threat_slide.html
│   ├── 05_vertical_nested_slides.html
│   ├── 06_comparison_table_slide.html
│   └── 07_interactive_simulator_slide.html
├── css/
│   └── cyber-theme.css          # 🎨 HTB Visual Tokens, Component Engine & Utilities
├── js/
│   └── cyber-bg.js              # 🌌 HTB Animated Node Mesh Background Canvas
├── scripts/
│   └── build.js                 # ⚡ Compiles slides/*.html into index.html
├── GUIDANCE.md                  # 🤖 AI Agent & Developer Guidelines
├── package.json                 # npm build & start scripts
└── README.md
```

---

## 🚀 Quick Start & Usage

### 1. Duplicate Base Template
To create a new presentation deck from `slide_base`:
```bash
cp -r slide_base my_new_presentation
cd my_new_presentation
```

### 2. Run Presentation
```bash
npm start
# or
npm run build && npx serve . -l 3000
```
Open `http://localhost:3000` in your web browser.

### 3. Add New Slides
1. Add any images, diagrams, or SVGs into `media/`.
2. Pick a template from `templates/` (e.g. `templates/01_standard_card_slide.html`).
3. Create a new HTML slide in `slides/` (e.g. `slides/01_topic.html`).
4. Register the new slide filename in `slides/slides.json`.
5. Run `npm run build` to re-compile `index.html`.

---

## ⌨️ Presentation Keyboard Shortcuts
- **Next / Prev Slide**: `Space`, `Right Arrow` `→`, `Left Arrow` `←`
- **Slide Overview**: Press `ESC` or `O`
- **Fullscreen Mode**: Press `F`
- **Speaker Notes**: Press `S`

---

## 📖 LLM / AI Guidance
For detailed design system rules, CSS utility classes, layout patterns, and AI instructions, refer to **[GUIDANCE.md](file:///home/mek/Documents/web_slides/slide_base/GUIDANCE.md)**.
