// Can Ferrer — interacciones compartidas
(function(){
  var hdr=document.getElementById('hdr');
  if(hdr && !hdr.classList.contains('solid')){
    var onScroll=function(){hdr.classList.toggle('scrolled',window.scrollY>60);};
    addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  // reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  // parallax
  var px=[].slice.call(document.querySelectorAll('[data-parallax]'));
  if(px.length){addEventListener('scroll',function(){px.forEach(function(el){
    var r=el.getBoundingClientRect();
    var off=(r.top+r.height/2-innerHeight/2)*-parseFloat(el.dataset.parallax);
    el.style.transform='translateY('+off+'px)';});},{passive:true});}
  // counters
  var sio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){var el=e.target,to=+el.dataset.count,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
      var n=0,step=Math.max(1,to/40);var t=setInterval(function(){n+=step;if(n>=to){n=to;clearInterval(t);}el.textContent=pre+Math.round(n)+suf;},28);
      sio.unobserve(el);}});},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){sio.observe(el);});
  // drawer
  var dr=document.getElementById('drawer'),bg=document.getElementById('burger'),cl=document.getElementById('close');
  if(dr&&bg){bg.onclick=function(){dr.classList.add('open');};
    if(cl)cl.onclick=function(){dr.classList.remove('open');};
    dr.querySelectorAll('a').forEach(function(a){a.onclick=function(){dr.classList.remove('open');};});}
})();
