/* Sivakasi Crackers — lightweight product-card fireworks animations
   Add this script after app.js in index.html. No product data or cart changes required. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palettes = {
    aerial: ['#ffd166', '#ff5d8f', '#65d6ff', '#fff2b2'],
    burst: ['#ffcf56', '#ff6b6b', '#ff8c42', '#fff4c2'],
    fountain: ['#ffd166', '#ff9f1c', '#f8f7ff', '#ff6ec7'],
    spinner: ['#7ce7ff', '#ffd166', '#ff6ec7', '#ffffff'],
    rocket: ['#ffcf56', '#ff754a', '#79e5ff', '#ffffff'],
    sparkler: ['#fff0a6', '#ffd166', '#ff9d42', '#ffffff']
  };

  function getType(card) {
    const text = (
      (card.querySelector('.product-cat')?.textContent || '') + ' ' +
      (card.querySelector('.product-name')?.textContent || '') + ' ' +
      (card.querySelector('.placeholder-text')?.textContent || '')
    ).toLowerCase();

    if (/chakkar|spinner|wheel|chakra/.test(text)) return 'spinner';
    if (/rocket|sky rider|skyrider|skyshot/.test(text)) return 'rocket';
    if (/flower pot|fountain|peacock|colour koti|color koti/.test(text)) return 'fountain';
    if (/sparkler|wire|pencil|twinkling/.test(text)) return 'sparkler';
    if (/sound|bomb|blaster/.test(text)) return 'burst';
    return 'aerial';
  }

  function injectStyles() {
    if (document.getElementById('sivakasi-fireworks-styles')) return;
    const style = document.createElement('style');
    style.id = 'sivakasi-fireworks-styles';
    style.textContent = `
      .product-img-placeholder.sivakasi-fireworks-preview {
        isolation:isolate; position:relative; overflow:hidden;
        background:radial-gradient(ellipse at 50% 100%,rgba(116,35,158,.34),transparent 55%),
                   linear-gradient(180deg,#090b1c 0%,#160b29 55%,#030308 100%);
        border-color:rgba(212,175,55,.5);
      }
      .sivakasi-fireworks-preview .sivakasi-fireworks-canvas {
        position:absolute; inset:0; width:100%; height:100%; z-index:0; pointer-events:none;
      }
      .sivakasi-fireworks-preview .placeholder-icon,
      .sivakasi-fireworks-preview .placeholder-text {
        position:relative; z-index:1; text-shadow:0 2px 8px #000,0 0 12px rgba(0,0,0,.9);
      }
      .sivakasi-fireworks-preview .placeholder-icon {
        filter:drop-shadow(0 0 7px rgba(255,194,68,.9));
      }
      .sivakasi-fireworks-preview .placeholder-text {
        background:rgba(0,0,0,.38); border-radius:5px; padding:2px 5px;
      }
      .sivakasi-animation-badge {
        position:absolute; z-index:2; right:5px; top:6px; padding:2px 5px;
        border:1px solid rgba(255,211,99,.55); border-radius:10px;
        background:rgba(0,0,0,.62); color:#ffe5a0; font-size:8px;
        font-weight:800; letter-spacing:.5px; pointer-events:none;
      }
      @media(prefers-reduced-motion:reduce) {
        .sivakasi-animation-badge { opacity:.8; }
      }`;
    document.head.appendChild(style);
  }

  function animate(canvas, type) {
    if (canvas.dataset.running === '1') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.dataset.running = '1';

    const colors = palettes[type] || palettes.aerial;
    let w = 1, h = 1, frame = 0, particles = [], rockets = [], raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width); h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    function burst(x, y, count, speed) {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2, v = speed * (.35 + Math.random() * .8);
        particles.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          life: 26 + Math.random() * 26, max: 52,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: .7 + Math.random() * 1.5
        });
      }
    }

    function draw() {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(w*.5, h*.62, 1, w*.5, h*.62, h*.8);
      glow.addColorStop(0, 'rgba(67,35,112,.22)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

      if (type === 'fountain') {
        if (frame % 2 === 0) particles.push({
          x: w*(.35+Math.random()*.3), y:h*.9,
          vx:(Math.random()-.5)*1.8, vy:-1.4-Math.random()*2.5,
          life:22+Math.random()*20, max:42,
          color:colors[Math.floor(Math.random()*colors.length)], size:.7+Math.random()*1.5
        });
      } else if (type === 'spinner') {
        const cx=w*.5, cy=h*.55, r=Math.min(w,h)*.23;
        for (let i=0;i<3;i++) {
          const a=frame*.11+i*Math.PI*2/3, x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r*.65;
          ctx.beginPath(); ctx.arc(x,y,1.5+(i%2),0,Math.PI*2);
          ctx.fillStyle=colors[i%colors.length]; ctx.shadowBlur=9; ctx.shadowColor=ctx.fillStyle; ctx.fill(); ctx.shadowBlur=0;
          if (Math.random()>.4) particles.push({x,y,vx:(Math.random()-.5)*1.2,vy:(Math.random()-.5)*1.2,life:12,max:12,color:colors[i%colors.length],size:1});
        }
      } else if (type === 'rocket') {
        if (frame % 72 === 1) rockets.push({x:w*(.25+Math.random()*.5),y:h*.9,vy:-2.6-Math.random(),life:0});
        rockets = rockets.filter(r => r.life < 40);
        rockets.forEach(r => {
          r.y += r.vy; r.life++;
          particles.push({x:r.x+(Math.random()-.5)*4,y:r.y+8,vx:(Math.random()-.5)*.7,vy:Math.random()*1.1,life:12,max:12,color:colors[Math.floor(Math.random()*colors.length)],size:1});
          if (r.life === 27) burst(r.x,r.y,32,1.8);
        });
      } else if (type === 'sparkler') {
        for (let i=0;i<4;i++) particles.push({x:w*.5+(Math.random()-.5)*9,y:h*.52+(Math.random()-.5)*9,vx:(Math.random()-.5)*2.2,vy:(Math.random()-.5)*2.2,life:8+Math.random()*12,max:20,color:colors[Math.floor(Math.random()*colors.length)],size:.7+Math.random()*1.4});
      } else if (frame % (type === 'burst' ? 42 : 52) === 1) {
        burst(w*(.22+Math.random()*.56), h*(.22+Math.random()*.4), type==='burst'?24:34, 1.5+Math.random()*1.2);
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += type==='fountain' ? .035 : .018;
        p.vx *= .985; p.life--;
        ctx.globalAlpha = Math.min(1,p.life/12)*Math.min(1,p.life/p.max*1.6);
        ctx.fillStyle=p.color; ctx.shadowBlur=7; ctx.shadowColor=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
      });
      ctx.globalAlpha=1; ctx.shadowBlur=0;
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    }

    if (reducedMotion) {
      burst(w*.3,h*.38,18,1.5); burst(w*.7,h*.34,18,1.5);
      draw();
    } else draw();

    canvas._stopSivakasi = () => {
      if (raf) cancelAnimationFrame(raf);
      canvas.dataset.running = '0';
    };
    canvas._resizeSivakasi = resize;
  }

  function stop(canvas) {
    if (canvas._stopSivakasi) canvas._stopSivakasi();
  }

  function prepareCard(card) {
    const placeholder = card.querySelector('.product-img-placeholder');
    if (!placeholder || placeholder.dataset.sivakasiAnimated === '1') return;
    placeholder.dataset.sivakasiAnimated = '1';
    placeholder.classList.add('sivakasi-fireworks-preview');

    const canvas = document.createElement('canvas');
    canvas.className = 'sivakasi-fireworks-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    placeholder.prepend(canvas);

    if (!placeholder.querySelector('.sivakasi-animation-badge')) {
      const badge = document.createElement('span');
      badge.className = 'sivakasi-animation-badge';
      badge.textContent = 'LIVE EFFECT PREVIEW';
      placeholder.appendChild(badge);
    }
    canvas.dataset.fireworkType = getType(card);
    observeCanvas(canvas);
  }

  let observer;
  function observeCanvas(canvas) {
    if (!('IntersectionObserver' in window)) { animate(canvas, canvas.dataset.fireworkType); return; }
    if (!observer) observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) animate(entry.target, entry.target.dataset.fireworkType);
        else stop(entry.target);
      });
    }, { rootMargin: '100px' });
    observer.observe(canvas);
  }

  function scan() {
    injectStyles();
    document.querySelectorAll('#products .product-card').forEach(prepareCard);
  }

  const boot = () => {
    scan();
    const grid = document.getElementById('products');
    if (grid && 'MutationObserver' in window) {
      new MutationObserver(() => scan()).observe(grid, { childList: true, subtree: true });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('resize', () => {
    document.querySelectorAll('.sivakasi-fireworks-canvas').forEach(c => {
      if (c._resizeSivakasi) c._resizeSivakasi();
    });
  });
})();