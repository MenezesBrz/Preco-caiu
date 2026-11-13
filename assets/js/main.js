/**
 * ============================================================
 * O PREÇO CAIU - CORE APPLICATION ENGINE
 * Controls Deals Ticker, Category Filtering, FAQ Accordion, and Mobile Quick Jump
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  initCategoryFilters();
  initFaqAccordion();
  initFloatingButton();
});

/* ============================================================
 * 1. REAL-TIME DEALS TICKER STREAM
 * Sanitizes and mounts a continuous loop marquee of price drops
 * ============================================================ */
function initTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track || !window.SITE_CONFIG || !SITE_CONFIG.recentDealsTicker) return;

  const deals = SITE_CONFIG.recentDealsTicker;
  // Duplicate array elements to ensure seamless CSS translateX looping
  const fullList = [...deals, ...deals];

  const escape = window.SecurityUtils ? window.SecurityUtils.escapeHTML : (s) => s;

  track.innerHTML = fullList.map(deal => `
    <div class="ticker-item">
      <span class="drop-badge">${escape(deal.drop)}</span>
      <strong class="item-name">${escape(deal.text)}</strong>
      <span class="price-now">${escape(deal.price)}</span>
      <span class="old-price">${escape(deal.oldPrice)}</span>
      <span class="store-tag">${escape(deal.store)}</span>
    </div>
  `).join("");
}

/* ============================================================
 * 2. CATEGORY TAB FILTERING
 * Allows instant, animated filtering across the 12 WhatsApp group items
 * ============================================================ */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const groupItems = document.querySelectorAll(".group-item");

  if (!filterBtns.length || !groupItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      // Update active tab states
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // Filter group cards with smooth transitions
      groupItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (selectedFilter === "all" || itemCategory === selectedFilter) {
          item.classList.remove("filtered-out");
          item.style.display = "flex";
        } else {
          item.classList.add("filtered-out");
          item.style.display = "none";
        }
      });
    });
  });
}

/* ============================================================
 * 3. INTERACTIVE ACCESSIBLE FAQ ACCORDION
 * Handles smooth expand/collapse behavior with single-active state
 * ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isActive = item.classList.contains("active");

      // Close other accordion panels for clean single-panel expansion
      faqItems.forEach(i => {
        i.classList.remove("active");
        const b = i.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ============================================================
 * 4. MOBILE FLOATING QUICK-ACTION BUTTON
 * Provides a frictionless thumb-accessible jump back to the WhatsApp list
 * ============================================================ */
function initFloatingButton() {
  const floatBtn = document.getElementById("mobileFloatBtn");
  if (!floatBtn) return;

  let isTicking = false;
  window.addEventListener("scroll", () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        // Display floating action button after user scrolls past 320px
        if (window.scrollY > 320) {
          floatBtn.classList.add("visible");
        } else {
          floatBtn.classList.remove("visible");
        }
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}
