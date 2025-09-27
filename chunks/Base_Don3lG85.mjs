import { c as createComponent, m as maybeRenderHead, b as addAttribute, d as renderScript, a as renderTemplate, r as renderComponent, h as createAstro, i as renderHead, j as renderSlot } from './astro/server_BENV1OEc.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const telegramBotUrl = "https://t.me/your_bot";
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <div class="flex items-center justify-between h-16" data-astro-cid-3ef6ksr2> <!-- Logo --> <a href="/" class="flex items-center space-x-2" aria-label="DEXRabbit - Главная" data-astro-cid-3ef6ksr2> <div class="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center" data-astro-cid-3ef6ksr2> <span class="text-white font-bold text-sm" data-astro-cid-3ef6ksr2>R</span> </div> <span class="font-bold text-lg text-[var(--text-primary)]" data-astro-cid-3ef6ksr2>DEXRabbit</span> </a> <!-- Desktop Navigation --> <nav class="hidden md:flex items-center space-x-8" data-astro-cid-3ef6ksr2> <a href="/#plex" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium" data-astro-cid-3ef6ksr2>
Курс PLEX
</a> <a href="/#faq" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium" data-astro-cid-3ef6ksr2>
FAQ
</a> <a href="/#rabbits-gallery" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium" data-astro-cid-3ef6ksr2>
Галерея
</a> <a href="/legal" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors font-medium" data-astro-cid-3ef6ksr2>
Правовая
</a> </nav> <!-- CTA Button --> <div class="flex items-center space-x-4" data-astro-cid-3ef6ksr2> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary hidden sm:inline-flex" target="_blank" rel="noopener noreferrer" data-astro-cid-3ef6ksr2>
Telegram-бот
</a> <!-- Mobile Menu Button --> <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors" aria-label="Открыть меню" aria-expanded="false" data-astro-cid-3ef6ksr2> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-3ef6ksr2></path> </svg> </button> </div> </div> <!-- Mobile Menu --> <div id="mobile-menu" class="hidden md:hidden border-t border-[var(--border-subtle)]" data-astro-cid-3ef6ksr2> <div class="py-4 space-y-3" data-astro-cid-3ef6ksr2> <a href="/#plex" class="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors" data-astro-cid-3ef6ksr2>
Курс PLEX
</a> <a href="/#faq" class="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors" data-astro-cid-3ef6ksr2>
FAQ
</a> <a href="/#rabbits-gallery" class="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors" data-astro-cid-3ef6ksr2>
Галерея
</a> <a href="/legal" class="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-hover)] rounded-lg transition-colors" data-astro-cid-3ef6ksr2>
Правовая
</a> <div class="px-4 pt-2" data-astro-cid-3ef6ksr2> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary w-full justify-center" target="_blank" rel="noopener noreferrer" data-astro-cid-3ef6ksr2>
Открыть Telegram-бот
</a> </div> </div> </div> </div> </header> ${renderScript($$result, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Header.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Header.astro", void 0);

const $$UniversalDisclaimer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-[var(--radius-2xl)] p-6 text-sm text-[var(--text-muted)]"> <p class="leading-relaxed"> <strong>Проект не продаёт и не обменивает монету PLEX.</strong>
В штатной модели ежедневные начисления выполняются в PLEX,
    а итоговая выплата (тело вклада и прибыль) происходит в USDT.
    В случае форс-мажора возврат внесённой суммы производится в PLEX.
    Параметры начислений и правила доступны в Telegram-боте.
    PLEX — волатильный актив; оцените риски перед участием.
</p> </div>`;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/UniversalDisclaimer.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const telegramBotUrl = "https://t.me/your_bot";
  return renderTemplate`${maybeRenderHead()}<footer class="bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] mt-auto" data-astro-cid-sz7xmlte> <div class="container py-12" data-astro-cid-sz7xmlte> <div class="max-w-6xl mx-auto" data-astro-cid-sz7xmlte> <!-- Main footer content --> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8" data-astro-cid-sz7xmlte> <!-- Company info --> <div data-astro-cid-sz7xmlte> <div class="flex items-center space-x-2 mb-4" data-astro-cid-sz7xmlte> <div class="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center" data-astro-cid-sz7xmlte> <span class="text-white font-bold text-sm" data-astro-cid-sz7xmlte>R</span> </div> <span class="font-bold text-lg text-[var(--text-primary)]" data-astro-cid-sz7xmlte>DEXRabbit</span> </div> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-sz7xmlte>
USDT-вход, ежедневные PLEX-бонусы, USDT-выплата. Прозрачная экономика.
</p> <div class="flex space-x-4" data-astro-cid-sz7xmlte> <a href="https://rutube.ru/channel/rabbitfarm" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="RuTube канал" data-astro-cid-sz7xmlte> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="https://youtube.com/@rabbitfarm" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="YouTube канал" data-astro-cid-sz7xmlte> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-sz7xmlte> <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </div> <!-- Legal links --> <div data-astro-cid-sz7xmlte> <h3 class="text-lg font-semibold mb-4 text-[var(--text-primary)]" data-astro-cid-sz7xmlte>
Правовая информация
</h3> <ul class="space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="/legal" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-sz7xmlte>
Лицензионное соглашение
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/privacy" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-sz7xmlte>
Политика конфиденциальности
</a> </li> <li data-astro-cid-sz7xmlte> <a href="/terms" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-sz7xmlte>
Условия использования
</a> </li> </ul> </div> <!-- Contacts --> <div data-astro-cid-sz7xmlte> <h3 class="text-lg font-semibold mb-4 text-[var(--text-primary)]" data-astro-cid-sz7xmlte>
Контакты
</h3> <ul class="space-y-2" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte> <a href="mailto:info@rabbitfarm.com" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-sz7xmlte>
📧 info@rabbitfarm.com
</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://t.me/manager" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>
📱 Telegram менеджера
</a> </li> <li data-astro-cid-sz7xmlte> <a href="https://t.me/rabbitfarm_channel" class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>
📢 Официальный канал
</a> </li> </ul> </div> <!-- CTA --> <div data-astro-cid-sz7xmlte> <h3 class="text-lg font-semibold mb-4 text-[var(--text-primary)]" data-astro-cid-sz7xmlte>
Начать инвестировать
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-sz7xmlte>
Все операции через Telegram-бот
</p> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary inline-block text-center w-full" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte>
Открыть Telegram-бот
</a> </div> </div> <!-- Universal disclaimer --> <div class="border-t border-[var(--border-primary)] pt-8 mb-8" data-astro-cid-sz7xmlte> ${renderComponent($$result, "UniversalDisclaimer", $$UniversalDisclaimer, { "data-astro-cid-sz7xmlte": true })} </div> <!-- Copyright --> <div class="text-center pt-8 border-t border-[var(--border-primary)]" data-astro-cid-sz7xmlte> <p class="text-[var(--text-muted)]" data-astro-cid-sz7xmlte>
© 2024 DEXRabbit. Все права защищены.
</p> <p class="text-[var(--text-muted)] text-sm mt-2" data-astro-cid-sz7xmlte>
USDT-вход, PLEX-бонусы, USDT-выплата. Проект токенизации кролиководства.
</p> </div> </div> </div> </footer> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Footer.astro", void 0);

const $$StickyCta = createComponent(($$result, $$props, $$slots) => {
  const telegramBotUrl = "https://t.me/your_bot";
  return renderTemplate`${maybeRenderHead()}<div id="sticky-cta" class="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)] border-t border-[var(--border-primary)] sm:hidden" data-astro-cid-544d75lg> <div class="container" data-astro-cid-544d75lg> <div class="flex items-center justify-center py-4 safe-area-bottom" data-astro-cid-544d75lg> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary w-full max-w-sm justify-center" target="_blank" rel="noopener noreferrer" style="padding-bottom: max(1rem, env(safe-area-inset-bottom, 0px));" data-astro-cid-544d75lg>
Открыть Telegram-бот
</a> </div> </div> </div> ${renderScript($$result, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/StickyCta.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/StickyCta.astro", void 0);

const $$Astro = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { title, description = "USDT-\u0432\u0445\u043E\u0434, \u0435\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 PLEX-\u0431\u043E\u043D\u0443\u0441\u044B, \u0438\u0442\u043E\u0433\u043E\u0432\u0430\u044F \u0432\u044B\u043F\u043B\u0430\u0442\u0430 \u0432 USDT. \u0424\u043E\u0440\u0441-\u043C\u0430\u0436\u043E\u0440 \u2014 \u0432\u043E\u0437\u0432\u0440\u0430\u0442 \u0442\u0435\u043B\u0430 \u0432 PLEX." } = Astro2.props;
  return renderTemplate`<html lang="ru" class="dark" data-astro-cid-5hce7sga> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO Meta Tags --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/og/og-image.jpg"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/og/og-image.jpg"><!-- VK --><meta property="vk:image" content="/og/og-image.jpg"><!-- Preconnect to external domains --><link rel="preconnect" href="https://www.geckoterminal.com"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Import design tokens --><link rel="stylesheet" href="/src/styles/tokens.css"><!-- Global styles -->${renderHead()}</head> <body class="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen flex flex-col" data-astro-cid-5hce7sga> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5hce7sga": true })} <main class="flex-1" data-astro-cid-5hce7sga> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5hce7sga": true })} ${renderComponent($$result, "StickyCta", $$StickyCta, { "data-astro-cid-5hce7sga": true })} </body></html>`;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/layouts/Base.astro", void 0);

export { $$Base as $, $$Footer as a };
