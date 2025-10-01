// assets/js/perf/sanitize-message.js
// Фильтрация сообщений от виджетов для предотвращения тяжёлых обработчиков
(function(){
  const ALLOW = new Set([
    'https://www.geckoterminal.com',
    'https://dexscreener.com',
    'https://widgets.coingecko.com'
  ]);
  
  function safeHandleMessage(e){
    if (!e || !e.origin || !ALLOW.has(e.origin)) return; // игнор всего чужого
    
    // Лёгкая обработка синхронно:
    // ... минимум логики ...
    
    // Тяжёлое — позже:
    (window.requestIdleCallback || setTimeout)(() => {
      try {
        // поместите тяжёлый код/DOM-апдейты сюда
      } catch(_) {}
    }, {timeout: 120});
  }
  
  window.addEventListener('message', safeHandleMessage, {capture:false}); // passive тут не влияет
})();
