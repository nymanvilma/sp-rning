// Waypoint Group – navigation + tracking events (dataLayer)
window.dataLayer = window.dataLayer || [];

(function () {
  // Mobilmeny
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Klick på element med data-track -> dataLayer-event
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    window.dataLayer.push({
      event: el.getAttribute('data-track'),
      element_id: el.id || null,
      element_text: (el.innerText || el.getAttribute('aria-label') || '').trim(),
      link_url: el.href || null,
      page_path: location.pathname
    });
  });

  // Formulär: start (första interaktion) + submit
  document.querySelectorAll('form[data-track-form]').forEach(function (form) {
    var started = false;
    form.addEventListener('focusin', function () {
      if (started) return;
      started = true;
      window.dataLayer.push({ event: 'form_start', form_id: form.id, form_name: form.getAttribute('data-track-form') });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var service = form.querySelector('[name="tjanst"]');
      window.dataLayer.push({
        event: 'form_submit',
        form_id: form.id,
        form_name: form.getAttribute('data-track-form'),
        form_service: service ? service.value : null,
        page_path: location.pathname
      });
      var msg = form.querySelector('.form-msg');
      if (msg) msg.classList.add('show');
      form.reset();
      started = false;
    });
  });
})();
