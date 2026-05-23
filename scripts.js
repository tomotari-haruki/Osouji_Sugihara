(function () {
  const track = (eventName, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }

    if (Array.isArray(window._uxa)) {
      window._uxa.push(["trackPageEvent", eventName]);
    }
  };

  const experimentVariant = new URLSearchParams(window.location.search).get("variant") || "trust";
  document.documentElement.dataset.variant = experimentVariant;
  track("experiment_view", { experiment: "hero_cta", variant: experimentVariant });

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("is-nav-open", !isOpen);
      track("menu_toggle", { open: !isOpen });
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("is-nav-open");
      }
    });
  }

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      track("cta_click", { id: element.dataset.track });
    });
  });

  const searchForm = document.querySelector("[data-site-search]");
  const searchInput = document.querySelector("#site-search-input");
  const searchableItems = Array.from(document.querySelectorAll("[data-keywords]"));

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        searchInput.focus();
        return;
      }

      const target = searchableItems.find((item) => {
        const text = `${item.textContent} ${item.dataset.keywords}`.toLowerCase();
        return text.includes(query);
      });

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.classList.remove("is-highlighted");
        window.setTimeout(() => target.classList.add("is-highlighted"), 50);
        track("site_search_success", { query });
      } else {
        track("site_search_no_result", { query });
        searchInput.setCustomValidity("該当する項目が見つかりませんでした。");
        searchInput.reportValidity();
        window.setTimeout(() => searchInput.setCustomValidity(""), 1200);
      }
    });
  }

  document.querySelectorAll("[data-accordion] details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) {
        return;
      }

      document.querySelectorAll("[data-accordion] details").forEach((other) => {
        if (other !== details) {
          other.open = false;
        }
      });

      track("faq_open", { question: details.querySelector("summary").textContent.trim() });
    });
  });

  const contactForm = document.querySelector("[data-contact-form]");
  const formMessage = document.querySelector("[data-form-message]");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formMessage.classList.remove("is-error");

      if (!contactForm.checkValidity()) {
        formMessage.textContent = "必須項目を確認してください。";
        formMessage.classList.add("is-error");
        contactForm.reportValidity();
        track("form_validation_error");
        return;
      }

      const formData = new FormData(contactForm);
      track("lead_form_complete", {
        service: formData.get("service") || "未選択",
        page_score: formData.get("page-score") || "未回答"
      });

      formMessage.textContent = "送信ありがとうございます。内容を確認し、折り返しご連絡します。";
      contactForm.reset();
    });
  }
})();
