import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { PORT = 3000, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const telegramEnabled = Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static(path.join(__dirname, "public")));

// ── Tiny in-memory rate limiter: max 5 submissions / minute / IP ──────────────
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
}

// ── Validation helpers ────────────────────────────────────────────────────────
const clean = (v, maxLen) => String(v ?? "").trim().slice(0, maxLen);

function validate(body) {
  const errors = {};
  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const problem = clean(body.problem, 1000);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (phone.replace(/[^\d]/g, "").length < 6)
    errors.phone = "Please enter a valid phone number.";
  if (problem.length < 2) errors.problem = "Please describe your problem.";

  return { errors, data: { name, phone, problem } };
}

// ── Telegram delivery ─────────────────────────────────────────────────────────
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendToTelegram({ name, phone, problem }) {
  const lines = [
    "🟢 <b>Target saytdan yangi ariza</b>",
    "",
    `👤 <b>Ism:</b> ${escapeHtml(name)}`,
    `📞 <b>Telefon:</b> ${escapeHtml(phone)}`,
    `🩺 <b>Muammo:</b> ${escapeHtml(problem)}`,
  ];

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) {
    throw new Error(`Telegram error: ${json.description || res.status}`);
  }
  return json.result?.message_id;
}

// ── Lead endpoint ─────────────────────────────────────────────────────────────
app.post("/api/lead", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;

  // Honeypot: bots fill hidden fields; humans never see them.
  if (clean(req.body.company, 100)) {
    return res.json({ ok: true }); // silently accept & drop
  }

  if (rateLimited(ip)) {
    return res
      .status(429)
      .json({ ok: false, error: "Too many requests. Please try again shortly." });
  }

  const { errors, data } = validate(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors });
  }

  if (!telegramEnabled) {
    console.error("Telegram is not configured. Check TELEGRAM_* in your .env file.");
    return res
      .status(500)
      .json({ ok: false, error: "Server is not configured to receive leads." });
  }

  try {
    await sendToTelegram(data);
    return res.json({ ok: true });
  } catch (err) {
    console.error("[telegram]", err?.message || err);
    return res.status(502).json({
      ok: false,
      error: "We couldn't submit your request. Please try again later.",
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, telegram: telegramEnabled });
});

app.listen(PORT, () => {
  console.log(`\n  Lead site running on  http://localhost:${PORT}`);
  console.log(
    `  Telegram delivery: ${telegramEnabled ? "ON" : "OFF (set TELEGRAM_* in .env)"}\n`
  );
});
