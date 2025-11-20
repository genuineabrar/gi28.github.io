// Initialize AOS library for scroll animations
AOS.init({
    duration: 900,
    easing: 'ease-in-out',
    once: true,
});

// Initialize particles.js 3D background
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 900 } },
        color: { value: '#0D25AA' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#0077CC',
            opacity: 0.3,
            width: 1
        },
        move: { enable: true, speed: 4, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: {
            grab: { distance: 120, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});
document.getElementById('unlockBtn').onclick = function() {
    og_load();
};


  function addTilt(button){
      const wrap = button.parentElement; // tilt-wrap or direct parent
      const bounds = () => button.getBoundingClientRect();
      function onMove(e){
        const b = bounds();
        const x = (e.clientX - b.left) / b.width - 0.5;
        const y = (e.clientY - b.top) / b.height - 0.5;
        const rx = (-y) * 8; const ry = x * 8;
        button.style.transform = `translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      }
      function onLeave(){ button.style.transform = '' }
      button.addEventListener('pointermove', onMove);
      button.addEventListener('pointerleave', onLeave);
    }

    // Ripple effect for btn1
    function makeRipple(e){
      const btn = e.currentTarget;
      const r = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      r.style.position = 'absolute'; r.style.left = (e.clientX - rect.left - size/2) + 'px';
      r.style.top = (e.clientY - rect.top - size/2) + 'px';
      r.style.width = r.style.height = size + 'px'; r.style.borderRadius = '50%';
      r.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5), rgba(255,255,255,0.08))';
      r.style.transform = 'scale(0)'; r.style.opacity = '0.9'; r.style.pointerEvents = 'none'; r.style.transition = 'transform .6s ease, opacity .6s ease';
      btn.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = 'scale(1)'; r.style.opacity = '0'; });
      setTimeout(()=> r.remove(),700);
    }

    // Press bounce for btn2 and btn3
    function pressAnim(e){
      const b = e.currentTarget;
      b.animate([
        { transform: b.style.transform || 'translateY(0) scale(1)' },
        { transform: 'translateY(-4px) scale(0.98)' },
        { transform: b.style.transform || 'translateY(0) scale(1)' }
      ], { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1)' });
    }

    // Attach events
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    addTilt(btn1); addTilt(btn2); addTilt(btn3);
    btn1.addEventListener('pointerdown', makeRipple);
    btn2.addEventListener('pointerdown', pressAnim);
    btn3.addEventListener('pointerdown', pressAnim);

    // Make keyboard accessible
    [btn1,btn2,btn3].forEach(b=>{ b.setAttribute('tabindex',0); b.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); } }) });
    
    // FOOTER FLOATING PARTICLES
const footer = document.querySelector('.gi-footer');

for (let i = 0; i < 16; i++) {
  let p = document.createElement('div');
  p.className = 'ft-particle';

  p.style.left = Math.random() * 100 + '%';
  p.style.animation = `floatUp ${4 + Math.random() * 4}s linear infinite ${Math.random() * 3}s`;

  footer.appendChild(p);
}


