import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_DLqYx5dN.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/","cacheDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/node_modules/.astro/","outDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/","srcDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/src/","publicDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/public/","buildClientDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/client/","buildServerDir":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/server/","adapterName":"","routes":[{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/catalog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/catalog","isIndex":false,"type":"page","pattern":"^\\/catalog\\/?$","segments":[[{"content":"catalog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/catalog.astro","pathname":"/catalog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/contacts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacts","isIndex":false,"type":"page","pattern":"^\\/contacts\\/?$","segments":[[{"content":"contacts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacts.astro","pathname":"/contacts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/faq/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/faq","isIndex":false,"type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/legal/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/legal","isIndex":true,"type":"page","pattern":"^\\/legal\\/?$","segments":[[{"content":"legal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/legal/index.astro","pathname":"/legal","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/policy","isIndex":false,"type":"page","pattern":"^\\/policy\\/?$","segments":[[{"content":"policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/policy.astro","pathname":"/policy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://xn--80apagbbfxgmuj4j.site","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/konfu/Desktop/Кролики/site/src/pages/legal/index.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/catalog.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/catalog@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/faq.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/faq@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/contacts.astro",{"propagation":"none","containsHead":true}],["C:/Users/konfu/Desktop/Кролики/site/src/pages/policy.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/catalog@_@astro":"pages/catalog.astro.mjs","\u0000@astro-page:src/pages/contacts@_@astro":"pages/contacts.astro.mjs","\u0000@astro-page:src/pages/faq@_@astro":"pages/faq.astro.mjs","\u0000@astro-page:src/pages/legal/index@_@astro":"pages/legal.astro.mjs","\u0000@astro-page:src/pages/policy@_@astro":"pages/policy.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BClhCevn.mjs","C:\\Users\\konfu\\Desktop\\Кролики\\site\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\konfu\\Desktop\\Кролики\\site\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DoryZ--_.mjs","C:/Users/konfu/Desktop/Кролики/site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BHKWks2E.mjs","C:/Users/konfu/Desktop/Кролики/site/src/components/Header.astro?astro&type=script&index=0&lang.ts":"assets/Header.astro_astro_type_script_index_0_lang.BZkpTDGC.js","C:/Users/konfu/Desktop/Кролики/site/src/components/Header.astro?astro&type=script&index=1&lang.ts":"assets/Header.astro_astro_type_script_index_1_lang.Bi-qSg74.js","C:/Users/konfu/Desktop/Кролики/site/src/components/StickyCta.astro?astro&type=script&index=0&lang.ts":"assets/StickyCta.astro_astro_type_script_index_0_lang.DhiE-9kl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/konfu/Desktop/Кролики/site/src/components/Header.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"mobile-menu-button\"),n=document.getElementById(\"mobile-menu\");t&&n&&(t.addEventListener(\"click\",()=>{const e=t.getAttribute(\"aria-expanded\")===\"true\";t.setAttribute(\"aria-expanded\",!e),n.classList.toggle(\"hidden\"),e?document.body.style.overflow=\"\":document.body.style.overflow=\"hidden\"}),document.addEventListener(\"click\",e=>{!t.contains(e.target)&&!n.contains(e.target)&&(t.setAttribute(\"aria-expanded\",\"false\"),n.classList.add(\"hidden\"),document.body.style.overflow=\"\")}),document.addEventListener(\"keydown\",e=>{e.key===\"Escape\"&&(t.setAttribute(\"aria-expanded\",\"false\"),n.classList.add(\"hidden\"),document.body.style.overflow=\"\")}));document.querySelectorAll('a[href^=\"#\"]').forEach(e=>{e.addEventListener(\"click\",function(o){o.preventDefault();const d=document.querySelector(this.getAttribute(\"href\"));d&&d.scrollIntoView({behavior:\"smooth\",block:\"start\"})})});"],["C:/Users/konfu/Desktop/Кролики/site/src/components/Header.astro?astro&type=script&index=1&lang.ts","const n=document.getElementById(\"navBtn\"),t=document.getElementById(\"nav\");n?.addEventListener(\"click\",()=>{t?.classList.toggle(\"hidden\")});"],["C:/Users/konfu/Desktop/Кролики/site/src/components/StickyCta.astro?astro&type=script&index=0&lang.ts","let s=0;const t=document.getElementById(\"sticky-cta\");function n(){if(!t)return;const e=window.pageYOffset||document.documentElement.scrollTop;e>s&&e>100?(t.style.transform=\"translateY(0)\",t.style.opacity=\"1\"):e<s&&e<window.innerHeight&&(t.style.transform=\"translateY(100%)\",t.style.opacity=\"0\"),s=e}t&&(t.style.transform=\"translateY(100%)\",t.style.opacity=\"0\",t.style.transition=\"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease\",window.addEventListener(\"scroll\",n,{passive:!0}),window.addEventListener(\"resize\",n,{passive:!0}),window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches&&(t.style.transition=\"none\"));"]],"assets":["/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/404.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/catalog/index.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/contacts/index.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/faq/index.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/legal/index.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/policy/index.html","/file:///C:/Users/konfu/Desktop/%D0%9A%D1%80%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8/site/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"t8auOfVJAsk81AD7311ZofefprMHnkPeQKdZtpd6XCQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
