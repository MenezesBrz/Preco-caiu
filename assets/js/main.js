/**
 * ============================================================
 * O PREÇO CAIU - JAVASCRIPT PRINCIPAL
 * Renderização dos 12 Grupos em Grid e Redirecionamento Direto
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  renderGroupGrid();
  initFaqAccordion();
});

/* ============================================================
   1. TICKER DE OFERTAS RECENTES (Sanitizado contra XSS)
   ============================================================ */
function initTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track || !window.SITE_CONFIG || !SITE_CONFIG.recentDealsTicker) return;

  const deals = SITE_CONFIG.recentDealsTicker;
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
   2. RENDERIZAÇÃO DOS 12 GRUPOS EM GRID (Cards com Botão Entrar)
   ============================================================ */
function renderGroupGrid() {
  const gridContainer = document.getElementById("groupGridContainer");
  if (!gridContainer || !window.SITE_CONFIG || !SITE_CONFIG.categories) return;

  const categories = SITE_CONFIG.categories;
  const escape = window.SecurityUtils ? window.SecurityUtils.escapeHTML : (s) => s;
  const sanitizeUrl = window.SecurityUtils ? window.SecurityUtils.sanitizeWhatsAppUrl : (u) => u;

  gridContainer.innerHTML = categories.map((cat, index) => {
    const safeUrl = sanitizeUrl(cat.whatsappUrl);

    return `
      <a class="cat-card js-cat-card" href="${safeUrl}" target="_blank" rel="noopener noreferrer" data-index="${index}" aria-label="Entrar no grupo ${escape(cat.name)} no WhatsApp">
        <!-- Ícone / Imagem Oficial da Categoria -->
        <div class="cat-thumb-box">
          <img class="cat-thumb" src="${escape(cat.image)}" alt="${escape(cat.name)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <span class="cat-fallback-emoji">${escape(cat.fallbackEmoji || '🏷️')}</span>
        </div>

        <!-- Textos: Título e Descrição -->
        <div class="cat-txt">
          <b>${escape(cat.name)}</b>
          <small>${escape(cat.description)}</small>
        </div>

        <!-- Botão Entrar WhatsApp -->
        <span class="btn-enter">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="16" height="16">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"></path>
          </svg>
          <span>Entrar</span>
        </span>
      </a>
    `;
  }).join("");
}

/* ============================================================
   3. ACCORDION DO FAQ (Acessível e Seguro)
   ============================================================ */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isActive = item.classList.contains("active");

      // Fecha os outros para animação limpa
      faqItems.forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
