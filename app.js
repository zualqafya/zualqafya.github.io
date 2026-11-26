(function(){
  var list=document.getElementById('lessonList');
  if(list&&window.LESSONS){
    list.innerHTML=window.LESSONS.map(function(l,i){
      var v=l.video?'<a class="btn gold" href="'+l.video+'" target="_blank" rel="noopener">▶ فيديو</a>':'<span class="btn off">▶ قريبًا</span>';
      var p=l.pdf?'<a class="btn ghost" href="'+l.pdf+'" download>⬇ PDF</a>':'';
      var r=l.read?'<a class="btn ghost" href="'+l.read+'">📖 اقرأ</a>':'';
      return '<article class="lesson t'+(i%4)+'"><div class="lno">'+(i+1)+'</div><h3>'+l.title+'</h3><p class="lsub">'+(l.sub||'')+'</p><div class="lact">'+v+p+r+'</div></article>';
    }).join('');
  }
  var f=document.getElementById('askForm'),m=document.getElementById('formMsg');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var b=f.querySelector('button');b.disabled=true;m.className='formmsg';m.textContent='جاري الإرسال...';
    var fd=new FormData(f);
    fetch(f.action,{method:'POST',body:fd,headers:{'Accept':'application/json'}}).then(function(r){return r.json()}).then(function(d){
      if(d.success){m.className='formmsg ok';m.textContent='وصلت رسالتك للأستاذ أمين، وهيرد عليك قريبًا بإذن الله.';f.reset();}
      else throw new Error('fail');
    }).catch(function(){
      var t=encodeURIComponent('سؤال من موقع ذو القافية:\n'+(fd.get('message')||''));
      m.className='formmsg err';m.innerHTML='تعذر الإرسال دلوقتي. <a href="https://t.me/AMAK_4?text='+t+'" target="_blank" rel="noopener">ابعتها على التليجرام</a>';
    }).then(function(){b.disabled=false;});
  });}
})();
