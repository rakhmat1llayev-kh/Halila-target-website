/*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ Halila website — main script                                            │
  │                                                                         │
  │ EDIT TEXT:   the I18N object below — every word, in "uz" and "ru".       │
  │ EDIT MENU:   the NAV list below — add / remove / rename header links.    │
  │ EDIT IMAGES: in the .html files, change <img src="...">                  │
  │ EDIT VIDEOS: in the .html files, set data-yt="YOUR_YOUTUBE_ID"           │
  │                                                                         │
  │ The header and footer are the SAME on every page, so they are built     │
  │ here once (see "renderChrome") and dropped into each page's              │
  │ <div id="site-header"></div> and <div id="site-footer"></div>.          │
  └─────────────────────────────────────────────────────────────────────────┘
*/
(function () {
  "use strict";

  // ===========================================================================
  // MENU — edit this list to change the header links (order matters).
  //   href = page address, page = id used to highlight the active link,
  //   key  = which text to show (from I18N below).
  // ===========================================================================
  const NAV = [
    { href: "index.html", page: "home", key: "nav.home" },
    { href: "products.html", page: "products", key: "nav.products" },
    { href: "sales.html", page: "sales", key: "nav.sales" },
    { href: "reviews.html", page: "reviews", key: "nav.reviews" },
    { href: "contact.html", page: "contact", key: "nav.contact" },
  ];
  // Footer shows the same links as the header nav.
  const FOOTER_LINKS = NAV;

  // ===========================================================================
  // Social profiles + phone — shown in the footer on EVERY page (and on
  // the Contact page). Edit the URLs / number here in ONE place.
  // ===========================================================================
  const SOCIAL = {
    youtube: "https://www.youtube.com/@halila_uz",
    instagram: "https://www.instagram.com/halila.uz/",
    telegram: "https://t.me/+ug1vmKzglNY4MmM6",
  };
  const PHONE = { display: "+998 78 113 88 11", tel: "+998781138811" };
  const ICON = {
    youtube:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    telegram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3 2 10.5l6 2.2L18 6 10 13.5V20l3.5-3.2L19 21z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/></svg>',
  };

  // ===========================================================================
  // TEXT / TRANSLATIONS — edit any wording here.
  // ===========================================================================
  const I18N = {
    uz: {
      "meta.title": "Halila — Mahsulotlar va sharhlar",
      "meta.desc":
        "Halila mahsulotlari, mijozlar video sharhlari va tezkor aloqa — bir joyda.",

      // Menu
      "nav.home": "Bosh sahifa",
      "nav.products": "Mahsulotlar",
      "nav.sales": "Tariflar",
      "nav.reviews": "Sharhlar",
      "nav.contact": "Aloqa",
      "nav.privacy": "Maxfiylik siyosati",
      "nav.cta": "Ariza qoldirish",

      // Landing hero
      "land.h1a": "Sifatli mahsulotlar — ",
      "land.h1b": "ishonchli natija.",
      "land.lead":
        "Halila mahsulotlari bilan tanishing, mijozlarimiz sharhlarini ko'ring va bir necha soniyada ariza qoldiring.",
      "tick.1": "Sifat kafolati",
      "tick.2": "Tezkor yetkazib berish",
      "tick.3": "Mijozlarning ijobiy sharhlari",

      // Home: "leave your number" callback block
      "call.h1a": "Raqamingizni qoldiring — ",
      "call.h1b": "biz o'zimiz qo'ng'iroq qilamiz.",
      "call.lead":
        "Ism va telefon raqamingizni qoldiring. Halila jamoasi ish vaqtida <strong>15 daqiqa ichida</strong> siz bilan bog'lanadi.",
      "call.tick1": "Tez javob — kutib o'tirmaysiz",
      "call.tick2": "Spam yo'q, hech qanday majburiyat yo'q",
      "call.tick3": "Ma'lumotlaringiz maxfiy saqlanadi",

      // Home: "why us" benefits
      "home.benTitle": "Nega Halila?",
      "home.benSub": "Bizning asosiy afzalliklarimiz.",
      "ben1t": "100% tabiiy",
      "ben1d": "Faqat sifatli va tabiiy tarkib.",
      "ben2t": "Sertifikatlangan",
      "ben2d": "Mahsulotlarimiz rasmiy sertifikatlarga ega.",
      "ben3t": "Ilmiy yondashuv",
      "ben3d": "Zamonaviy va ishonchli texnologiyalar.",

      // Home: section previews
      "home.prodTitle": "Bizning mahsulotlar",
      "home.prodSub": "Eng ko'p tanlanadigan mahsulotlar.",
      "home.prodAll": "Barcha mahsulotlar →",
      "home.revTitle": "Mijozlar sharhlari",
      "home.revSub": "Mijozlarimiz mahsulotimiz haqida.",
      "home.revAll": "Barcha sharhlar →",

      // Home: installment / payment strip
      "home.payTitle": "Bo'lib to'lash imkoniyati",
      "home.payText": "0% ustama bilan 12 oygacha qulay bo'lib to'lang.",

      // Products page
      "products.title": "Mahsulotlar",
      "products.sub": "Tabiat kuchidagi Halila mahsulotlari bilan batafsil tanishing.",
      "prod.order": "Buyurtma berish",
      "prod.more": "Batafsil",

      // Real products (shared on home + products page)
      "p.h60.n": "Halila 60+",
      "p.h60.d":
        "60 dan ortiq tabiiy giyoh va minerallar asosida yaralar, o'simtalar va onkologik kasalliklarni davolashda samarali pasta.",
      "p.geniy.n": "Halila Geniy",
      "p.geniy.d":
        "Halila \"Geniy\" miyadagi va yurakdagi qon tomirlarni ochadi, zehni kuchaytirib, xotirani va ko'rishni yaxshilaydi.",
      "p.yara.n": "Yara ma'juni",
      "p.yara.d":
        "Halila \"Yara ma'juni\" ichki va tashqi yaralarni, o'smalarni quritadi va saraton yara shakllarini to'xtatadi.",
      "p.azorik.n": "Azorik pastasi",
      "p.azorik.d":
        "Azorik pastasi suyak va mushaklarni quvvatlantiradi, oshqozon va ichak faoliyatini yaxshilab, kistalarni quritadi.",
      "p.sirop.n": "Halila Sirop",
      "p.sirop.d":
        "Halila siropi saraton va boshqa onkologik kasalliklarni davolashda, jigar va taloqni tozalashda, shuningdek, garmonal buzilishlarda yordam beradi.",

      // Tariffs / Packages page (was "Sales")
      "sales.title": "Tariflar va to'plamlar",
      "sales.sub":
        "Har bir tarifda bir nechta Halila mahsuloti birga keladi — eng mosini tanlang.",
      "tariff.includes": "Tarkibida:",
      "tariff.popular": "Ommabop",
      "tariff.best": "Eng to'liq",
      "tariff.order": "Buyurtma berish",
      "tf.silver.n": "Silver",
      "tf.silver.u": "3 ta mahsulot",
      "tf.silver.d": "Boshlash uchun ideal — asosiy 3 ta mahsulot.",
      "tf.gold.n": "Gold",
      "tf.gold.u": "4 ta mahsulot",
      "tf.gold.d": "Kengaytirilgan davolash uchun to'liqroq to'plam.",
      "tf.goldplus.n": "Gold Plus",
      "tf.goldplus.u": "6 ta mahsulot",
      "tf.goldplus.d": "Maksimal natija uchun eng to'liq to'plam.",

      // Reviews page
      "reviews.title": "Mijozlar sharhlari",
      "reviews.sub":
        "Mahsulotimizdan foydalangan mijozlarimizning video sharhlari.",

      // Privacy page
      "privacy.title": "Maxfiylik siyosati",
      "privacy.body":
        "<p>Bu — namuna matni. Uni o'z kompaniyangiz qoidalari bilan almashtiring.</p><h2>Qanday ma'lumot to'playmiz</h2><p>Saytdagi ariza orqali yuborilgan ism va telefon raqami.</p><h2>Ma'lumotlardan foydalanish</h2><p>Ma'lumotlar faqat siz bilan bog'lanish uchun ishlatiladi va uchinchi shaxslarga berilmaydi.</p>",

      // Lead form
      "card.title": "Ariza qoldiring",
      "card.sub": "Bu atigi 10 soniya.",
      "label.name": "Ism",
      "label.phone": "Telefon",
      "ph.name": "Ismingiz",
      "btn.submit": "Yuborish",
      "success.title": "Rahmat!",
      "success.text":
        "Raqamingizni qabul qildik va tez orada siz bilan bog'lanamiz.",
      "success.again": "Yana yuborish",

      // Contact page
      "contact.title": "Aloqa",
      "contact.sub":
        "Biz bilan bog'laning yoki ariza qoldiring — tez orada javob beramiz.",
      "contact.infoTitle": "Aloqa ma'lumotlari",
      "contact.kPhone": "Telefon",

      // Shared call-to-action band
      "cta.title": "Hoziroq boshlaymizmi?",
      "cta.text": "Ariza qoldiring va biz siz bilan tez orada bog'lanamiz.",

      "footer.rights": "Halila. Barcha huquqlar himoyalangan.",

      // Form error messages
      "err.name": "Iltimos, ismingizni kiriting.",
      "err.phone": "Iltimos, to'g'ri telefon raqam kiriting.",
      "err.generic": "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      "err.network": "Tarmoq xatosi. Aloqangizni tekshirib, qayta urinib ko'ring.",
    },
    ru: {
      "meta.title": "Halila — Продукты и отзывы",
      "meta.desc":
        "Продукты Halila, видеоотзывы клиентов и быстрая связь — в одном месте.",

      "nav.home": "Главная",
      "nav.products": "Продукты",
      "nav.sales": "Тарифы",
      "nav.reviews": "Отзывы",
      "nav.contact": "Контакты",
      "nav.privacy": "Политика конфиденциальности",
      "nav.cta": "Оставить заявку",

      "land.h1a": "Качественные товары — ",
      "land.h1b": "надёжный результат.",
      "land.lead":
        "Ознакомьтесь с продуктами Halila, посмотрите отзывы наших клиентов и оставьте заявку за несколько секунд.",
      "tick.1": "Гарантия качества",
      "tick.2": "Быстрая доставка",
      "tick.3": "Положительные отзывы клиентов",

      "call.h1a": "Оставьте номер — ",
      "call.h1b": "мы перезвоним вам.",
      "call.lead":
        "Оставьте имя и номер телефона. Команда Halila свяжется с вами <strong>в течение 15 минут</strong> в рабочее время.",
      "call.tick1": "Быстрый ответ — без ожидания",
      "call.tick2": "Без спама и обязательств",
      "call.tick3": "Ваши данные останутся конфиденциальными",

      "home.benTitle": "Почему Halila?",
      "home.benSub": "Наши главные преимущества.",
      "ben1t": "100% натурально",
      "ben1d": "Только качественный и натуральный состав.",
      "ben2t": "Сертифицировано",
      "ben2d": "Наши продукты имеют официальные сертификаты.",
      "ben3t": "Научный подход",
      "ben3d": "Современные и надёжные технологии.",

      "home.prodTitle": "Наши продукты",
      "home.prodSub": "Самые популярные позиции.",
      "home.prodAll": "Все продукты →",
      "home.revTitle": "Отзывы клиентов",
      "home.revSub": "Что клиенты говорят о продукте.",
      "home.revAll": "Все отзывы →",

      "home.payTitle": "Оплата в рассрочку",
      "home.payText": "Рассрочка до 12 месяцев без переплаты — 0%.",

      "products.title": "Продукты",
      "products.sub": "Познакомьтесь с продуктами Halila — силой природы.",
      "prod.order": "Заказать",
      "prod.more": "Подробнее",

      "p.h60.n": "Halila 60+",
      "p.h60.d":
        "Паста на основе более 60 натуральных трав и минералов — эффективна при лечении ран, опухолей и онкологических заболеваний.",
      "p.geniy.n": "Halila Geniy",
      "p.geniy.d":
        "Halila «Geniy» расширяет сосуды мозга и сердца, улучшает память, концентрацию и зрение.",
      "p.yara.n": "Yara ma'juni",
      "p.yara.d":
        "Halila «Yara ma'juni» заживляет внутренние и внешние раны, подсушивает опухоли и останавливает раковые язвы.",
      "p.azorik.n": "Azorik pastasi",
      "p.azorik.d":
        "Паста Azorik укрепляет кости и мышцы, улучшает работу желудка и кишечника, подсушивает кисты.",
      "p.sirop.n": "Halila Сироп",
      "p.sirop.d":
        "Сироп Halila помогает при онкологических заболеваниях, очищает печень и селезёнку, помогает при гормональных нарушениях.",

      "sales.title": "Тарифы и наборы",
      "sales.sub":
        "В каждом тарифе — несколько продуктов Halila вместе. Выберите подходящий.",
      "tariff.includes": "В составе:",
      "tariff.popular": "Популярный",
      "tariff.best": "Самый полный",
      "tariff.order": "Заказать",
      "tf.silver.n": "Silver",
      "tf.silver.u": "3 продукта",
      "tf.silver.d": "Идеально для старта — 3 основных продукта.",
      "tf.gold.n": "Gold",
      "tf.gold.u": "4 продукта",
      "tf.gold.d": "Более полный набор для расширенного курса.",
      "tf.goldplus.n": "Gold Plus",
      "tf.goldplus.u": "6 продуктов",
      "tf.goldplus.d": "Самый полный набор для максимального результата.",

      "reviews.title": "Отзывы клиентов",
      "reviews.sub":
        "Видеоотзывы клиентов, которые воспользовались нашим продуктом.",

      "privacy.title": "Политика конфиденциальности",
      "privacy.body":
        "<p>Это образец текста. Замените его правилами вашей компании.</p><h2>Какие данные мы собираем</h2><p>Имя и номер телефона, отправленные через форму на сайте.</p><h2>Использование данных</h2><p>Данные используются только для связи с вами и не передаются третьим лицам.</p>",

      "card.title": "Оставьте заявку",
      "card.sub": "Это займёт 10 секунд.",
      "label.name": "Имя",
      "label.phone": "Телефон",
      "ph.name": "Ваше имя",
      "btn.submit": "Отправить",
      "success.title": "Спасибо!",
      "success.text": "Мы получили ваш номер и скоро перезвоним.",
      "success.again": "Отправить ещё",

      "contact.title": "Контакты",
      "contact.sub": "Свяжитесь с нами или оставьте заявку — мы скоро ответим.",
      "contact.infoTitle": "Контактная информация",
      "contact.kPhone": "Телефон",

      "cta.title": "Начнём прямо сейчас?",
      "cta.text": "Оставьте заявку, и мы свяжемся с вами в ближайшее время.",

      "footer.rights": "Halila. Все права защищены.",

      "err.name": "Пожалуйста, введите ваше имя.",
      "err.phone": "Пожалуйста, введите корректный номер телефона.",
      "err.generic": "Что-то пошло не так. Попробуйте ещё раз.",
      "err.network": "Ошибка сети. Проверьте соединение и попробуйте снова.",
    },
  };

  // ===========================================================================
  // Language helpers
  // ===========================================================================
  let lang =
    document.documentElement.getAttribute("lang") === "ru" ? "ru" : "uz";
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.uz[key] || key;

  // ===========================================================================
  // Build the shared header + footer and drop them into every page.
  // ===========================================================================
  function renderChrome() {
    const active = document.body.getAttribute("data-page");

    const menu = NAV.map(
      (n) =>
        `<a href="${n.href}" data-nav="${n.page}" data-i18n="${n.key}" class="${
          n.page === active ? "is-active" : ""
        }"></a>`
    ).join("");

    const footerLinks = FOOTER_LINKS.map(
      (n) => `<a href="${n.href}" data-i18n="${n.key}"></a>`
    ).join("");

    const headerSlot = document.getElementById("site-header");
    if (headerSlot) {
      headerSlot.outerHTML = `
      <header class="nav">
        <div class="container nav__inner">
          <a href="index.html" class="brand" aria-label="Halila">
            <img src="img/logo-black.png" alt="Halila" class="brand__logo brand__logo--light">
            <img src="img/logo-white.png" alt="Halila" class="brand__logo brand__logo--dark">
          </a>
          <nav class="nav__menu" id="navMenu" aria-label="Main">${menu}</nav>
          <div class="nav__actions">
            <div class="lang" role="group" aria-label="Language">
              <button type="button" class="lang__btn" data-lang="uz">UZ</button>
              <button type="button" class="lang__btn" data-lang="ru">RU</button>
            </div>
            <button id="themeToggle" class="icon-btn" type="button" aria-label="Toggle dark mode" title="Theme">
              <span class="icon icon--sun" aria-hidden="true">☀</span>
              <span class="icon icon--moon" aria-hidden="true">☾</span>
            </button>
            <button class="nav__burger" id="navBurger" type="button" aria-label="Menu"><i></i></button>
          </div>
        </div>
      </header>`;
    }

    const footerSlot = document.getElementById("site-footer");
    if (footerSlot) {
      footerSlot.outerHTML = `
      <footer class="footer">
        <div class="container">
          <nav class="footer__nav" aria-label="Footer">${footerLinks}</nav>
          <div class="footer__social" aria-label="Ijtimoiy tarmoqlar">
            <a class="soc" href="${SOCIAL.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ICON.youtube}</a>
            <a class="soc" href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
            <a class="soc" href="${SOCIAL.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${ICON.telegram}</a>
          </div>
          <p class="footer__phone"><a href="tel:${PHONE.tel}">${PHONE.display}</a></p>
          <p>© <span id="year"></span> <span data-i18n="footer.rights"></span></p>
        </div>
      </footer>`;
    }
  }
  renderChrome();

  // ===========================================================================
  // Apply a language to every [data-i18n] element on the page.
  // ===========================================================================
  function applyLang(next) {
    lang = I18N[next] ? next : "uz";
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      /* ignore */
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    const titleKey = document.querySelector("title[data-i18n]");
    if (titleKey) document.title = t(titleKey.getAttribute("data-i18n"));

    document.querySelectorAll(".lang__btn").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });
  }

  // Language buttons (inside the header we just built)
  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.addEventListener("click", () => applyLang(b.getAttribute("data-lang")));
  });

  // ===========================================================================
  // Theme toggle (light / dark)
  // ===========================================================================
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const root = document.documentElement;
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  // ===========================================================================
  // Mobile menu (hamburger)
  // ===========================================================================
  const nav = document.querySelector(".nav");
  const burger = document.getElementById("navBurger");
  if (nav && burger) {
    burger.addEventListener("click", () => nav.classList.toggle("is-open"));
    nav.querySelectorAll(".nav__menu a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("is-open"))
    );
  }

  // ===========================================================================
  // Review videos (YouTube) — click a thumbnail to load the player.
  // ===========================================================================
  document.querySelectorAll(".ytvideo").forEach((el) => {
    const id = (el.getAttribute("data-yt") || "").trim();
    const name = el.getAttribute("data-name") || "";

    if (!id || id === "VIDEO_ID") {
      el.classList.add("ytvideo--empty");
      el.innerHTML =
        '<div class="ph"><b>' +
        (name || "Video") +
        '</b>data-yt="VIDEO_ID"</div>';
      return;
    }

    el.innerHTML =
      '<img class="ytvideo__thumb" loading="lazy" alt="" src="https://img.youtube.com/vi/' +
      id +
      '/hqdefault.jpg">' +
      '<div class="ytvideo__play"><b></b></div>' +
      (name ? '<div class="ytvideo__name">' + name + "</div>" : "");

    el.addEventListener(
      "click",
      () => {
        el.innerHTML =
          '<iframe src="https://www.youtube.com/embed/' +
          id +
          '?autoplay=1" title="' +
          name +
          '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      },
      { once: true }
    );
  });

  // ===========================================================================
  // Scroll reveal — elements with class "reveal" fade in as they appear.
  // ===========================================================================
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }
  }

  // ===========================================================================
  // Creative FX (shared on EVERY page) — custom cursor, floating leaves,
  // scroll-driven parallax + progress bar, and stat count-up.
  // All of it respects "prefers-reduced-motion" and skips touch devices where
  // a follower cursor makes no sense.
  // ===========================================================================
  (function fx() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // ---- Thin scroll-progress bar across the very top of the page ----------
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    // ---- Custom cursor: a small #57bf00 dot + a soft trailing ring ----------
    if (finePointer && !reduceMotion) {
      document.documentElement.classList.add("has-cursor");
      const ring = document.createElement("div");
      ring.className = "cursor-ring";
      const dot = document.createElement("div");
      dot.className = "cursor-dot";
      document.body.append(ring, dot);

      const DOT = 9; // px — dot stays small & precise
      const RING = 34; // px — ring is bigger & lags behind
      let mx = innerWidth / 2,
        my = innerHeight / 2;
      let rx = mx,
        ry = my,
        scale = 1,
        target = 1,
        shown = false;

      // The ring eases toward the cursor in a rAF loop that STOPS once it has
      // settled (and the mouse is idle), so the page can reach an idle frame
      // instead of repainting forever. Any movement/hover restarts it.
      let running = false;
      function start() {
        if (!running) {
          running = true;
          requestAnimationFrame(ringLoop);
        }
      }
      function ringLoop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        scale += (target - scale) * 0.15;
        ring.style.transform = `translate(${rx - RING / 2}px, ${
          ry - RING / 2
        }px) scale(${scale})`;
        if (
          Math.abs(mx - rx) < 0.1 &&
          Math.abs(my - ry) < 0.1 &&
          Math.abs(target - scale) < 0.01
        ) {
          running = false; // settled → idle out
          return;
        }
        requestAnimationFrame(ringLoop);
      }

      addEventListener(
        "mousemove",
        (e) => {
          mx = e.clientX;
          my = e.clientY;
          dot.style.transform = `translate(${mx - DOT / 2}px, ${
            my - DOT / 2
          }px)`;
          if (!shown) {
            shown = true;
            document.body.classList.add("cursor-on");
          }
          start();
        },
        { passive: true }
      );
      addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-on")
      );
      addEventListener("mouseenter", () => {
        if (shown) document.body.classList.add("cursor-on");
      });

      const HOT = "a,button,input,textarea,select,label,.product,.fcard,.tariff,.ytvideo,.cert,.lang__btn,.icon-btn";
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest(HOT)) {
          target = 1.9;
          start();
        }
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest(HOT)) {
          target = 1;
          start();
        }
      });
      addEventListener("mousedown", () => {
        document.body.classList.add("cursor-press");
      });
      addEventListener("mouseup", () => {
        document.body.classList.remove("cursor-press");
      });
    }

    // ---- Leaves gently drifting across the screen, both directions ---------
    if (!reduceMotion) {
      const LEAF =
        '<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">' +
        '<path d="M32 3C13 14 7 41 23 61 41 50 53 23 32 3Z"/>' +
        '<path d="M30 12C28 28 26 44 25 57" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="2.4" stroke-linecap="round"/>' +
        "</svg>";
      const layer = document.createElement("div");
      layer.className = "leaves";
      layer.setAttribute("aria-hidden", "true");
      const COUNT = innerWidth < 640 ? 8 : 14;
      let html = "";
      for (let i = 0; i < COUNT; i++) {
        const top = (i * 89 + 7) % 100; // deterministic spread (no Math.random)
        const dur = 17 + ((i * 7) % 20);
        const delay = -((i * 5) % 24);
        const size = 14 + ((i * 11) % 24);
        const op = (28 + ((i * 13) % 34)) / 100;
        const dir = i % 2 ? "leaf--rtl" : "leaf--ltr";
        html +=
          `<span class="leaf ${dir}" style="top:${top}%;` +
          `--dur:${dur}s;--delay:${delay}s;--size:${size}px;--op:${op}">${LEAF}</span>`;
      }
      layer.innerHTML = html;
      document.body.appendChild(layer);
    }

    // ---- Stat count-up (e.g. About page numbers) when they scroll in ------
    if (!reduceMotion && "IntersectionObserver" in window) {
      const nums = document.querySelectorAll("[data-count]");
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            cio.unobserve(el);
            const end = parseFloat(el.getAttribute("data-count")) || 0;
            const suffix = el.getAttribute("data-suffix") || "";
            const t0 = performance.now();
            const dur = 1400;
            (function step(t) {
              const k = clamp((t - t0) / dur, 0, 1);
              const eased = 1 - Math.pow(1 - k, 3);
              el.textContent = Math.round(end * eased).toLocaleString() + suffix;
              if (k < 1) requestAnimationFrame(step);
            })(t0);
          });
        },
        { threshold: 0.5 }
      );
      nums.forEach((n) => cio.observe(n));
    }

    // ---- Scroll: progress bar + parallax + hero "scrub", one rAF ----------
    const layers = Array.prototype.slice.call(
      document.querySelectorAll("[data-parallax]")
    );
    const heroImg = document.querySelector(".hero__media img");
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
        if (!reduceMotion) {
          for (const el of layers) {
            const s = parseFloat(el.getAttribute("data-parallax")) || 0;
            el.style.transform = "translate3d(0," + y * s + "px,0)";
          }
          if (heroImg) {
            const p = clamp(y / (innerHeight * 0.85), 0, 1);
            heroImg.style.transform =
              "translateY(" + p * 36 + "px) rotate(" + p * 5 + "deg) scale(" +
              (1 - p * 0.05) + ")";
          }
        }
        ticking = false;
      });
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    onScroll();
  })();

  // ===========================================================================
  // Footer year
  // ===========================================================================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===========================================================================
  // Lead form (only on pages that include it: Contact)
  // ===========================================================================
  const form = document.getElementById("leadForm");
  if (form) {
    const submitBtn = document.getElementById("submitBtn");
    const success = document.getElementById("success");
    const resetBtn = document.getElementById("resetBtn");

    const setError = (field, key) => {
      const input = form.elements[field];
      const slot = form.querySelector(`[data-error-for="${field}"]`);
      if (slot) slot.textContent = key ? t(key) : "";
      if (input) input.classList.toggle("invalid", Boolean(key));
    };
    const clearErrors = () => ["name", "phone"].forEach((f) => setError(f, ""));

    const validateClient = (data) => {
      const errors = {};
      if (!data.name || data.name.trim().length < 2) errors.name = "err.name";
      const digits = (data.phone || "").replace(/[^\d]/g, "");
      if (digits.length < 6) errors.phone = "err.phone";
      return errors;
    };

    form.addEventListener("input", (e) => {
      if (e.target.name) setError(e.target.name, "");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearErrors();

      const data = {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        company: form.elements.company.value, // honeypot (anti-spam)
      };

      const errors = validateClient(data);
      if (Object.keys(errors).length) {
        Object.entries(errors).forEach(([f, key]) => setError(f, key));
        const first = form.elements[Object.keys(errors)[0]];
        if (first) first.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));

        if (res.ok && json.ok) {
          form.hidden = true;
          success.hidden = false;
          const icon = success.querySelector(".success__icon");
          if (icon) {
            icon.style.animation = "none";
            void icon.offsetWidth; // force reflow → replay pop-in
            icon.style.animation = "";
          }
          success.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }

        if (json.errors) {
          Object.keys(json.errors).forEach((f) =>
            setError(f, f === "name" ? "err.name" : "err.phone")
          );
          return;
        }
        alert(t("err.generic"));
      } catch (err) {
        alert(t("err.network"));
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
      }
    });

    resetBtn.addEventListener("click", () => {
      form.reset();
      clearErrors();
      form.hidden = false;
      success.hidden = true;
      form.elements.name.focus();
    });
  }

  // Apply the saved/detected language to the whole page (incl. header/footer).
  applyLang(lang);
})();
