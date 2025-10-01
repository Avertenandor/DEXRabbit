// assets/js/perf/schedule.js
// Утилиты для планирования тяжёлых операций
export const idle = (cb, timeout=120) =>
  (window.requestIdleCallback || ((fn)=>setTimeout(fn,0)))(cb, {timeout});

export const nextFrame = (cb) =>
  (window.requestAnimationFrame || ((fn)=>setTimeout(fn,16)))(cb);
