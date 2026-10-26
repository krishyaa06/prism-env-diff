<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:3EE69A,100:FFC857&height=200&section=header&text=Prism%20Env%20Diff&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Compare%20%C2%B7%20Lint%20%C2%B7%20Generate%20.env.example&descAlignY=58&descSize=16" width="100%" alt="Prism Env Diff" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=3EE69A&center=true&vCenter=true&width=680&lines=3+keys+missing+from+.env;GROQ_API_KEY+defined+twice;Secrets+masked+by+default;Generate+a+safe+.env.example" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-env-diff/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-env-diff/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-env-diff/"><img src="https://img.shields.io/badge/Live_Demo-Open-3EE69A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-3EE69A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-env-diff?style=for-the-badge&color=FFC857" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Env Diff screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" />

## ⚡ Overview

**Prism Env Diff** catches the classic "works on my machine" bug: a missing or empty environment variable. Paste the expected `.env.example` and the actual `.env`, and every key is labelled missing, empty, extra, changed or matching. A linter flags duplicates, unclosed quotes, unquoted spaces and odd casing, and a generator turns a real `.env` into a shareable example with secrets removed. Nothing leaves your browser.

## ✨ Features

- **Diff** with statuses: missing, empty, extra, changed, same
- **dotenv-compatible parser** — `export`, single/double quotes, inline comments, multiline values
- **Lint** duplicates, syntax errors, unclosed quotes, unquoted spaces, key casing
- **Secrets masked** by default (keys matching SECRET/TOKEN/KEY/PASSWORD/DSN…)
- **.env.example generator** that blanks secrets and normalises URLs
- Runs locally — values never leave the page

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Env Diff on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Env Diff on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-env-diff/](https://krishyaa06.github.io/prism-env-diff/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-env-diff.git
cd prism-env-diff
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Paste your `.env.example` on the left and `.env` on the right.
2. Read the comparison table and fix anything **missing** or **empty**.
3. Use **Generate .env.example** to produce a safe template from your real file.

## 📁 Project Structure

```
prism-env-diff/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # parser, diff, lint, example generator — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Env Diff is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFC857,50:3EE69A,100:07060f&height=110&section=footer" width="100%" />
