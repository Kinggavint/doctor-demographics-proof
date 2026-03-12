/* Doctor Demographics — Main JavaScript */
(function () {
  "use strict";

  /* ---- Theme Toggle ---- */
  const themeToggles = document.querySelectorAll("[data-theme-toggle]");
  const root = document.documentElement;
  let currentTheme = "light"; // Default to light for this B2B site

  root.setAttribute("data-theme", currentTheme);

  function updateToggleIcons(theme) {
    const sunIcon =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
    const moonIcon =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    themeToggles.forEach(function (toggle) {
      toggle.innerHTML = theme === "dark" ? sunIcon : moonIcon;
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
      );
    });
  }

  themeToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", currentTheme);
      updateToggleIcons(currentTheme);
    });
  });

  updateToggleIcons(currentTheme);

  /* ---- Mobile Menu ---- */
  var mobileToggle = document.querySelector(".mobile-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  var mobileThemeToggle = document.querySelector(".theme-toggle--mobile");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", function () {
      var isOpen = mobileToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile menu on link click
    var mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Show mobile theme toggle at mobile breakpoint */
  function checkMobileToggle() {
    if (mobileThemeToggle) {
      mobileThemeToggle.style.display =
        window.innerWidth <= 768 ? "flex" : "none";
    }
  }
  checkMobileToggle();
  window.addEventListener("resize", checkMobileToggle);

  /* ---- Header Scroll Effects ---- */
  var header = document.getElementById("header");

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 50) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    },
    { passive: true }
  );

  /* ---- Scroll Reveal Animation ---- */
  var fadeElements = document.querySelectorAll(".fade-up");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href === "#") return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ---- Contact Form Handler ---- */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(function () {
        submitBtn.textContent = "Message Sent!";
        submitBtn.style.background = "var(--color-success)";
        contactForm.reset();

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }
})();
