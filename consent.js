// Cookie-banner + Google Consent Mode v2
(function () {
  var KEY = 'wp_cookie_consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var options = document.getElementById('cookie-options');
  var optStats = document.getElementById('cookie-opt-statistik');
  var optMarketing = document.getElementById('cookie-opt-marknadsforing');
  var btnCustomize = document.getElementById('cookie-customize');
  var btnSave = document.getElementById('cookie-save');

  function gtag() { window.dataLayer.push(arguments); }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; }
  }

  function apply(choice, method) {
    var state = {
      analytics_storage: choice.statistik ? 'granted' : 'denied',
      ad_storage: choice.marknadsforing ? 'granted' : 'denied',
      ad_user_data: choice.marknadsforing ? 'granted' : 'denied',
      ad_personalization: choice.marknadsforing ? 'granted' : 'denied'
    };
    gtag('consent', 'update', state);
    choice.timestamp = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) {}
    window.dataLayer.push({
      event: 'cookie_consent_update',
      consent_method: method,
      consent_statistik: state.analytics_storage,
      consent_marknadsforing: state.ad_storage
    });
    hide();
  }

  function show(expanded) {
    var c = read();
    optStats.checked = !!(c && c.statistik);
    optMarketing.checked = !!(c && c.marknadsforing);
    setExpanded(!!expanded);
    banner.hidden = false;
  }

  function hide() { banner.hidden = true; }

  function setExpanded(on) {
    options.hidden = !on;
    btnSave.hidden = !on;
    btnCustomize.hidden = on;
    btnCustomize.setAttribute('aria-expanded', on);
  }

  document.getElementById('cookie-accept-all').addEventListener('click', function () {
    apply({ statistik: true, marknadsforing: true }, 'accept_all');
  });
  document.getElementById('cookie-reject-all').addEventListener('click', function () {
    apply({ statistik: false, marknadsforing: false }, 'reject_all');
  });
  btnCustomize.addEventListener('click', function () { setExpanded(true); optStats.focus(); });
  btnSave.addEventListener('click', function () {
    apply({ statistik: optStats.checked, marknadsforing: optMarketing.checked }, 'custom');
  });

  var settings = document.getElementById('footer-cookie-settings');
  if (settings) settings.addEventListener('click', function () { show(true); });

  if (!read()) show(false);
})();
