(function () {
  'use strict';

  var STORAGE_KEY = 'site-lang';
  var DEFAULT_LANG = 'en';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* noop */ }
    document.documentElement.setAttribute('lang', lang);
    // Show elements matching the current language, hide others
    var allEn = document.querySelectorAll('[data-lang="en"]');
    var allEs = document.querySelectorAll('[data-lang="es"]');
    for (var i = 0; i < allEn.length; i++) {
      allEn[i].style.display = lang === 'en' ? '' : 'none';
    }
    for (var j = 0; j < allEs.length; j++) {
      allEs[j].style.display = lang === 'es' ? '' : 'none';
    }
    // Update toggle buttons
    var btns = document.querySelectorAll('.lang-btn');
    for (var k = 0; k < btns.length; k++) {
      btns[k].classList.toggle('active', btns[k].getAttribute('data-set-lang') === lang);
    }
  }

  // Initialise on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    setLang(getLang());

    // Bind click handlers on language buttons
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        e.preventDefault();
        setLang(this.getAttribute('data-set-lang'));
      });
    }
  });
})();
