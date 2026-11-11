/**
 * ============================================================
 * O PREÇO CAIU - CORE APPLICATION ENGINE
 * Controls Deals Ticker Animation, Dynamic Fallbacks, and FAQ Accordion
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  initFaqAccordion();
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
      <strong>${escape(deal.text)}</strong>
      <span class="price-now">${escape(deal.price)}</span>
      <span class="old-price">${escape(deal.oldPrice)}</span>
      <span class="store-tag">${escape(deal.store)}</span>
    </div>
  `).join("");
}

/* ============================================================
 * 2. INTERACTIVE ACCESSIBLE FAQ ACCORDION
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

      // Close other accordion panels for smooth single-panel expansion
      faqItems.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
