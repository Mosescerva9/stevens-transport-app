/* Mobi Estimates — site interactions
   Lightweight, dependency-free, accessible, reduced-motion aware. */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initFaq();
    initForms();
    initDropzones();
    initYear();
  });

  /* Header shadow/solid on scroll */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile drawer */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector(".mobile-drawer");
    if (!toggle || !drawer) return;
    var scrim = drawer.querySelector(".scrim");
    var open = function () {
      drawer.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      drawer.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", open);
    if (scrim) scrim.addEventListener("click", close);
    drawer.querySelectorAll(".m-link").forEach(function (l) {
      l.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* Scroll reveal via IntersectionObserver */
  function initReveal() {
    var els = document.querySelectorAll(".reveal, .reveal-left, .reveal-scale");
    if (!els.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute("data-delay");
          if (delay) el.style.transitionDelay = delay + "ms";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* FAQ accordion */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        if (isOpen) {
          a.style.maxHeight = null;
          item.classList.remove("open");
          q.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* Form validation + simulated submit (static demo) */
  function initForms() {
    document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll("[required]").forEach(function (input) {
          var field = input.closest(".field");
          var ok = input.value && input.value.trim() !== "";
          if (input.type === "email") ok = ok && /.+@.+\..+/.test(input.value);
          if (field) field.classList.toggle("field-error", !ok);
          if (!ok && valid) { input.focus(); }
          if (!ok) valid = false;
        });
        if (!valid) return;
        var btn = form.querySelector("button[type=submit]");
        if (btn) { btn.disabled = true; btn.dataset.label = btn.innerHTML; btn.innerHTML = "Sending…"; }
        setTimeout(function () {
          var success = form.parentElement.querySelector(".form-success");
          if (success) {
            form.style.display = "none";
            success.classList.add("show");
            success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
          }
          if (btn) { btn.disabled = false; btn.innerHTML = btn.dataset.label; }
        }, 900);
      });
      form.querySelectorAll("[required]").forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field && input.value.trim()) field.classList.remove("field-error");
        });
      });
    });
  }

  /* File dropzone (visual only for static demo) */
  function initDropzones() {
    document.querySelectorAll(".dropzone").forEach(function (zone) {
      var input = zone.querySelector("input[type=file]");
      var label = zone.querySelector(".dz-label");
      if (input) {
        zone.addEventListener("click", function () { input.click(); });
        input.addEventListener("change", function () {
          if (input.files.length && label) {
            label.textContent = input.files.length === 1
              ? input.files[0].name
              : input.files.length + " files selected";
          }
        });
      }
      ["dragover", "dragenter"].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("drag"); });
      });
      ["dragleave", "drop"].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove("drag"); });
      });
      zone.addEventListener("drop", function (e) {
        if (input && e.dataTransfer && e.dataTransfer.files.length && label) {
          input.files = e.dataTransfer.files;
          label.textContent = e.dataTransfer.files.length + " file(s) ready";
        }
      });
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }
})();
