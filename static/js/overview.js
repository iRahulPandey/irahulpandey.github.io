// Overview page motion. The page reads fully without this script.
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AUTO_ADVANCE_MS = 6000;

  function startRotator() {
    var el = document.getElementById("hero-rotator");
    if (!el || reducedMotion) return;
    var words = JSON.parse(el.dataset.words);
    var wordIndex = 0;
    var length = words[0].length;
    var deleting = true;
    el.classList.add("is-typing");

    function tick() {
      var word = words[wordIndex];
      length += deleting ? -1 : 1;
      el.textContent = word.slice(0, length);
      if (deleting && length === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 200);
      } else if (!deleting && length === word.length) {
        deleting = true;
        setTimeout(tick, 2000);
      } else {
        setTimeout(tick, deleting ? 35 : 70);
      }
    }
    setTimeout(tick, 2000);
  }

  function startGraph() {
    var canvas = document.getElementById("hero-graph");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var NODE_COUNT = 46;
    var LINK_DISTANCE = 130;
    var width = 0;
    var height = 0;
    var nodes = [];
    var frame = null;

    function resize() {
      var ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach(function (a, i) {
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var distance = Math.hypot(a.x * width - b.x * width, a.y * height - b.y * height);
          if (distance < LINK_DISTANCE) {
            ctx.strokeStyle = "rgba(130, 153, 189, " + 0.3 * (1 - distance / LINK_DISTANCE) + ")";
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }
      });
      nodes.forEach(function (n) {
        ctx.fillStyle = n.hot ? "#f6a41c" : "rgba(130, 153, 189, 0.7)";
        ctx.beginPath();
        ctx.arc(n.x * width, n.y * height, n.hot ? 3 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function step() {
      nodes = nodes.map(function (n) {
        var x = n.x + n.vx;
        var y = n.y + n.vy;
        return {
          x: x, y: y, hot: n.hot,
          vx: x < 0 || x > 1 ? -n.vx : n.vx,
          vy: y < 0 || y > 1 ? -n.vy : n.vy
        };
      });
      draw();
      frame = requestAnimationFrame(step);
    }

    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006, vy: (Math.random() - 0.5) * 0.0009,
        hot: i % 9 === 0
      });
    }
    resize();
    window.addEventListener("resize", function () { resize(); draw(); });
    draw();
    if (reducedMotion) return;

    // Only animate while the hero is on screen.
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        if (frame === null) frame = requestAnimationFrame(step);
      } else if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    }).observe(canvas);
  }

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

  startRotator();
  startGraph();
  startTopicMap();
  startReveal();
})();
