const V='zq-v3';
const FILES=["/", "/itnab/", "/style.css", "/manifest.webmanifest", "/img/title.png", "/img/name.png", "/img/amin.jpg", "/icons/icon-192.png", "/icons/icon-512.png", "/fonts/Tajawal-Bold.ttf", "/fonts/Tajawal-Medium.ttf", "/fonts/Tajawal-Regular.ttf", "/itnab/pages/p-01.jpg", "/itnab/pages/p-02.jpg", "/itnab/pages/p-03.jpg", "/itnab/pages/p-04.jpg", "/itnab/pages/p-05.jpg", "/itnab/pages/p-06.jpg", "/itnab/pages/p-07.jpg", "/itnab/pages/p-08.jpg", "/itnab/pages/p-09.jpg", "/itnab/pages/p-10.jpg", "/itnab/pages/p-11.jpg", "/itnab/pages/p-12.jpg", "/itnab/pages/p-13.jpg", "/itnab/pages/p-14.jpg", "/itnab/pages/p-15.jpg", "/itnab/pages/p-16.jpg", "/itnab/pages/p-17.jpg", "/itnab/pages/p-18.jpg", "/itnab/pages/p-19.jpg", "/itnab/pages/p-20.jpg", "/itnab/pages/p-21.jpg", "/itnab/pages/p-22.jpg", "/itnab/pages/p-23.jpg", "/itnab/pages/p-24.jpg", "/itnab/pages/p-25.jpg", "/itnab/pages/p-26.jpg", "/itnab/pages/p-27.jpg", "/itnab/pages/p-28.jpg", "/itnab/pages/p-29.jpg", "/itnab/pages/p-30.jpg", "/itnab/pages/p-31.jpg", "/itnab/pages/p-32.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!=='GET')return;
 const u=new URL(r.url); if(u.origin!==location.origin)return;
 e.respondWith(
  fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;})
  .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('/'):Response.error())))
 );
});
