// Overview page motion. The page reads fully without this script.
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AUTO_ADVANCE_MS = 6000;

  function startTopicMap() {
    var map = document.getElementById("topic-map");
    if (!map) return;
    var tabs = Array.prototype.slice.call(map.querySelectorAll(".node"));
    var panels = map.querySelector(".panels");
    var timer = null;
    panels.classList.add("is-live");

    function select(tab) {
      tabs.forEach(function (t) {
        var isActive = t === tab;
        t.setAttribute("aria-selected", String(isActive));
        t.tabIndex = isActive ? 0 : -1;
        document.getElementById("panel-" + t.dataset.topic).classList.toggle("is-active", isActive);
        map.querySelector('[data-line="' + t.dataset.topic + '"]').classList.toggle("is-active", isActive);
      });
    }
    function stopAuto() {
      clearInterval(timer);
      timer = null;
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { stopAuto(); select(tab); });
      tab.addEventListener("keydown", function (event) {
        var offset = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!offset) return;
        event.preventDefault();
        stopAuto();
        var next = tabs[(i + offset + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
    select(tabs[0]);

    if (!reducedMotion) {
      timer = setInterval(function () {
        var current = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
        select(tabs[(current + 1) % tabs.length]);
      }, AUTO_ADVANCE_MS);
      map.addEventListener("focusin", stopAuto);
      map.addEventListener("pointerenter", stopAuto);
    }
  }

  function startReveal() {
    if (reducedMotion || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  startTopicMap();
  startReveal();
})();
