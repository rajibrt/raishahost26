/* RaishaHost theme: small progressive enhancements. Pages work fully without this file. */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header turns solid once the page scrolls (homepage starts see-through over the hero).
  var header = document.querySelector('.rh-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('solid', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Light / dark mode. Light is the default; the choice is kept in this browser only.
  var toggle = document.querySelector('[data-rh-mode-toggle]');
  var meta = document.querySelector('meta[name="theme-color"]');
  var sync = function () {
    var dark = doc.getAttribute('data-theme') === 'dark';
    if (toggle) toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.setAttribute('content', dark ? '#08121d' : '#ffffff');
  };
  sync();
  if (toggle) toggle.addEventListener('click', function (e) {
    if (e.detail > 0) toggle.blur(); // mouse/touch click: drop focus so no ring stays behind
    var dark = doc.getAttribute('data-theme') !== 'dark';
    if (dark) doc.setAttribute('data-theme', 'dark'); else doc.removeAttribute('data-theme');
    try { localStorage.setItem('rh-theme', dark ? 'dark' : 'light'); } catch { /* storage blocked: the mode still changes for this page */ }
    sync();
  });

  // Phone/tablet menu: a drawer that slides in from the left and back out.
  var drawer = document.getElementById('mainNavbar');
  var burger = document.querySelector('[data-rh-drawer]');
  var wide = window.matchMedia('(min-width: 1200px)');
  var setDrawer = function (open) {
    if (!drawer || !burger) return;
    doc.classList.toggle('rh-drawer-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      var first = drawer.querySelector('.rh-dr-close');
      if (first) setTimeout(function () { first.focus(); }, 50);
    } else if (drawer.contains(document.activeElement)) {
      burger.focus();
    }
  };
  if (burger) burger.addEventListener('click', function () { setDrawer(!doc.classList.contains('rh-drawer-open')); });
  document.querySelectorAll('[data-rh-drawer-close]').forEach(function (el) {
    el.addEventListener('click', function () { setDrawer(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && doc.classList.contains('rh-drawer-open')) setDrawer(false); });
  var onWide = function () { if (wide.matches) setDrawer(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);

  // Desktop: header dropdowns (menu, currency, account) open on mouse over and close shortly after
  // the mouse leaves. Click and keyboard still work; touch screens keep tap-to-open.
  var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
  var hoverMode = function () { return wide.matches && hoverable.matches; };
  if (window.jQuery) {
    var $ = window.jQuery;
    $('#header .dropdown').each(function () {
      var dd = $(this);
      var toggleEl = dd.children('[data-toggle="dropdown"]');
      var timer;
      if (!toggleEl.length) return;
      dd.on('mouseenter', function () {
        if (!hoverMode()) return;
        clearTimeout(timer);
        if (!dd.hasClass('show')) {
          toggleEl.dropdown('toggle');
          toggleEl[0].blur(); // Bootstrap focuses the toggle; no focus ring for a mouse user
        }
      });
      dd.on('mouseleave', function () {
        if (!hoverMode()) return;
        timer = setTimeout(function () { if (dd.hasClass('show')) toggleEl.dropdown('toggle'); }, 200);
      });
      // a click on a menu that the mouse already opened should not close it again
      toggleEl.on('click', function (e) {
        if (hoverMode() && dd.hasClass('show')) { e.preventDefault(); e.stopPropagation(); }
      });
    });
  }

  // One highlight per header dropdown that glides to the item under the mouse (like raishahost.com).
  document.querySelectorAll('#header .rh-nav .dropdown-menu').forEach(function (menu) {
    var hl = document.createElement('span');
    hl.className = 'rh-hl';
    hl.setAttribute('aria-hidden', 'true');
    menu.insertBefore(hl, menu.firstChild);
    var moveTo = function (item) {
      if (!hoverMode()) return;
      var r = item.getBoundingClientRect();
      var m = menu.getBoundingClientRect();
      var y = r.top - m.top - menu.clientTop;
      if (!menu.classList.contains('hl-on')) {
        // first item: appear in place instead of sliding in from the top
        hl.style.transition = 'none';
        hl.style.transform = 'translateY(' + y + 'px)';
        hl.style.height = r.height + 'px';
        void hl.offsetHeight;
        hl.style.transition = '';
      }
      hl.style.transform = 'translateY(' + y + 'px)';
      hl.style.height = r.height + 'px';
      menu.classList.add('hl-on');
    };
    menu.querySelectorAll('a.dropdown-item').forEach(function (a) {
      a.addEventListener('mouseenter', function () { moveTo(a); });
    });
    menu.addEventListener('mouseleave', function () { menu.classList.remove('hl-on'); });
  });

  // Domain search: the Transfer button sends the same name to the transfer page.
  var form = document.querySelector('.rh-search');
  if (form) {
    var mode = form.querySelector('[data-rh-mode]');
    var transfer = form.querySelector('[data-rh-transfer]');
    var input = form.querySelector('input[name="query"]');
    if (transfer && mode) transfer.addEventListener('click', function () { mode.value = 'transfer'; });
    form.addEventListener('submit', function () {
      // Accept "https://www.name.com/" as well as "name.com".
      if (input) input.value = input.value.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '');
    });
  }

  // Scroll reveals: elements with .rv and the children of [data-stagger].
  if (reduce || !('IntersectionObserver' in window)) return;
  var items = document.querySelectorAll('.rv, [data-stagger]');
  if (!items.length) return;
  doc.classList.add('rh-js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
  // Printing shows everything.
  window.addEventListener('beforeprint', function () { items.forEach(function (el) { el.classList.add('is-in'); }); });
})();
