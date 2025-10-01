// assets/js/utils/onPassive.js
// Утилита для добавления пассивных event listeners
export function onPassive(el, ev, fn, opts={}) {
  const supportsPassive = (function(){
    let ok = false;
    try {
      const o = Object.defineProperty({}, 'passive', { get(){ ok = true; } });
      window.addEventListener('test', null, o); 
      window.removeEventListener('test', null, o);
    } catch(_) {}
    return ok;
  })();
  
  const options = supportsPassive ? {...opts, passive: true} : false;
  el.addEventListener(ev, fn, options);
}
