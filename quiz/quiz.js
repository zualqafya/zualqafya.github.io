function grade(p){return p>=90?{c:3,t:'ممتاز',m:'أداء رائع، أنت متمكن من الدرس. انتقل للأصعب وحافظ على مستواك.'}:p>=75?{c:2,t:'جيد جدًا',m:'مستواك قوي. راجع الأسئلة اللي غلطت فيها وهتوصل للامتياز.'}:p>=60?{c:1,t:'جيد',m:'فاهم الأساس، بس محتاج تثبّت القواعد. راجع الشرح تحت وجرّب تاني.'}:{c:0,t:'محتاج مراجعة',m:'ارجع للدرس واقرأ الشرح من جديد، وبعدين جرّب الكويز تاني. هتتحسن بالتدريج.'}}
(function(){
var app=document.getElementById('qapp'),Q=[],i=0,score=0,log=[],L=['أ','ب','ج','د'];
function esc(s){return String(s).replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
fetch('/quiz/bank.json?'+Date.now()).then(function(r){return r.json()}).then(function(d){Q=d.questions;start()}).catch(function(){app.innerHTML='<p class="qload">تعذر تحميل الأسئلة. تأكد من النت وحاول تاني.</p>'});
function start(){i=0;score=0;log=[];intro()}
function intro(){app.innerHTML='<div class="qcard qres"><span class="qbeta">نسخة تجريبية</span><h1 style="color:#f2cf7a;margin:14px 0 4px">كويز المبتدأ والخبر</h1><p>'+Q.length+' سؤال، الصف الثالث الثانوي. اختار إجابة وهتعرف صح ولا غلط فورًا مع الشرح.</p><div class="qbtns"><button class="g" id="go">ابدأ الكويز</button></div></div>';document.getElementById('go').onclick=show}
function show(){
 var q=Q[i];
 app.innerHTML='<div class="qtop"><span>سؤال '+(i+1)+' من '+Q.length+'</span><span class="qbeta">تجريبي</span></div><div class="qbar"><i style="width:'+(i/Q.length*100)+'%"></i></div><div class="qcard"><span class="qlvl">'+esc(q.level)+'</span><p class="qq">'+esc(q.question)+'</p><div class="qopts">'+q.options.map(function(o,k){return '<button class="qopt" data-k="'+k+'"><b>'+L[k]+'</b><span>'+esc(o)+'</span></button>'}).join('')+'</div><div id="fb"></div></div>';
 app.querySelectorAll('.qopt').forEach(function(b){b.onclick=function(){pick(+b.dataset.k)}});
}
function pick(k){
 var q=Q[i],ok=k===q.answer_index;if(ok)score++;log.push(ok);
 app.querySelectorAll('.qopt').forEach(function(b,j){b.disabled=true;if(j===q.answer_index)b.classList.add('ok');else if(j===k)b.classList.add('bad')});
 var last=i===Q.length-1;
 document.getElementById('fb').innerHTML='<div class="qexp"><strong>'+(ok?'✔ إجابة صحيحة':'✘ إجابة غلط. الصح: '+esc(q.answer))+'</strong><br>'+esc(q.explanation||'')+'</div><button class="qnext" id="nx">'+(last?'شوف النتيجة':'السؤال التالي')+'</button>';
 var nx=document.getElementById('nx');nx.focus();nx.onclick=function(){if(last)end();else{i++;show();scrollTo(0,0)}}
}
function end(){
 var p=Math.round(score/Q.length*100),G=grade(p),m=G.m;
 app.innerHTML='<div class="qcard qres"><span class="qbeta">نسخة تجريبية</span><p style="margin:14px 0 0">نتيجتك</p><div class="qscore" dir="ltr">'+score+' / '+Q.length+'</div><div class="qgrade g'+G.c+'">'+G.t+'</div><p>'+p+'٪ . '+m+'</p><div class="qrev">'+Q.map(function(q,k){return '<div class="'+(log[k]?'r':'w')+'">'+(log[k]?'✔ ':'✘ ')+(k+1)+'. '+esc(q.question)+'</div>'}).join('')+'</div><div class="qbtns"><button class="g" id="again">إعادة الكويز</button><a href="/">الرئيسية</a></div></div>';
 document.getElementById('again').onclick=start;scrollTo(0,0);
}
})();
