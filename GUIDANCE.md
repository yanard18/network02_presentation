# 🟩 Hack The Box (HTB) Modular Slide Deck — AI Agent & Developer Guidance

This document is the official guidance for AI agents (LLMs) and developers building presentations using the `slide_base/` template.

---

## 🎯 Architecture & Overview

The `slide_base/` project uses **Reveal.js** customized with an official **Hack The Box (HTB) Cyber Dark Theme**. It provides a 100% modular slide deck architecture designed for zero code duplication, fast compilation, and visual brand consistency.

### Key Architectural Concepts
1. **Modular Slides**: Each slide lives as an isolated HTML snippet inside `slides/*.html`.
2. **Master Sequence Manifest**: `slides/slides.json` specifies the exact order of slides in the presentation.
3. **Compilation Script**: `scripts/build.js` reads `slides/slides.json` and injects all slides into `<div class="slides">...</div>` inside `index.html`.
4. **Design Tokens & Utility Classes**: All visual styling, typography, cards, badges, grids, and terminal windows are defined in `css/cyber-theme.css`.
5. **No Inline JS in Slides**: Slide HTML files contain 100% clean markup. Interactive JavaScript logic is placed in `js/` modules and imported at the bottom of `index.html`.

---

## 📁 Repository Directory Map

```
slide_base/
├── index.html                   # 🚀 Main compiled Reveal.js slide deck
├── media/                       # 🖼️ Media assets (Images, GIFs, SVGs)
├── slides/                      # 🧩 Modular HTML Slide Files
│   ├── title.html               # Title slide
│   ├── agenda.html              # Roadmap / Agenda slide
│   ├── slides.json              # 📋 Master slide sequence manifest
│   └── summary.html             # Closing summary slide
├── templates/                   # 📋 7 Copy-Paste Modular Slide Templates
│   ├── 01_standard_card_slide.html
│   ├── 02_terminal_code_slide.html
│   ├── 03_image_diagram_slide.html
│   ├── 04_warning_threat_slide.html
│   ├── 05_vertical_nested_slides.html
│   ├── 06_comparison_table_slide.html
│   └── 07_interactive_simulator_slide.html
├── css/
│   └── cyber-theme.css          # 🎨 Visual design system & utility classes
├── js/
│   └── cyber-bg.js              # 🌌 Animated HTB particle grid canvas background
├── scripts/
│   └── build.js                 # ⚡ Node builder script for compiling slides into index.html
├── GUIDANCE.md                  # 🤖 AI Agent & Developer Instructions (This file)
├── package.json                 # npm build & start commands
└── README.md
```

---

## ⚡ Slide Workflow for AI Agents & Developers

### Creating a New Slide

1. **Select a Template**: Choose the appropriate template from `templates/`:
   - `01_standard_card_slide.html` — Standard 2-column card layout.
   - `02_terminal_code_slide.html` — Explanation card + HTB styled code block / terminal.
   - `03_image_diagram_slide.html` — Text card + diagram showcase frame.
   - `04_warning_threat_slide.html` — Problem (threat card) vs Solution (secure card).
   - `05_vertical_nested_slides.html` — Vertical sub-slides for deep-dive topics.
   - `06_comparison_table_slide.html` — Row-by-row feature comparison list.
   - `07_interactive_simulator_slide.html` — Interactive JavaScript simulator layout.

2. **Create the Slide File**: Save your HTML snippet inside `slides/` (e.g. `slides/01_introduction.html`).
   > ⚠️ **Rule**: Slide markup MUST be wrapped inside a `<section>` element.

3. **Register in `slides/slides.json`**: Add the filename to `slides/slides.json` in your desired sequence order:
   ```json
   [
     "title.html",
     "agenda.html",
     "01_introduction.html",
     "summary.html"
   ]
   ```

4. **Compile the Presentation**: Run the build script:
   ```bash
   npm run build
   ```

---

## 🎨 Design System Tokens & Typography

All tokens are managed via CSS variables in `css/cyber-theme.css`:

### Color Palette
- **HTB Primary Green**: `--htb-green: #9FEF00;` (`.highlight-htb`, `.badge-htb`)
- **Cyan Accent**: `--accent-cyan: #2de2e6;` (`.highlight-cyan`, `.badge-cyan`)
- **Red Threat Accent**: `--accent-red: #ff2e63;` (`.highlight-red`, `.badge-red`)
- **Purple Accent**: `--accent-purple: #9d4edd;` (`.highlight-purple`, `.badge-purple`)
- **Yellow Accent**: `--accent-yellow: #ffb703;` (`.highlight-yellow`)
- **Background Dark**: `--htb-bg-dark: #0a1224;`
- **Card Background**: `--htb-bg-card: #132238;` (Hover: `--htb-bg-card-hover: #1b3252;`)
- **Terminal Background**: `--htb-bg-terminal: #070e1b;`
- **Text Primary**: `--text-main: #e2e8f0;`
- **Text Muted**: `--text-muted: #94a3b8;`

### Typography Stack
- **Headings**: `'Space Grotesk', sans-serif`
- **Body Text**: `'Inter', sans-serif`
- **Monospace / Code**: `'Fira Code', monospace`

---

## 🛠️ Reusable CSS Utility Class Reference

### 1. Layout Grids
- `.grid-2`: 2 equal columns grid (`grid-template-columns: 1fr 1fr`).
- `.grid-3`: 3 equal columns grid (`grid-template-columns: 1fr 1fr 1fr`).
- `.grid-2-asym`: Asymmetric 60/40 column split (60% text/content, 40% side panel).
- `.slide-center`: Centered container (`max-width: 920px; margin: 0 auto;`).

### 2. Cyber Cards
- `.cyber-card`: Standard HTB card container with green left border, subtle shadow, and hover glow.
- `.cyber-card.threat`: Red-themed card for vulnerabilities, threats, or security alerts.
- `.cyber-card.secure`: Green/cyan-themed card for hardened features or solutions.
- `.card-title`: Header element inside cards.

### 3. Badges & Prompts
```html
<span class="cyber-badge badge-htb">HTB GREEN</span>
<span class="cyber-badge badge-cyan">CYAN ACCENT</span>
<span class="cyber-badge badge-red">THREAT RED</span>
<span class="cyber-badge badge-purple">PURPLE ACCENT</span>
```

### 4. Bullet Prompts
- Default Prompt `[+]`: `<ul><li>List item</li></ul>`
- Secure Checkmark `[✓]`: `<ul class="secure-list"><li>Secure feature</li></ul>`
- Threat Alert `[!]`: `<ul class="threat-list"><li>Vulnerability item</li></ul>`

### 5. Text Highlight Utilities
- `<span class="highlight-htb">Green text</span>`
- `<span class="highlight-cyan">Cyan text</span>`
- `<span class="highlight-red">Red text</span>`
- `<span class="highlight-purple">Purple text</span>`
- `<span class="highlight-yellow">Yellow text</span>`
- `<h1 style="..."><span class="htb-highlight">Highlighted Title</span></h1>`

### 6. Terminal & Code Windows
```html
<div class="terminal-header">
  <span class="terminal-dot dot-red"></span>
  <span class="terminal-dot dot-yellow"></span>
  <span class="terminal-dot dot-green"></span>
  <span class="terminal-title">root@htb:~# command</span>
</div>
<pre><code class="language-http">GET /index.html HTTP/1.1
Host: target.htb</code></pre>
```

### 7. Diagrams & Images
```html
<div class="diagram-box">
  <img src="media/my_diagram.png" class="diagram-img" alt="Diagram">
  <div class="diagram-caption">
    <i class="fa-solid fa-diagram-project highlight-htb"></i> Figure 1: System Overview
  </div>
</div>
```
*(Use `.diagram-box-cyan` or `.diagram-box-red` for cyan or red borders)*

### 8. Protocol Row Comparison
```html
<div class="comparison-list">
  <div class="comparison-row">
    <strong>• Feature Name:</strong> <span class="highlight-htb">New Spec</span> vs. <span class="highlight-red">Old Spec</span>
  </div>
</div>
```

---

## 🤖 Strict Rules for AI Agents (LLM Instructions)

1. **Always wrap slide content in `<section>` tags**: Every slide file in `slides/` must begin with `<section>` and end with `</section>`.
2. **Never inline `<script>` tags in slides**: Keep slide HTML purely structural. Put JS logic in `js/` and reference it in `index.html`.
3. **Always register slides in `slides/slides.json`**: If you create a file `slides/05_topic.html`, you MUST add `"05_topic.html"` into `slides/slides.json`.
4. **Always run `npm run build` after changes**: Never leave `index.html` out of sync with `slides/`.
5. **Maintain High Visual Contrast**: Use dark backgrounds, crisp white headings, HTB green highlights, and `Fira Code` font for technical terms.
6. **Use FontAwesome Icons**: Enhance headings and badges with FontAwesome icons (`<i class="fa-solid fa-layer-group highlight-htb"></i>`).
