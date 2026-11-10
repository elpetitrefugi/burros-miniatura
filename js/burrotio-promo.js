/* Can Ferrer · El Petit Refugi — Promoción BurroTió (Navidad 2026)
   Mismo funcionamiento que la de La Castanyera: ventana emergente una vez por sesión en toda la web
   y banda fija superior solo en las home. Se desactiva sola a partir del 20 de diciembre de 2026.
   Para retirarla: borrar este archivo y la línea <script src="js/burrotio-promo.js"></script> de las páginas.

   Por idioma, art (página del evento) y pdf (tarifas): con null ese botón no aparece. */
(function () {
  var FIN = new Date('2026-12-20T00:00:00');           // deja de mostrarse tras la última fecha (19 dic)
  var CLAVE = 'burrotio2026';                           // una vez por sesión de navegación
  var IMG = 'burrotio.jpg';
  if (new Date() > FIN) return;

  var T = {
    es: { eyebrow:'Navidad en El Petit Refugi', title:'Vive el Burro Tió de Navidad',
      text:'Una mañana o una tarde mágica con la Kitty, la Kika, la Pepa, la Nina, el Foc, el Leo y toda la burrada en miniatura: visita a los animales, el Camí Màgic guiados por los pequeños elfos, y cánticos y mimos al Burro Tió para que nos cague cosas bonitas.',
      meta:'6, 7, 8 y 19 de diciembre · 11:00 y 15:00 · 2 h · 28 € por niño, adultos gratis · Plazas limitadas',
      more:'Saber más', book:'Reservar', rates:'Ver tarifas', close:'Cerrar',
      banner:'Burro Tió de Navidad · 6, 7, 8 y 19 de diciembre · 28 € por niño',
      art:'burrotio.html', cont:'6_Contacto.html', pdf:'tarifas_burrotio_es.pdf' },
    ca: { eyebrow:'Nadal al Petit Refugi', title:'Viu el Burro Tió de Nadal',
      text:"Un matí o una tarda màgics amb la Kitty, la Kika, la Pepa, la Nina, el Foc, el Leo i tota la burrada en miniatura: visita als animals, el Camí Màgic de la mà dels petits elfs, i cançons i moixaines al Burro Tió perquè ens cagui coses boniques.",
      meta:'6, 7, 8 i 19 de desembre · 11:00 i 15:00 · 2 h · 28 € per infant, adults gratis · Places limitades',
      more:'Saber-ne més', book:'Reservar', rates:'Veure tarifes', close:'Tancar',
      banner:'Burro Tió de Nadal · 6, 7, 8 i 19 de desembre · 28 € per infant',
      art:'burrotio_cat.html', cont:'6_Contacto_cat.html', pdf:'tarifas_burrotio_cat.pdf' },
    en: { eyebrow:'Christmas at El Petit Refugi', title:'The Burro Tió Christmas experience',
      text:'A magical morning or afternoon with Kitty, Kika, Pepa, Nina, Foc, Leo and our whole miniature-donkey herd: meet the animals, follow the little elves along the Camí Màgic, and sing to the Burro Tió, our take on the Catalan Christmas log, so it brings lovely gifts for everyone.',
      meta:'6, 7, 8 & 19 December · 11:00 & 15:00 · 2 h · €28 per child, adults free · Limited places',
      more:'Find out more', book:'Book', rates:'View rates', close:'Close',
      banner:'Burro Tió Christmas · 6, 7, 8 & 19 December · €28 per child',
      art:'burrotio_en.html', cont:'6_Contacto_en.html', pdf:'tarifas_burrotio_en.pdf' },
    de: { eyebrow:'Weihnachten im Petit Refugi', title:'Erleben Sie den Burro Tió',
      text:'Ein zauberhafter Vor- oder Nachmittag mit Kitty, Kika, Pepa, Nina, Foc, Leo und unserer ganzen Miniatur-Eselherde: die Tiere kennenlernen, mit den kleinen Elfen den Camí Màgic entdecken und dem Burro Tió, unserer Version des katalanischen Weihnachtsklotzes, Lieder singen, damit er schöne Geschenke für alle bringt.',
      meta:'6., 7., 8. und 19. Dezember · 11:00 und 15:00 Uhr · 2 Std. · 28 € pro Kind, Erwachsene frei · Begrenzte Plätze',
      more:'Mehr erfahren', book:'Reservieren', rates:'Preise ansehen', close:'Schließen',
      banner:'Burro Tió · 6., 7., 8. und 19. Dez. · 28 € pro Kind',
      art:'burrotio_de.html', cont:'6_Contacto_de.html', pdf:'tarifas_burrotio_de.pdf' }
  };

  var lang = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
  var t = T[lang] || T.es;
  var file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var enArticulo = file.indexOf('burrotio') === 0;
  var enHome = /^(index\.html|1_home_(cat|en|de)\.html|)$/.test(file);

  var css = document.createElement('style');
  css.textContent = [
    '.tio-band{position:fixed;top:0;left:0;width:100%;z-index:1200;background:var(--forest,#0f2417);color:var(--cream,#faf8f2);',
      'font-family:var(--sans,sans-serif);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;font-weight:600;',
      'display:flex;align-items:center;justify-content:center;gap:1.2rem;padding:.7rem 3rem .7rem 1.2rem;text-align:center;line-height:1.35}',
    '.tio-band a{color:var(--gold-soft,#c9a96e);border-bottom:1px solid rgba(201,169,110,.5);padding-bottom:1px;white-space:nowrap}',
    '.tio-band button{position:absolute;right:.9rem;top:50%;transform:translateY(-50%);background:none;border:0;cursor:pointer;',
      'color:rgba(250,248,242,.6);font-size:1rem;line-height:1;padding:.3rem}',
    '.tio-band button:hover{color:var(--gold-soft,#c9a96e)}',
    'body.tio-band-on header{top:var(--tio-band-h,0px)}',
    '@media(max-width:640px){.tio-band{font-size:.62rem;letter-spacing:.1em;gap:.7rem;padding:.6rem 2.6rem .6rem 1rem;flex-direction:column}}',

    '.tio-ov{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;padding:1.2rem;',
      'background:rgba(11,24,15,.72);backdrop-filter:blur(6px);opacity:0;transition:opacity .45s ease}',
    '.tio-ov.in{opacity:1}',
    '.tio-modal{position:relative;width:min(880px,100%);max-height:92vh;overflow:auto;background:var(--cream,#faf8f2);',
      'border-radius:3px;display:grid;grid-template-columns:42% 58%;box-shadow:0 30px 80px rgba(0,0,0,.45);',
      'transform:translateY(22px) scale(.985);transition:transform .55s cubic-bezier(.16,1,.3,1)}',
    '.tio-ov.in .tio-modal{transform:none}',
    '.tio-modal .pic{position:relative;min-height:320px}',
    '.tio-modal .pic img{width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block}',
    '.tio-modal .body{padding:clamp(1.8rem,3.4vw,2.8rem)}',
    '.tio-modal .eyebrow{font-family:var(--sans,sans-serif);font-size:.66rem;letter-spacing:.34em;text-transform:uppercase;',
      'font-weight:600;color:var(--gold,#b1894f);margin-bottom:1rem}',
    '.tio-modal h3{font-family:var(--serif,Georgia,serif);font-weight:300;font-size:clamp(1.8rem,3.4vw,2.5rem);',
      'line-height:1.06;color:var(--ink,#16190f);margin-bottom:.9rem}',
    '.tio-modal p{font-family:var(--sans,sans-serif);font-weight:300;font-size:.95rem;line-height:1.6;color:var(--muted,#5b6450)}',
    '.tio-modal .meta{margin-top:1rem;font-size:.78rem;letter-spacing:.04em;color:var(--ink,#16190f);font-weight:500}',
    '.tio-modal .acts{margin-top:1.8rem;display:flex;flex-wrap:wrap;gap:.7rem;align-items:center}',
    '.tio-modal .b1{background:var(--gold,#b1894f);color:var(--cream,#faf8f2);padding:.9rem 1.7rem;border-radius:999px;',
      'font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;transition:.35s}',
    '.tio-modal .b1:hover{background:var(--forest,#0f2417)}',
    '.tio-modal .b2{border:1px solid var(--forest,#0f2417);color:var(--forest,#0f2417);padding:.9rem 1.7rem;border-radius:999px;',
      'font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;transition:.35s}',
    '.tio-modal .b2:hover{background:var(--forest,#0f2417);color:var(--cream,#faf8f2)}',
    '.tio-modal .b3{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--sage,#5f6f4d);',
      'border-bottom:1px solid rgba(95,111,77,.4);padding-bottom:2px}',
    '.tio-modal .b3:hover{color:var(--gold,#b1894f);border-color:var(--gold,#b1894f)}',
    '.tio-modal .x{position:absolute;top:.8rem;right:.9rem;z-index:3;background:rgba(250,248,242,.9);border:0;border-radius:999px;',
      'width:34px;height:34px;cursor:pointer;font-size:1.05rem;line-height:1;color:var(--ink,#16190f)}',
    '.tio-modal .x:hover{background:var(--gold,#b1894f);color:#fff}',
    '@media(max-width:720px){.tio-modal{grid-template-columns:1fr;max-height:88vh}.tio-modal .pic{min-height:180px;max-height:34vh}}'
  ].join('');
  document.head.appendChild(css);

  function guardar() { try { sessionStorage.setItem(CLAVE, '1'); } catch (e) {} }
  function visto() { try { return sessionStorage.getItem(CLAVE) === '1'; } catch (e) { return false; } }

  /* --- banda fija (solo home) --- */
  if (enHome) {
    var band = document.createElement('div');
    band.className = 'tio-band';
    band.innerHTML = '<span>' + t.banner + '</span>' +
      '<a href="' + (t.art || t.cont) + '">' + (t.art ? t.more : t.book) + '</a>' +
      '<button type="button" aria-label="' + t.close + '">&#10005;</button>';
    document.body.appendChild(band);
    document.body.classList.add('tio-band-on');
    var ajusta = function () {
      document.documentElement.style.setProperty('--tio-band-h', band.offsetHeight + 'px');
    };
    ajusta(); addEventListener('resize', ajusta);
    band.querySelector('button').onclick = function () {
      band.remove();
      document.body.classList.remove('tio-band-on');
      document.documentElement.style.setProperty('--tio-band-h', '0px');
    };
  }

  /* --- ventana emergente (toda la web, una vez por sesión) --- */
  if (enArticulo || visto()) return;

  setTimeout(function () {
    var ov = document.createElement('div');
    ov.className = 'tio-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', t.title);
    ov.innerHTML =
      '<div class="tio-modal">' +
        '<button class="x" type="button" aria-label="' + t.close + '">&#10005;</button>' +
        '<div class="pic"><img src="' + IMG + '" alt="' + t.title + '"></div>' +
        '<div class="body">' +
          '<p class="eyebrow">' + t.eyebrow + '</p>' +
          '<h3>' + t.title + '</h3>' +
          '<p>' + t.text + '</p>' +
          '<p class="meta">' + t.meta + '</p>' +
          '<div class="acts">' +
            (t.art ? '<a class="b1" href="' + t.art + '">' + t.more + '</a>' : '') +
            '<a class="' + (t.art ? 'b2' : 'b1') + '" href="' + t.cont + '">' + t.book + '</a>' +
            (t.pdf ? '<a class="b3" href="' + t.pdf + '" target="_blank" rel="noopener">' + t.rates + '</a>' : '') +
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
