const CACHE='awo-shell-v1';
const SHELL=['./','./index.html','./manifest.json'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  // App shell (page navigations): network-first, fall back to cache when offline.
  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return r;})
                .catch(()=>caches.match(req).then(m=>m||caches.match('./index.html')))
    );
    return;
  }
  // Everything else (live gviz data, CDN fonts/echarts): pass through to network — never cache live data.
});
