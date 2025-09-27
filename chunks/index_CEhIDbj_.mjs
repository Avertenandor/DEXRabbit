import { c as createComponent, m as maybeRenderHead, b as addAttribute, d as renderScript, a as renderTemplate, A as AstroError, U as UnknownContentCollectionError, R as RenderUndefinedEntryError, u as unescapeHTML, e as renderUniqueStylesheet, f as renderScriptElement, g as createHeadAndContent, r as renderComponent, h as createAstro } from './astro/server_BENV1OEc.mjs';
import 'kleur/colors';
import { $ as $$Base, a as $$Footer } from './Base_Don3lG85.mjs';
import 'clsx';
/* empty css                         */
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import * as devalue from 'devalue';
import '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const telegramBotUrl = "https://t.me/your_bot";
  const heroRabbits = [
    {
      image: "/images/photo_2025-09-15_13-17-50.jpg",
      alt: "\u041A\u0440\u043E\u043B\u0438\u043A Silver - \u0441\u0430\u043C\u0435\u0446 \u0441\u0435\u0440\u0435\u0431\u0440\u0438\u0441\u0442\u043E\u0439 \u043F\u043E\u0440\u043E\u0434\u044B"
    },
    {
      image: "/images/photo_2025-09-15_13-17-51.jpg",
      alt: "\u041A\u0440\u043E\u043B\u0438\u043A Luna - \u0441\u0430\u043C\u043A\u0430 \u0431\u0435\u043B\u043E\u0439 \u043F\u043E\u0440\u043E\u0434\u044B"
    },
    {
      image: "/images/photo_2025-09-15_13-17-52.jpg",
      alt: "\u041A\u0440\u043E\u043B\u0438\u043A Storm - \u0441\u0430\u043C\u0435\u0446 \u0433\u043E\u043B\u043B\u0430\u043D\u0434\u0441\u043A\u043E\u0439 \u043F\u043E\u0440\u043E\u0434\u044B"
    },
    {
      image: "/images/photo_2025-09-15_13-17-50 (2).jpg",
      alt: "\u041A\u0440\u043E\u043B\u0438\u043A Pearl - \u043C\u043E\u043B\u043E\u0434\u0430\u044F \u0441\u0430\u043C\u043A\u0430 \u043F\u043E\u0440\u043E\u0434\u044B \u0420\u0435\u043A\u0441"
    },
    {
      image: "/images/photo_2025-09-15_13-17-51 (2).jpg",
      alt: "\u041A\u0440\u043E\u043B\u0438\u043A Max - \u043A\u0440\u0443\u043F\u043D\u044B\u0439 \u0441\u0430\u043C\u0435\u0446 \u043A\u0430\u043B\u0438\u0444\u043E\u0440\u043D\u0438\u0439\u0441\u043A\u043E\u0439 \u043F\u043E\u0440\u043E\u0434\u044B"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section bg-[var(--bg-primary)] relative overflow-hidden" data-astro-cid-bbe6dxrz> <!-- Background Image Carousel --> <div class="absolute inset-0 opacity-10" data-astro-cid-bbe6dxrz> <div id="hero-carousel" class="flex transition-transform duration-1000 ease-in-out h-full" data-astro-cid-bbe6dxrz> ${heroRabbits.map((rabbit, index) => renderTemplate`<div class="min-w-full h-full relative" data-astro-cid-bbe6dxrz> <img${addAttribute(rabbit.image, "src")}${addAttribute(rabbit.alt, "alt")} class="w-full h-full object-cover filter blur-sm scale-110" loading="eager" data-astro-cid-bbe6dxrz> <div class="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)]/90" data-astro-cid-bbe6dxrz></div> </div>`)} </div> </div> <div class="container mx-auto px-6 relative z-10" data-astro-cid-bbe6dxrz> <div class="text-center max-w-4xl mx-auto" data-astro-cid-bbe6dxrz> <!-- Main heading --> <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight fade-in" data-astro-cid-bbe6dxrz>
USDT-вход, ежедневные
<span class="text-[var(--accent-primary)] block" data-astro-cid-bbe6dxrz>
PLEX-бонусы, итоговая выплата в USDT
</span> </h1> <!-- Subtitle --> <p class="text-xl md:text-2xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed fade-in" data-astro-cid-bbe6dxrz>
Форс-мажор — возврат тела в PLEX.
</p> <!-- CTA Buttons --> <div class="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in" data-astro-cid-bbe6dxrz> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary text-lg px-8 py-4" target="_blank" rel="noopener noreferrer" data-astro-cid-bbe6dxrz>
Открыть Telegram-бот
</a> <button onclick="document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })" class="btn-secondary text-lg px-8 py-4" data-astro-cid-bbe6dxrz>
Как это работает
</button> </div> <!-- Important disclaimer --> <div class="mt-16 p-6 bg-[var(--bg-secondary)] rounded-[var(--radius-xl)] border border-[var(--border-primary)] max-w-2xl mx-auto fade-in" data-astro-cid-bbe6dxrz> <p class="text-sm text-[var(--text-secondary)] leading-relaxed" data-astro-cid-bbe6dxrz> <strong class="text-[var(--accent-primary)]" data-astro-cid-bbe6dxrz>Экономическая модель:</strong> ежедневные начисления — в монете PLEX (параметры публикуются в Telegram-боте).
          По успешному завершению цикла (~3 мес.) возврат тела и прибыль — в USDT. В случае форс-мажора возврат тела — в монете PLEX.
</p> </div> </div> </div> <!-- Carousel Navigation Dots --> <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" data-astro-cid-bbe6dxrz> <div class="flex space-x-2" data-astro-cid-bbe6dxrz> ${heroRabbits.map((_, index) => renderTemplate`<button${addAttribute(`setSlide(${index})`, "onclick")}${addAttribute(["w-3 h-3 rounded-full transition-all duration-300", [
    index === 0 ? "bg-[var(--accent-primary)]" : "bg-white/30"
  ]], "class:list")}${addAttribute(`dot-${index}`, "id")} data-astro-cid-bbe6dxrz></button>`)} </div> </div> </section> ${renderScript($$result, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Hero.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Hero.astro", void 0);

const $$HowItWorks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="how-it-works" class="section bg-[var(--bg-secondary)]" data-astro-cid-cmgpsf2k> <div class="container mx-auto px-6" data-astro-cid-cmgpsf2k> <div class="max-w-4xl mx-auto" data-astro-cid-cmgpsf2k> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-cmgpsf2k> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-cmgpsf2k>
Как это работает
</h2> <p class="text-xl text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
USDT-вход, ежедневные PLEX-бонусы, USDT-выплата через ~3 месяца
</p> <div class="mt-4 p-3 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-primary)] inline-block" data-astro-cid-cmgpsf2k> <p class="text-sm text-[var(--text-muted)]" data-astro-cid-cmgpsf2k>
Размер ежедневных PLEX-начислений уточняется в боте (TBD)
</p> </div> </div> <!-- Steps grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-cmgpsf2k> <!-- Step 1 --> <div class="card text-center fade-in" data-astro-cid-cmgpsf2k> <div class="relative w-24 h-24 mx-auto mb-6" data-astro-cid-cmgpsf2k> <img src="/images/photo_2025-09-15_13-17-50.jpg" alt="Инвестиции в кроликов" class="w-full h-full object-cover rounded-full border-4 border-[var(--accent-primary)]" loading="lazy" data-astro-cid-cmgpsf2k> <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center" data-astro-cid-cmgpsf2k> <span class="text-white font-bold text-sm" data-astro-cid-cmgpsf2k>💰</span> </div> </div> <h3 class="text-xl font-semibold mb-4" data-astro-cid-cmgpsf2k>Вносите USDT</h3> <p class="text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
Вносите USDT в Telegram-боте и выбираете кролика или пару для инвестиций
</p> </div> <!-- Step 2 --> <div class="card text-center fade-in" data-astro-cid-cmgpsf2k> <div class="relative w-24 h-24 mx-auto mb-6" data-astro-cid-cmgpsf2k> <img src="/images/photo_2025-09-15_13-17-51.jpg" alt="Племенная пара кроликов" class="w-full h-full object-cover rounded-full border-4 border-[var(--accent-primary)]" loading="lazy" data-astro-cid-cmgpsf2k> <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center" data-astro-cid-cmgpsf2k> <span class="text-white font-bold text-sm" data-astro-cid-cmgpsf2k>🎁</span> </div> </div> <h3 class="text-xl font-semibold mb-4" data-astro-cid-cmgpsf2k>Получаете ежедневные PLEX-бонусы</h3> <p class="text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
Каждый день получаете бонусы в монете PLEX согласно правилам проекта
</p> </div> <!-- Step 3 --> <div class="card text-center fade-in" data-astro-cid-cmgpsf2k> <div class="relative w-24 h-24 mx-auto mb-6" data-astro-cid-cmgpsf2k> <img src="/images/photo_2025-09-15_13-17-52.jpg" alt="Кормление и уход за кроликами" class="w-full h-full object-cover rounded-full border-4 border-[var(--accent-primary)]" loading="lazy" data-astro-cid-cmgpsf2k> <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center" data-astro-cid-cmgpsf2k> <span class="text-white font-bold text-sm" data-astro-cid-cmgpsf2k>🏭</span> </div> </div> <h3 class="text-xl font-semibold mb-4" data-astro-cid-cmgpsf2k>Ферма выращивает и реализует</h3> <p class="text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
Ферма выращивает кроликов и реализует продукцию на рынке
</p> </div> <!-- Step 4 --> <div class="card text-center fade-in" data-astro-cid-cmgpsf2k> <div class="relative w-24 h-24 mx-auto mb-6" data-astro-cid-cmgpsf2k> <img src="/images/photo_2025-09-15_13-17-50 (2).jpg" alt="Молодые кролики" class="w-full h-full object-cover rounded-full border-4 border-[var(--accent-primary)]" loading="lazy" data-astro-cid-cmgpsf2k> <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center" data-astro-cid-cmgpsf2k> <span class="text-white font-bold text-sm" data-astro-cid-cmgpsf2k>🏆</span> </div> </div> <h3 class="text-xl font-semibold mb-4" data-astro-cid-cmgpsf2k>Получаете выплату в USDT</h3> <p class="text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
Через ~3 месяца: возврат тела вклада и прибыль в USDT (штатная модель)
</p> </div> <!-- Step 5 --> <div class="card text-center fade-in" data-astro-cid-cmgpsf2k> <div class="relative w-24 h-24 mx-auto mb-6" data-astro-cid-cmgpsf2k> <img src="/images/photo_2025-09-15_13-17-51 (2).jpg" alt="Выводок кроликов" class="w-full h-full object-cover rounded-full border-4 border-[var(--accent-primary)]" loading="lazy" data-astro-cid-cmgpsf2k> <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--accent-primary)] rounded-full flex items-center justify-center" data-astro-cid-cmgpsf2k> <span class="text-white font-bold text-sm" data-astro-cid-cmgpsf2k>🛡️</span> </div> </div> <h3 class="text-xl font-semibold mb-4" data-astro-cid-cmgpsf2k>Форс-мажор: возврат в PLEX</h3> <p class="text-[var(--text-secondary)]" data-astro-cid-cmgpsf2k>
В случае форс-мажора: возврат тела вклада в монете PLEX (страховой механизм)
</p> </div> </div> <!-- CTA --> <div class="text-center mt-12" data-astro-cid-cmgpsf2k> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-cmgpsf2k>
Начать инвестировать
</a> </div> </div> </div> </section> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/HowItWorks.astro", void 0);

const rabbitsData = [
	{
		src: "/images/photo_2025-09-15_13-17-50.jpg",
		w: 1200,
		h: 800,
		tags: [
			"самец",
			"серебристый",
			"селекция"
		],
		title: "Silver - самец серебристой породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-51.jpg",
		w: 1200,
		h: 800,
		tags: [
			"самка",
			"белый",
			"великан"
		],
		title: "Luna - самка белой породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-52.jpg",
		w: 1200,
		h: 800,
		tags: [
			"самец",
			"голландский",
			"вольер"
		],
		title: "Storm - самец голландской породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-50 (2).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самка",
			"рекс",
			"молодая"
		],
		title: "Pearl - молодая самка породы Рекс",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-51 (2).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самец",
			"калифорнийский",
			"крупный"
		],
		title: "Max - крупный самец калифорнийской породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-52 (2).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самка",
			"ангорский",
			"шерсть"
		],
		title: "Bella - самка ангорской породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-50 (3).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самец",
			"фландр",
			"молодой"
		],
		title: "Rocky - молодой самец породы Фландр",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-52 (3).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самка",
			"шиншилла",
			"селекция"
		],
		title: "Coco - самка шиншилловой породы",
		date: "2024-09-15"
	},
	{
		src: "/images/photo_2025-09-15_13-17-52 (4).jpg",
		w: 1200,
		h: 800,
		tags: [
			"самец",
			"бабочка",
			"окрас"
		],
		title: "Buddy - самец с окрасом бабочка",
		date: "2024-09-15"
	}
];

const $$RabbitsGallery = createComponent(($$result, $$props, $$slots) => {
  const rabbits = rabbitsData;
  return renderTemplate`${maybeRenderHead()}<section id="rabbits-gallery" class="section bg-[var(--bg-secondary)]" data-astro-cid-4gklykvr> <div class="container mx-auto px-6" data-astro-cid-4gklykvr> <div class="max-w-6xl mx-auto" data-astro-cid-4gklykvr> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-4gklykvr> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-4gklykvr>
Наши кролики
</h2> <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto" data-astro-cid-4gklykvr>
Познакомьтесь с нашими племенными кроликами разных пород
</p> </div> <!-- Gallery Grid --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-astro-cid-4gklykvr> ${rabbits.map((rabbit, index) => renderTemplate`<div class="group cursor-pointer"${addAttribute(`openLightbox(${index})`, "onclick")} data-astro-cid-4gklykvr> <div class="aspect-[4/3] overflow-hidden rounded-lg bg-[var(--bg-tertiary)] mb-3" data-astro-cid-4gklykvr> <picture data-astro-cid-4gklykvr> <source${addAttribute(`${rabbit.image.replace(".jpg", ".webp")}`, "srcset")} type="image/webp" data-astro-cid-4gklykvr> <img${addAttribute(rabbit.image, "src")}${addAttribute(`${rabbit.name} - ${rabbit.description}`, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" data-astro-cid-4gklykvr> </picture> </div> <div class="space-y-2" data-astro-cid-4gklykvr> <div class="flex items-center justify-between" data-astro-cid-4gklykvr> <h3 class="font-semibold text-[var(--text-primary)]" data-astro-cid-4gklykvr> ${rabbit.name} </h3> <span${addAttribute(`px-2 py-1 rounded-full text-xs font-semibold ${rabbit.gender === "male" ? "bg-blue-500/20 text-blue-400" : "bg-pink-500/20 text-pink-400"}`, "class")} data-astro-cid-4gklykvr> ${rabbit.gender === "male" ? "\u2642" : "\u2640"} </span> </div> <div class="flex flex-wrap gap-1" data-astro-cid-4gklykvr> ${rabbit.tags.slice(0, 2).map((tag) => renderTemplate`<span class="px-2 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs rounded-full" data-astro-cid-4gklykvr> ${tag} </span>`)} </div> <p class="text-sm text-[var(--text-secondary)]" data-astro-cid-4gklykvr> ${rabbit.age} • ${rabbit.line} </p> <p class="text-sm text-[var(--text-muted)]" data-astro-cid-4gklykvr> ${rabbit.description} </p> </div> </div>`)} </div> <!-- CTA --> <div class="text-center mt-12" data-astro-cid-4gklykvr> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-4gklykvr>
Хотите инвестировать в разведение кроликов?
</p> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-4gklykvr>
Выбрать кролика в боте
</a> </div> </div> </div> </section> <!-- Lightbox Modal (React Island) --> <div id="lightbox" class="fixed inset-0 bg-black/90 z-50 hidden" onclick="closeLightbox()" data-astro-cid-4gklykvr> <div class="absolute inset-0 flex items-center justify-center p-4" data-astro-cid-4gklykvr> <div class="relative max-w-4xl max-h-full" onclick="event.stopPropagation()" data-astro-cid-4gklykvr> <img id="lightbox-image" src="" alt="" class="max-w-full max-h-full object-contain" data-astro-cid-4gklykvr> <!-- Close button --> <button onclick="closeLightbox()" class="absolute top-4 right-4 text-white text-2xl hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-4gklykvr>
×
</button> <!-- Navigation --> <button onclick="previousImage()" class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-4gklykvr>
‹
</button> <button onclick="nextImage()" class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-[var(--accent-primary)] transition-colors" data-astro-cid-4gklykvr>
›
</button> <!-- Info panel --> <div class="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-6" data-astro-cid-4gklykvr> <div class="flex justify-between items-center" data-astro-cid-4gklykvr> <div id="lightbox-info" class="text-sm" data-astro-cid-4gklykvr></div> <div class="flex gap-2" data-astro-cid-4gklykvr> <span id="lightbox-counter" class="text-sm text-[var(--text-secondary)]" data-astro-cid-4gklykvr></span> </div> </div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/RabbitsGallery.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/RabbitsGallery.astro", void 0);

const $$PlexTicker = createComponent(($$result, $$props, $$slots) => {
  const plexContractAddress = "0x41d9650faf3341cbf8947fd8063a1fc88dbf1889";
  const geckoTerminalUrl = `https://www.geckoterminal.com/ru/bsc/pools/${plexContractAddress}`;
  const telegramBotUrl = "https://t.me/your_bot";
  return renderTemplate`${maybeRenderHead()}<section id="plex" class="section bg-[var(--bg-primary)]" data-astro-cid-mulpto6b> <div class="container mx-auto px-6" data-astro-cid-mulpto6b> <div class="max-w-6xl mx-auto" data-astro-cid-mulpto6b> <!-- Section header --> <div class="text-center mb-12" data-astro-cid-mulpto6b> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-mulpto6b>
Курс PLEX
</h2> <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto" data-astro-cid-mulpto6b>
Актуальный курс монеты PLEX на платформе GeckoTerminal
</p> </div> <!-- Ticker container --> <div class="bg-[var(--bg-secondary)] rounded-[var(--radius-2xl)] p-8 border border-[var(--border-primary)] mb-8" data-astro-cid-mulpto6b> <!-- GeckoTerminal iframe with responsive aspect ratio --> <div class="w-full mb-6" style="aspect-ratio: 16/9; min-height: 480px;" data-astro-cid-mulpto6b> <iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal PLEX Chart"${addAttribute(`${geckoTerminalUrl}?embed=1&info=1&swaps=1&grayscale=0&light_chart=0&chart_type=price&resolution=15m`, "src")} frameborder="0" allow="clipboard-write" allowfullscreen class="rounded-lg w-full h-full" loading="lazy" data-astro-cid-mulpto6b>
          </iframe> </div> <!-- Bot CTA button --> <div class="text-center mb-6" data-astro-cid-mulpto6b> <a${addAttribute(telegramBotUrl, "href")} class="btn-primary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-mulpto6b>
Открыть Telegram-бот
</a> </div> <!-- Main disclaimer --> <div class="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-[var(--radius-xl)] p-8" data-astro-cid-mulpto6b> <h3 class="text-2xl font-semibold text-[var(--accent-primary)] mb-6" data-astro-cid-mulpto6b>
⚠️ Важная информация об экономике проекта
</h3> <div class="text-[var(--text-secondary)] space-y-4 text-lg leading-relaxed" data-astro-cid-mulpto6b> <div class="p-4 bg-green-900/20 border border-green-500/30 rounded-lg" data-astro-cid-mulpto6b> <p class="font-semibold text-green-300 mb-2" data-astro-cid-mulpto6b>
Штатная модель (нормальный сценарий)
</p> <p data-astro-cid-mulpto6b> <strong data-astro-cid-mulpto6b>Вход:</strong> USDT → <strong data-astro-cid-mulpto6b>Ежедневно:</strong> бонусы в PLEX →
<strong data-astro-cid-mulpto6b>Выход (~3 мес.):</strong> возврат тела + прибыль в USDT
</p> </div> <div class="p-4 bg-red-900/20 border border-red-500/30 rounded-lg" data-astro-cid-mulpto6b> <p class="font-semibold text-red-300 mb-2" data-astro-cid-mulpto6b>
Форс-мажор (страховой механизм)
</p> <p data-astro-cid-mulpto6b> <strong data-astro-cid-mulpto6b>Возврат внесённой суммы — в PLEX.</strong>
Порядок и сроки прописаны в правилах Telegram-бота.
</p> </div> <div class="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg" data-astro-cid-mulpto6b> <p class="font-semibold text-yellow-300 mb-2" data-astro-cid-mulpto6b>
Важные уточнения
</p> <p data-astro-cid-mulpto6b>
Мы не продаём и не обмениваем PLEX. PLEX — инструмент ежедневных бонусов
                и страхового возврата. Параметры начислений уточняются в Telegram-боте.
</p> </div> </div> </div> </div> <!-- Additional info cards --> <div class="grid md:grid-cols-2 gap-8" data-astro-cid-mulpto6b> <div class="card" data-astro-cid-mulpto6b> <h3 class="text-xl font-semibold mb-4 text-[var(--accent-primary)]" data-astro-cid-mulpto6b>
Преимущества PLEX
</h3> <ul class="space-y-2 text-[var(--text-secondary)]" data-astro-cid-mulpto6b> <li data-astro-cid-mulpto6b>• Полная прозрачность операций</li> <li data-astro-cid-mulpto6b>• Децентрализованная система</li> <li data-astro-cid-mulpto6b>• Потенциал роста стоимости</li> <li data-astro-cid-mulpto6b>• Ликвидность на биржах</li> </ul> </div> <div class="card" data-astro-cid-mulpto6b> <h3 class="text-xl font-semibold mb-4 text-yellow-400" data-astro-cid-mulpto6b>
Важно понимать
</h3> <ul class="space-y-2 text-[var(--text-secondary)]" data-astro-cid-mulpto6b> <li data-astro-cid-mulpto6b>• Волатильность может работать на вас или против</li> <li data-astro-cid-mulpto6b>• Нет гарантии прибыли, только возврат в PLEX</li> <li data-astro-cid-mulpto6b>• Инвестируйте только свободные средства</li> <li data-astro-cid-mulpto6b>• Изучите риски перед инвестициями</li> </ul> </div> </div> <!-- CTA --> <div class="text-center mt-12" data-astro-cid-mulpto6b> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-mulpto6b>
Готовы инвестировать в кролиководство с PLEX?
</p> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-mulpto6b>
Получить условия в боте
</a> </div> </div> </div> </section> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/PlexTicker.astro", void 0);

const $$Guarantees = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section bg-[var(--bg-secondary)]" data-astro-cid-iulde5kh> <div class="container mx-auto px-6" data-astro-cid-iulde5kh> <div class="max-w-6xl mx-auto" data-astro-cid-iulde5kh> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-iulde5kh> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-iulde5kh>
Сценарии выплат
</h2> <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto" data-astro-cid-iulde5kh>
Штатная модель и форс-мажор. Полная прозрачность условий.
</p> </div> <!-- Tab Navigation --> <div class="flex justify-center mb-12" data-astro-cid-iulde5kh> <div class="bg-[var(--bg-tertiary)] rounded-[var(--radius-xl)] p-2 border border-[var(--border-primary)]" data-astro-cid-iulde5kh> <button id="tab-normal" onclick="showTab('normal')" class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 tab-button active" data-tab="normal" data-astro-cid-iulde5kh>
🟢 Штатно
</button> <button id="tab-force" onclick="showTab('force')" class="px-6 py-3 rounded-lg font-semibold transition-all duration-300 tab-button" data-tab="force" data-astro-cid-iulde5kh>
🔴 Форс-мажор
</button> </div> </div> <!-- Tab Content --> <div id="tab-content" class="mb-12" data-astro-cid-iulde5kh> <!-- Normal Scenario Tab --> <div id="normal-content" class="tab-content active" data-astro-cid-iulde5kh> <div class="max-w-4xl mx-auto" data-astro-cid-iulde5kh> <h3 class="text-3xl font-semibold mb-8 text-green-400 text-center" data-astro-cid-iulde5kh>
🟢 Штатная модель (нормальный сценарий)
</h3> <div class="space-y-6" data-astro-cid-iulde5kh> <div class="card border-green-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>💰</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-green-400 mb-3" data-astro-cid-iulde5kh>
USDT-вход
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
Инвестор вносит USDT в Telegram-боте для участия в проекте.
</p> </div> </div> </div> <div class="card border-blue-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>🎁</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-blue-400 mb-3" data-astro-cid-iulde5kh>
Ежедневные PLEX-бонусы
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
Каждый день начисляются бонусы в монете PLEX (параметры в боте).
</p> </div> </div> </div> <div class="card border-purple-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>🏆</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-purple-400 mb-3" data-astro-cid-iulde5kh>
USDT-выплата (~3 месяца)
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
Возврат тела вклада + прибыль в USDT по завершению цикла.
</p> </div> </div> </div> </div> </div> </div> <!-- Force Majeure Tab --> <div id="force-content" class="tab-content" data-astro-cid-iulde5kh> <div class="max-w-4xl mx-auto" data-astro-cid-iulde5kh> <h3 class="text-3xl font-semibold mb-8 text-red-400 text-center" data-astro-cid-iulde5kh>
🔴 Форс-мажор (страховой механизм)
</h3> <div class="space-y-6" data-astro-cid-iulde5kh> <div class="card border-red-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>🛡️</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-red-400 mb-3" data-astro-cid-iulde5kh>
Возврат тела в PLEX
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
В случае форс-мажора возврат внесённой суммы производится в монете PLEX.
</p> </div> </div> </div> <div class="card border-orange-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>⚠️</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-orange-400 mb-3" data-astro-cid-iulde5kh>
Волатильность PLEX
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
Курс PLEX волатилен; в форс-мажоре возврат в PLEX может быть меньше/больше внесённой суммы.
</p> </div> </div> </div> <div class="card border-yellow-500/20" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0" data-astro-cid-iulde5kh> <span class="text-2xl" data-astro-cid-iulde5kh>📋</span> </div> <div data-astro-cid-iulde5kh> <h4 class="text-lg font-semibold text-yellow-400 mb-3" data-astro-cid-iulde5kh>
Правила возврата
</h4> <p class="text-[var(--text-secondary)]" data-astro-cid-iulde5kh>
Порядок и сроки возврата в форс-мажоре прописаны в правилах Telegram-бота.
</p> </div> </div> </div> </div> </div> </div> </div> <!-- Important notice --> <div class="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-[var(--radius-xl)] p-8" data-astro-cid-iulde5kh> <div class="flex items-start space-x-4" data-astro-cid-iulde5kh> <div class="text-2xl" data-astro-cid-iulde5kh>📋</div> <div class="flex-1" data-astro-cid-iulde5kh> <h3 class="text-xl font-semibold mb-4 text-[var(--accent-primary)]" data-astro-cid-iulde5kh>
Важная информация о PLEX
</h3> <div class="text-[var(--text-secondary)] space-y-3" data-astro-cid-iulde5kh> <p data-astro-cid-iulde5kh> <strong data-astro-cid-iulde5kh>Мы не продаём и не обмениваем PLEX.</strong> </p> <p data-astro-cid-iulde5kh>
В штатной модели ежедневные начисления выполняются в PLEX,
                а итоговая выплата (тело вклада и прибыль) происходит в USDT.
                В случае форс-мажора возврат внесённой суммы производится в PLEX.
</p> <p data-astro-cid-iulde5kh>
PLEX — волатильный актив; оцените риски перед участием.
                Параметры начислений и правила доступны в Telegram-боте.
</p> </div> </div> </div> </div> <!-- CTA --> <div class="text-center mt-12" data-astro-cid-iulde5kh> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-iulde5kh>
Понимаете все риски и готовы инвестировать?
</p> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-iulde5kh>
Начать в Telegram
</a> </div> </div> </div> </section> ${renderScript($$result, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Guarantees.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Guarantees.astro", void 0);

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

const VALID_INPUT_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position"
];

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_mBfOWuRU.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  maxAge: z.number().optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./_astro_assets_DyhmPlZe.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { Path: process.env.Path }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const $$Astro = createAstro();
const $$FaqList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqList;
  const faqEntries = await getCollection("faq");
  const sortedFaq = faqEntries.sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  return renderTemplate`${maybeRenderHead()}<section class="section bg-[var(--bg-primary)]" data-astro-cid-z65bj42f> <div class="container mx-auto px-6" data-astro-cid-z65bj42f> <div class="max-w-4xl mx-auto" data-astro-cid-z65bj42f> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-z65bj42f> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-z65bj42f>
Вопросы и ответы
</h2> <p class="text-xl text-[var(--text-secondary)]" data-astro-cid-z65bj42f>
Ответы на самые популярные вопросы об инвестициях в кролиководство
</p> </div> <!-- FAQ Accordion --> <div class="space-y-4" data-astro-cid-z65bj42f> ${sortedFaq.map((faq, index) => renderTemplate`<div class="card group" data-astro-cid-z65bj42f> <details class="cursor-pointer" data-astro-cid-z65bj42f> <summary class="flex justify-between items-center p-6 list-none" data-astro-cid-z65bj42f> <h3 class="text-lg font-semibold text-[var(--text-primary)] pr-4" data-astro-cid-z65bj42f> ${faq.data.question} </h3> <span class="text-[var(--accent-primary)] text-xl transition-transform group-open:rotate-45" data-astro-cid-z65bj42f>
+
</span> </summary> <div class="px-6 pb-6 pt-2 border-t border-[var(--border-primary)]" data-astro-cid-z65bj42f> <div class="prose prose-invert max-w-none" data-astro-cid-z65bj42f> <div class="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line" data-astro-cid-z65bj42f> ${faq.data.answer} </div> </div> </div> </details> </div>`)} </div> <!-- CTA --> <div class="text-center mt-12" data-astro-cid-z65bj42f> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-z65bj42f>
Остались вопросы? Получите подробные ответы в нашем Telegram-боте
</p> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-z65bj42f>
Задать вопрос в боте
</a> </div> </div> </div> </section> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/FaqList.astro", void 0);

const investorsData = [
	{
		name: "Алексей К.",
		telegram: "@alex_k",
		investment: "500 USDT",
		status: "active",
		consent: true
	},
	{
		name: "Мария С.",
		telegram: "@maria_s",
		investment: "1000 USDT",
		status: "active",
		consent: true
	},
	{
		name: "Дмитрий В.",
		telegram: "@dmitry_v",
		investment: "750 USDT",
		status: "completed",
		consent: true
	}
];

const $$InvestorsWall = createComponent(($$result, $$props, $$slots) => {
  const investors = investorsData;
  return renderTemplate`${maybeRenderHead()}<section id="investors" class="section bg-[var(--bg-primary)]" data-astro-cid-lxsv7l5v> <div class="container mx-auto px-6" data-astro-cid-lxsv7l5v> <div class="max-w-6xl mx-auto" data-astro-cid-lxsv7l5v> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-lxsv7l5v> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-lxsv7l5v>
Наши инвесторы
</h2> <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto" data-astro-cid-lxsv7l5v>
Реальные люди, которые уже инвестируют в токенизацию кролиководства
</p> <div class="mt-6 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] inline-block" data-astro-cid-lxsv7l5v> <p class="text-sm text-[var(--text-secondary)]" data-astro-cid-lxsv7l5v> <strong class="text-[var(--accent-primary)]" data-astro-cid-lxsv7l5v>Важно:</strong> Все отзывы получены с согласия инвесторов на публикацию
</p> </div> </div> <!-- Investors Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" data-astro-cid-lxsv7l5v> ${investors.map((investor) => renderTemplate`<div class="card group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-lxsv7l5v> <div class="flex items-start space-x-4 mb-4" data-astro-cid-lxsv7l5v> <!-- Avatar placeholder --> <div class="w-12 h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center flex-shrink-0" data-astro-cid-lxsv7l5v> <span class="text-white font-bold text-lg" data-astro-cid-lxsv7l5v> ${investor.name.split(" ").map((n) => n[0]).join("")} </span> </div> <div class="flex-1" data-astro-cid-lxsv7l5v> <div class="flex items-center space-x-2 mb-2" data-astro-cid-lxsv7l5v> <h3 class="font-semibold text-[var(--text-primary)]" data-astro-cid-lxsv7l5v> ${investor.name} </h3> ${investor.verified && renderTemplate`<span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full" data-astro-cid-lxsv7l5v>
✓ Проверен
</span>`} </div> <a${addAttribute(`https://t.me/${investor.telegram.replace("@", "")}`, "href")} class="text-[var(--accent-primary)] hover:underline text-sm" target="_blank" rel="noopener noreferrer" data-astro-cid-lxsv7l5v> ${investor.telegram} </a> </div> </div> <div class="bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-primary)]" data-astro-cid-lxsv7l5v> <p class="text-[var(--text-secondary)] italic" data-astro-cid-lxsv7l5v>
"${investor.comment}"
</p> <p class="text-xs text-[var(--text-muted)] mt-3" data-astro-cid-lxsv7l5v>
Участник с ${new Date(investor.date).toLocaleDateString("ru-RU")} </p> </div> </div>`)} </div> <!-- CTA --> <div class="text-center" data-astro-cid-lxsv7l5v> <div class="bg-[var(--bg-secondary)] rounded-[var(--radius-xl)] p-8 border border-[var(--border-primary)] mb-8" data-astro-cid-lxsv7l5v> <h3 class="text-2xl font-semibold text-[var(--accent-primary)] mb-4" data-astro-cid-lxsv7l5v>
Хотите стать частью проекта?
</h3> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-lxsv7l5v>
Присоединяйтесь к инвесторам, которые уже оценили преимущества токенизации кролиководства
</p> <a href="https://t.me/your_bot" class="btn-primary text-lg px-8 py-4 inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-lxsv7l5v>
Начать инвестировать
</a> </div> </div> </div> </div> </section> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/InvestorsWall.astro", void 0);

const $$Community = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section bg-[var(--bg-secondary)]" data-astro-cid-x6ewki5y> <div class="container mx-auto px-6" data-astro-cid-x6ewki5y> <div class="max-w-6xl mx-auto" data-astro-cid-x6ewki5y> <!-- Section header --> <div class="text-center mb-16" data-astro-cid-x6ewki5y> <h2 class="text-4xl md:text-5xl font-bold mb-6" data-astro-cid-x6ewki5y>
Сообщество
</h2> <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto" data-astro-cid-x6ewki5y>
Присоединяйтесь к нашему комьюнити в Telegram и следите за видеоотчетами
</p> </div> <!-- Community Links Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-astro-cid-x6ewki5y> <!-- Telegram Channel --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>📢</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
Официальный канал
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Новости проекта, важные обновления и анонсы
</p> <a href="https://t.me/rabbitfarm_channel" class="btn-secondary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Подписаться
</a> </div> <!-- Telegram Investors Group --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>💬</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
Группа инвесторов
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Обсуждения, вопросы и поддержка инвесторов
</p> <a href="https://t.me/rabbitfarm_investors" class="btn-secondary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Присоединиться
</a> </div> <!-- Telegram Info Group --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>ℹ️</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
Ознакомительная группа
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Для новых участников и общая информация
</p> <a href="https://t.me/rabbitfarm_info" class="btn-secondary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Вступить
</a> </div> <!-- RuTube Channel --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>📺</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
RuTube канал
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Полные видеоотчеты о работе фермы
</p> <a href="https://rutube.ru/channel/rabbitfarm" class="btn-secondary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Смотреть
</a> </div> <!-- YouTube Channel --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>🎥</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
YouTube канал
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Видеоотчеты и образовательный контент
</p> <a href="https://youtube.com/@rabbitfarm" class="btn-secondary inline-block" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Подписаться
</a> </div> <!-- B2B Contacts --> <div class="card text-center group hover:border-[var(--accent-primary)] transition-colors" data-astro-cid-x6ewki5y> <div class="w-16 h-16 bg-[var(--accent-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--accent-primary)]/30 transition-colors" data-astro-cid-x6ewki5y> <span class="text-2xl" data-astro-cid-x6ewki5y>🤝</span> </div> <h3 class="text-xl font-semibold mb-3 text-[var(--text-primary)]" data-astro-cid-x6ewki5y>
B2B сотрудничество
</h3> <p class="text-[var(--text-secondary)] mb-4" data-astro-cid-x6ewki5y>
Для партнеров и крупных инвесторов
</p> <div class="space-y-2" data-astro-cid-x6ewki5y> <a href="mailto:partners@rabbitfarm.com" class="btn-secondary inline-block text-sm" data-astro-cid-x6ewki5y>
partners@rabbitfarm.com
</a> <br data-astro-cid-x6ewki5y> <a href="https://t.me/rabbitfarm_b2b" class="btn-secondary inline-block text-sm" target="_blank" rel="noopener noreferrer" data-astro-cid-x6ewki5y>
Telegram B2B
</a> </div> </div> </div> <!-- Presentation Download --> <div class="text-center" data-astro-cid-x6ewki5y> <div class="bg-[var(--bg-tertiary)] rounded-[var(--radius-xl)] p-8 border border-[var(--border-primary)]" data-astro-cid-x6ewki5y> <h3 class="text-2xl font-semibold text-[var(--accent-primary)] mb-4" data-astro-cid-x6ewki5y>
Презентация проекта
</h3> <p class="text-[var(--text-secondary)] mb-6" data-astro-cid-x6ewki5y>
Подробная презентация для инвесторов и партнеров
</p> <a href="/DEXRabbit_presentation.pdf" class="btn-primary text-lg px-8 py-4 inline-block" download data-astro-cid-x6ewki5y>
📄 Скачать PDF (2.5 MB)
</a> <p class="text-xs text-[var(--text-muted)] mt-3" data-astro-cid-x6ewki5y>
Последнее обновление: ${(/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU")} </p> </div> </div> </div> </div> </section> `;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/components/Community.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "\u041A\u0440\u043E\u043B\u0438\u0447\u044C\u044F \u0444\u0435\u0440\u043C\u0430 - \u0422\u043E\u043A\u0435\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0440\u0430\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043A\u0440\u043E\u043B\u0438\u043A\u043E\u0432", "description": "\u041A\u0440\u043E\u043B\u0438\u0447\u044C\u044F \u0444\u0435\u0440\u043C\u0430 \u0441 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u043E\u0439. \u0412\u043A\u043B\u0430\u0434 \u0438 \u0434\u043E\u0445\u043E\u0434 \u2014 \u0432 PLEX. \u041F\u043E\u043B\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0432\u044B\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u044F \u0438 \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0439." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "HowItWorks", $$HowItWorks, {})} ${renderComponent($$result2, "RabbitsGallery", $$RabbitsGallery, {})} ${renderComponent($$result2, "PlexTicker", $$PlexTicker, {})} ${renderComponent($$result2, "Guarantees", $$Guarantees, {})} ${renderComponent($$result2, "FaqList", $$FaqList, {})} ${renderComponent($$result2, "InvestorsWall", $$InvestorsWall, {})} ${renderComponent($$result2, "Community", $$Community, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/konfu/Desktop/\u041A\u0440\u043E\u043B\u0438\u043A\u0438/site/src/pages/index.astro", void 0);

const $$file = "C:/Users/konfu/Desktop/Кролики/site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { DEFAULT_OUTPUT_FORMAT as D, VALID_SUPPORTED_FORMATS as V, DEFAULT_HASH_PROPS as a, page as p };
