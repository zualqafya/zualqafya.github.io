(function(){if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var els=document.querySelectorAll('.blk,.apkrow');if(!els.length)return;document.documentElement.classList.add('fx');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
els.forEach(function(e){io.observe(e)});setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},4000)})();
