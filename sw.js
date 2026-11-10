// Offline cache for the simulator only (its own scope: /simulator/). Network first, cache as fallback.
const C='sb-sim-3',A=['./','index.html','manifest.webmanifest','../icon-192.png','../icon-512.png','../icon-maskable-512.png','../apple-touch-icon.png','../logo-mark.svg'];
self.oninstall=e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))};
self.onactivate=e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.startsWith('sb-sim')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
self.onfetch=e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))};
