# Halila website

A small multi-page marketing site (Uzbek + Russian, light/dark) with a lead form
that delivers each submission to your **Telegram group** via a bot.

```
lead-site/
├─ public/                # front-end (static)
│  ├─ index.html          # Home / landing (hero, benefits, previews)
│  ├─ products.html       # Products + photos + descriptions
│  ├─ sales.html          # Tariflar — Silver / Gold / Gold Plus packages
│  ├─ reviews.html        # YouTube client reviews
│  ├─ contact.html        # Contact info (phone + socials) + lead form
│  ├─ privacy.html        # Privacy policy
│  ├─ styles.css          # all styling (brand colors at the top)
│  ├─ script.js           # NAV menu + all text (I18N) + behavior
│  └─ img/                # logos, favicon, product photo placeholder
│
│  The header & footer are the SAME on every page, so they are built once
│  in script.js (the NAV list) and injected into each page. Edit the menu
│  in ONE place — no need to touch every .html file.
├─ server.js              # Express backend — validates & forwards leads to Telegram
├─ .env                   # your secrets (git-ignored) — fill this in
├─ .env.example           # template with instructions
└─ package.json
```

## Editing the site yourself

- **Change any text** → open `public/script.js`, find the `I18N` object near the
  top. Every word is there in `uz` (Uzbek) and `ru` (Russian). Edit the value next
  to its key (e.g. `"land.h1b"`). In the HTML, that text is tagged `data-i18n`.
- **Change a product photo** → put your image in `public/img/` and update the
  `<img src="img/...">` in `index.html` / `products.html` (currently
  `img/placeholder.svg`).
- **Add/replace a review video** → in `reviews.html` (or `index.html`), set
  `data-yt="YOUR_YOUTUBE_ID"` on an `<article class="ytvideo">` line. The ID is the
  code after `watch?v=` in a YouTube link. Slots left as `data-yt="VIDEO_ID"` show
  an empty placeholder.
- **Add a product or video** → copy one existing `<article>` block and edit it.
- **Brand colors** → CSS variables at the top of `public/styles.css` (`--brand`, …).
- **Logos** → replace `public/img/logo-black.png` (light) and `logo-white.png` (dark).
- **Navigation menu** → the `NAV` list at the top of `public/script.js`. Add,
  remove, or reorder links there once and every page updates.

## 1. Install

Requires **Node.js 18+** (uses the built-in `fetch`).

```bash
cd lead-site
npm install
```

## 2. Configure credentials

Open `.env` and fill in the values.

1. In Telegram, message **@BotFather** → `/newbot` → copy the **bot token**
   into `TELEGRAM_BOT_TOKEN`.
2. Add the bot to your group (it must be a member to post).
3. Get the group **chat id** (negative number, e.g. `-1001234567890`):
   add **@RawDataBot** to the group and read `"chat":{"id": ...}`, then remove it.
   Put it in `TELEGRAM_CHAT_ID`.

## 3. Run

```bash
npm start
# or, auto-restart on changes:
npm run dev
```

Open <http://localhost:3000>, submit the form, and confirm the message appears in
your Telegram group. Check delivery status anytime at <http://localhost:3000/health>.

## How it works

- The browser posts JSON to `POST /api/lead`.
- `server.js` validates input, blocks spam via a hidden honeypot field and a
  per-IP rate limit (5/min), then calls the Telegram `sendMessage` API.
- The bot token lives only on the server (in `.env`) — never exposed to the browser.

## Languages (Uzbek / Russian)

The site ships in **Uzbek and Russian** with a `UZ / RU` switcher in the nav.
The default follows the visitor's browser language (Russian → RU, otherwise UZ)
and remembers their choice in `localStorage`.

All copy lives in one place — the `I18N` object at the top of
`public/script.js`. Each visible string has a `data-i18n` key in `index.html`.
To edit wording or add a third language, update those two spots; no other code
changes are needed. The Telegram notification is sent in Uzbek — edit the
`lines` array in `sendToTelegram()` in `server.js` to change it.

## Deploying

Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as environment variables on your
host (never commit `.env`). Always serve over HTTPS. Two ready-made options:

### Render (free tier)

1. Push this folder to a GitHub repo.
2. In Render → **New → Blueprint**, point it at the repo. It reads
   [`render.yaml`](render.yaml) automatically.
3. In the service's **Environment** tab, add `TELEGRAM_BOT_TOKEN` and
   `TELEGRAM_CHAT_ID`. Deploy. Render provides `PORT` automatically.

### Docker (any host: VPS, Railway, Fly.io, …)

```bash
docker build -t halila-lead-site .
docker run -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e TELEGRAM_CHAT_ID=-100xxxxxxxxxx \
  halila-lead-site
```

The container exposes port 3000 and has a `/health` endpoint for health checks.

## Customizing

- **Logos:** swap the files in `public/img/` (`logo-black.png` for light mode,
  `logo-white.png` for dark mode).
- **Brand colors:** edit the CSS variables at the top of `public/styles.css`
  (`--brand`, `--brand-strong`, etc.) for each theme.
- **Copy / translations:** the `I18N` object in `public/script.js`.
- **Form fields:** add the field in `index.html`, include it in the `data` object
  in `public/script.js`, and map it in `validate()` / `sendToTelegram()` in `server.js`.
