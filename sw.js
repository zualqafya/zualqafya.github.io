const V='zq-v42';
const FILES=["/", "/style.css?v=12", "/home3.css?v=16", "/fonts/ArefRuqaa-Bold.ttf", "/fonts/ReemKufi.ttf", "/manifest.webmanifest", "/img/title.png", "/img/name.png", "/img/amin.jpg", "/icons/icon-192.png", "/icons/icon-512.png", "/fonts/Tajawal-Bold.ttf", "/fonts/Tajawal-Medium.ttf", "/fonts/Tajawal-Regular.ttf", "/lessons.js", "/fx.js", "/app.js", "/quiz/", "/quizzes/", "/manahej/", "/q/", "/q/q.js?v=2", "/q/q.css?v=4", "/notes/", "/notes/memos.js?v=2", "/notes/n.css?v=3", "/live/", "/quiz/quiz.js?v=4", "/quiz/quiz.css?v=2", "/quiz/bank.json"];
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
