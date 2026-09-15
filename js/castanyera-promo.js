/* Can Ferrer · El Petit Refugi — Promoción La Castanyera (campaña otoño 2026)
   Para retirarla: borrar este archivo y la línea <script src="js/castanyera-promo.js"></script> de las páginas. */
(function () {
  var FIN = new Date('2026-11-02T00:00:00');           // deja de mostrarse tras la actividad
  var CLAVE = 'castanyera2026';                         // una vez por sesión de navegación
  if (new Date() > FIN) return;

  var T = {
    es: { eyebrow:'Novedad de otoño', title:'La Castanyera al Petit Refugi',
      text:'Una mañana entre castañas, naturaleza y burros miniatura: paseo por el entorno, taller creativo y degustación de castañas y panellets.',
      meta:'31 de octubre y 1 de noviembre · 2 h · Desde 15 € por persona · Plazas limitadas',
      more:'Saber más', book:'Reservar', rates:'Ver tarifas', close:'Cerrar',
      banner:'La Castanyera · 31 oct y 1 nov · Plazas limitadas',
      art:'castanyera.html', cont:'6_Contacto.html', pdf:'tarifas_castanyera_es.pdf' },
    ca: { eyebrow:'Novetat de tardor', title:'La Castanyera al Petit Refugi',
      text:"Un matí entre castanyes, natura i rucs miniatura: passejada per l'entorn, taller creatiu i tast de castanyes i panellets.",
      meta:"31 d'octubre i 1 de novembre · 2 h · Des de 15 € per persona · Places limitades",
      more:'Saber-ne més', book:'Reservar', rates:'Veure tarifes', close:'Tancar',
      banner:'La Castanyera · 31 oct i 1 nov · Places limitades',
      art:'castanyera_cat.html', cont:'6_Contacto_cat.html', pdf:'tarifas_castanyera_cat.pdf' },
    en: { eyebrow:'New this autumn', title:'La Castanyera at El Petit Refugi',
      text:'A morning of chestnuts, nature and miniature donkeys: a nature walk, a creative workshop and a tasting of chestnuts and panellets.',
      meta:'31 October and 1 November · 2 h · From €15 per person · Limited places',
      more:'Find out more', book:'Book', rates:'View rates', close:'Close',
      banner:'La Castanyera · 31 Oct & 1 Nov · Limited places',
      art:'castanyera_en.html', cont:'6_Contacto_en.html', pdf:'tarifas_castanyera_en.pdf' },
    de: { eyebrow:'Neu im Herbst', title:'La Castanyera im Petit Refugi',
      text:'Ein Vormittag mit Maronen, Natur und Miniatureseln: Spaziergang, Kreativworkshop und Verkostung von Maronen und Panellets.',
      meta:'31. Oktober und 1. November · 2 Std. · Ab 15 € pro Person · Begrenzte Plätze',
      more:'Mehr erfahren', book:'Reservieren', rates:'Preise ansehen', close:'Schließen',
      banner:'La Castanyera · 31. Okt. und 1. Nov. · Begrenzte Plätze',
      art:'castanyera_de.html', cont:'6_Contacto_de.html', pdf:'tarifas_castanyera_de.pdf' }
  };

  var lang = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
  var t = T[lang] || T.es;
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var enArticulo = file.indexOf('castanyera') === 0;
  var enHome = /^(index\.html|1_home_(cat|en|de)\.html|)$/.test(file);

  var css = document.createElement('style');
  css.textContent = [
    '.cast-band{position:fixed;top:0;left:0;width:100%;z-index:1200;background:var(--forest,#0f2417);color:var(--cream,#faf8f2);',
      'font-family:var(--sans,sans-serif);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;',
      'display:flex;align-items:center;justify-content:center;gap:1.2rem;padding:.7rem 3rem .7rem 1.2rem;text-align:center;line-height:1.35}',
    '.cast-band a{color:var(--gold-soft,#c9a96e);border-bottom:1px solid rgba(201,169,110,.5);padding-bottom:1px;white-space:nowrap}',
    '.cast-band button{position:absolute;right:.9rem;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;',
      'color:rgba(250,248,242,.6);font-size:1rem;line-height:1;padding:.3rem}',
    '.cast-band button:hover{color:var(--gold-soft,#c9a96e)}',
    'body.cast-band-on header{top:var(--cast-band-h,0px)}',
    '@media(max-width:640px){.cast-band{font-size:.62rem;letter-spacing:.1em;gap:.7rem;padding:.6rem 2.6rem .6rem 1rem;flex-direction:column}}',

    '.cast-ov{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:1.2rem;',
      'background:rgba(11,24,15,.72);backdrop-filter:blur(6px);opacity:0;transition:opacity .45s ease}',
    '.cast-ov.in{opacity:1}',
    '.cast-modal{position:relative;width:min(880px,100%);max-height:92vh;overflow:auto;background:var(--cream,#faf8f2);',
      'border-radius:3px;display:grid;grid-template-columns:42% 58%;box-shadow:0 30px 80px rgba(0,0,0,.45);',
      'transform:translateY(22px) scale(.985);transition:transform .55s cubic-bezier(.16,1,.3,1)}',
    '.cast-ov.in .cast-modal{transform:none}',
    '.cast-modal .pic{position:relative;min-height:320px}',
    '.cast-modal .pic img{width:100%;height:100%;object-fit:cover;display:block}',
    '.cast-modal .body{padding:clamp(1.8rem,3.4vw,2.8rem)}',
    '.cast-modal .eyebrow{font-family:var(--sans,sans-serif);font-size:.66rem;letter-spacing:.34em;text-transform:uppercase;',
      'font-weight:600;color:var(--gold,#b1894f);margin-bottom:1rem}',
    '.cast-modal h3{font-family:var(--serif,Georgia,serif);font-weight:300;font-size:clamp(1.8rem,3.4vw,2.5rem);',
      'line-height:1.06;color:var(--ink,#16190f);margin-bottom:.9rem}',
    '.cast-modal p{font-family:var(--sans,sans-serif);font-weight:300;font-size:.95rem;line-height:1.6;color:var(--muted,#5b6450)}',
    '.cast-modal .meta{margin-top:1rem;font-size:.78rem;letter-spacing:.04em;color:var(--ink,#16190f);font-weight:500}',
    '.cast-modal .acts{margin-top:1.8rem;display:flex;flex-wrap:wrap;gap:.7rem;align-items:center}',
    '.cast-modal .b1{background:var(--gold,#b1894f);color:var(--cream,#faf8f2);padding:.9rem 1.7rem;border-radius:999px;',
      'font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;transition:.35s}',
    '.cast-modal .b1:hover{background:var(--forest,#0f2417)}',
    '.cast-modal .b2{border:1px solid var(--forest,#0f2417);color:var(--forest,#0f2417);padding:.9rem 1.7rem;border-radius:999px;',
      'font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;transition:.35s}',
    '.cast-modal .b2:hover{background:var(--forest,#0f2417);color:var(--cream,#faf8f2)}',
    '.cast-modal .b3{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--sage,#5f6f4d);',
      'border-bottom:1px solid rgba(95,111,77,.4);padding-bottom:2px}',
    '.cast-modal .b3:hover{color:var(--gold,#b1894f);border-color:var(--gold,#b1894f)}',
    '.cast-modal .x{position:absolute;top:.8rem;right:.9rem;z-index:3;background:rgba(250,248,242,.9);border:0;border-radius:999px;',
      'width:34px;height:34px;cursor:pointer;font-size:1.05rem;line-height:1;color:var(--ink,#16190f)}',
    '.cast-modal .x:hover{background:var(--gold,#b1894f);color:#fff}',
    '@media(max-width:720px){.cast-modal{grid-template-columns:1fr;max-height:88vh}.cast-modal .pic{min-height:180px;max-height:34vh}}'
  ].join('');
  document.head.appendChild(css);

  function guardar() { try { sessionStorage.setItem(CLAVE, '1'); } catch (e) {} }
  function visto() { try { return sessionStorage.getItem(CLAVE) === '1'; } catch (e) { return false; } }

  /* --- banda fija (solo home) --- */
  if (enHome) {
    var band = document.createElement('div');
    band.className = 'cast-band';
    band.innerHTML = '<span>' + t.banner + '</span><a href="' + t.art + '">' + t.more + '</a>' +
      '<button type="button" aria-label="' + t.close + '">&#10005;</button>';
    document.body.appendChild(band);
    document.body.classList.add('cast-band-on');
    var ajusta = function () {
      document.documentElement.style.setProperty('--cast-band-h', band.offsetHeight + 'px');
    };
    ajusta(); addEventListener('resize', ajusta);
    band.querySelector('button').onclick = function () {
      band.remove();
      document.body.classList.remove('cast-band-on');
      document.documentElement.style.setProperty('--cast-band-h', '0px');
    };
  }

  /* --- ventana emergente (toda la web, una vez por sesión) --- */
  if (enArticulo || visto()) return;

  setTimeout(function () {
    var ov = document.createElement('div');
    ov.className = 'cast-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', t.title);
    ov.innerHTML =
      '<div class="cast-modal">' +
        '<button class="x" type="button" aria-label="' + t.close + '">&#10005;</button>' +
        '<div class="pic"><img src="camino_sensorial_ninos.jpg" alt="' + t.title + '"></div>' +
        '<div class="body">' +
          '<p class="eyebrow">' + t.eyebrow + '</p>' +
          '<h3>' + t.title + '</h3>' +
          '<p>' + t.text + '</p>' +
          '<p class="meta">' + t.meta + '</p>' +
          '<div class="acts">' +
            '<a class="b1" href="' + t.art + '">' + t.more + '</a>' +
            '<a class="b2" href="' + t.cont + '">' + t.book + '</a>' +
            '<a class="b3" href="' + t.pdf + '" target="_blank" rel="noopener">' + t.rates + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('in'); });
    guardar();

    var cerrar = function () {
      ov.classList.remove('in');
      setTimeout(function () { ov.remove(); }, 450);
      removeEventListener('keydown', esc);
    };
    var esc = function (e) { if (e.key === 'Escape') cerrar(); };
    ov.querySelector('.x').onclick = cerrar;
    ov.onclick = function (e) { if (e.target === ov) cerrar(); };
    addEventListener('keydown', esc);
    ov.querySelector('.x').focus();
  }, 1400);
})();
