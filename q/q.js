(function(){
var app=document.getElementById('qapp'),Q=[],D={},i=0,score=0,log=[],pick_=[],L=['أ','ب','ج','د'],LV=['متوسط','عالي','متفوق','أوائل الجمهورية','قمة التفوق'];
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function grade(p){return p>=90?{c:3,t:'ممتاز',m:'مستواك قريب من مستوى أوائل الجمهورية في هذا الدرس. استمر وانتقل للدرس التالي.'}:p>=75?{c:2,t:'جيد جدًا',m:'مستواك قوي. راجع الأسئلة اللي غلطت فيها وهتوصل للامتياز.'}:p>=60?{c:1,t:'جيد',m:'فاهم الأساس، بس محتاج تثبّت القواعد وتتدرب على الأسئلة الأعلى مستوى.'}:{c:0,t:'محتاج مراجعة',m:'ارجع للدرس واقرأه من جديد، وبعدين جرّب الاختبار تاني. هتتحسن بالتدريج.'}}
var id=(new URLSearchParams(location.search).get('l')||'').replace(/[^a-z0-9-]/gi,'');
fetch('/q/data/'+id+'.json?'+Date.now()).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){D=d;Q=d.questions;document.title=d.title+' | ذو القافية';intro()}).catch(function(){app.innerHTML='<p class="qload">تعذر تحميل الاختبار. تأكد من الرابط أو النت وحاول تاني.</p>'});
function stages(cur){return '<div class="stages">'+LV.map(function(n,k){return '<span class="stg'+(n===cur?' on':'')+'">'+n+'</span>'}).join('')+'</div>'}
function intro(){i=0;score=0;log=[];pick_=[];app.innerHTML='<div class="qcard qres"><span class="qbeta">نسخة تجريبية</span><h1 style="color:#f2cf7a;margin:14px 0 4px;font-size:26px">'+esc(D.title)+'</h1><p style="margin:0;color:#b9a46a">'+esc(D.grade)+'، '+esc(D.sub||'')+'</p>'+stages('')+'<p>'+Q.length+' سؤال، مرتبة من المتوسط إلى مستوى أوائل الجمهورية، وتنتهي بمرحلة «قمة التفوق». اختار إجابة وهتعرف صح ولا غلط فورًا مع الشرح، والإجابة بعد الاختيار ما تتغيرش.</p><div class="qbtns"><button class="g" id="go">ابدأ الاختبار</button><a href="/manahej/">رجوع للمناهج</a></div></div>';document.getElementById('go').onclick=show}
function show(){
 var q=Q[i],lk=LV.indexOf(q.level);
 app.innerHTML='<div class="qtop"><span>سؤال '+(i+1)+' من '+Q.length+'</span><span class="qbeta">تجريبي</span></div><div class="qbar"><i style="width:'+(i/Q.length*100)+'%"></i></div><div class="qcard"><span class="qlvl l'+lk+'">'+esc(q.level)+'</span><p class="qq">'+esc(q.question)+'</p><div class="qopts">'+q.options.map(function(o,k){return '<button class="qopt" data-k="'+k+'"><b>'+L[k]+'</b><span>'+esc(o)+'</span></button>'}).join('')+'</div><div id="fb"></div></div>';
 app.querySelectorAll('.qopt').forEach(function(b){b.onclick=function(){pick(+b.dataset.k)}});
}
function pick(k){
 var q=Q[i],ok=k===q.answer_index;if(ok)score++;log.push(ok);pick_.push(k);
 app.querySelectorAll('.qopt').forEach(function(b,j){b.disabled=true;if(j===q.answer_index)b.classList.add('ok');else if(j===k)b.classList.add('bad')});
 var last=i===Q.length-1;
 document.getElementById('fb').innerHTML='<div class="qexp"><strong>'+(ok?'✔ إجابة صحيحة':'✘ إجابة غلط. الصح: '+esc(q.options[q.answer_index]))+'</strong><br>'+esc(q.explanation||'')+'</div><button class="qnext" id="nx">'+(last?'شوف النتيجة':'السؤال التالي')+'</button>';
 var nx=document.getElementById('nx');nx.focus();nx.onclick=function(){if(last)end();else{i++;show();scrollTo(0,0)}}
}
function end(){
 var p=Math.round(score/Q.length*100),G=grade(p);
 var by=LV.map(function(n){var t=0,c=0;Q.forEach(function(q,k){if(q.level===n){t++;if(log[k])c++}});return t?'<div class="lvr"><span>'+n+'</span><i><b style="width:'+(c/t*100)+'%"></b></i><span>'+c+' / '+t+'</span></div>':''}).join('');
 app.innerHTML='<div class="qcard qres"><span class="qbeta">نسخة تجريبية</span><p style="margin:14px 0 0">نتيجتك في «'+esc(D.title)+'»</p><div class="qscore" dir="ltr">'+score+' / '+Q.length+'</div><div class="qgrade g'+G.c+'">'+G.t+'</div><p>'+p+'٪. '+G.m+'</p><div class="lvbar">'+by+'</div><div class="qrev">'+Q.map(function(q,k){return '<details class="'+(log[k]?'r':'w')+'"><summary>'+(log[k]?'✔ ':'✘ ')+(k+1)+'. '+esc(q.question)+'</summary><div class="ak"><b>الإجابة الصحيحة:</b> '+esc(q.options[q.answer_index])+'<br>'+esc(q.explanation||'')+'</div></details>'}).join('')+'</div><div class="qbtns"><button class="g" id="again">إعادة الاختبار</button><a href="/manahej/">رجوع للمناهج</a></div></div>';
 document.getElementById('again').onclick=intro;scrollTo(0,0);
}
})();
