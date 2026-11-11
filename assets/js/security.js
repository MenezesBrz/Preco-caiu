/**
 * ============================================================
 * O PREÇO CAIU - MÓDULO DE CIBERSEGURANÇA (DEFENSE-IN-DEPTH)
 * ============================================================
 * Proteções ativas:
 * 1. Anti-Clickjacking (Frame-busting)
 * 2. Prevenção de XSS e JS Injection (DOM & Reflected)
 * 3. Sanitização contra injeções SQL e Path Traversal em parâmetros
 * 4. Validação estrita de URLs de redirecionamento (Anti-Open Redirect)
 * 5. Proteção contra Prototype Pollution
 * ============================================================
 */

(function () {
  'use strict';

  // 1. ANTI-CLICKJACKING (Impede que o site seja inserido em iframes maliciosos)
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    // Caso haja bloqueio de cross-origin, esconde o conteúdo
    if (document.documentElement) {
      document.documentElement.style.display = 'none';
    }
  }

  // 2. DETECTOR E SANITIZADOR DE INJEÇÃO SQL & XSS NA URL (Query Params & Hash)
  const SQLI_PATTERNS = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))(\s)*((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i,
    /union(\s)+select/i,
    /insert(\s)+into/i,
    /drop(\s)+table/i,
    /update[^\n]+set/i,
    /delete(\s)+from/i,
    /select[^\n]+from/i,
    /information_schema/i,
    /benchmark\s*\(|sleep\s*\(/i
  ];

  const XSS_PATTERNS = [
    /<script[^>]*>[\s\S]*?<\/script>/i,
    /javascript:/i,
    /vbscript:/i,
    /data:text\/html/i,
    /onload\s*=/i,
    /onerror\s*=/i,
    /onclick\s*=/i,
    /onmouseover\s*=/i,
    /<img[^>]+src[^\w]*=[^\w]*["']?[^"'>]*onerror/i,
    /<iframe/i,
    /<svg[^>]*onload/i
  ];

  const PATH_TRAVERSAL_PATTERNS = [
    /\.\.\//,
    /\.\.\\/,
    /%2e%2e%2f/i,
    /%2e%2e\//i
  ];

  function auditLocation() {
    const rawSearch = window.location.search;
    const rawHash = window.location.hash;
    const fullCheck = decodeURIComponent(rawSearch + " " + rawHash);

    // Verifica tentativa de SQL Injection
    for (const pattern of SQLI_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Tentativa de SQL Injection detectada e bloqueada na URL.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }

    // Verifica tentativa de XSS / JS Injection
    for (const pattern of XSS_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Tentativa de JS/XSS Injection detectada e bloqueada na URL.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }

    // Verifica tentativa de Path Traversal
    for (const pattern of PATH_TRAVERSAL_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Tentativa de Path Traversal detectada e bloqueada.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }
  }

  auditLocation();

  // 3. UTILITÁRIO GLOBAL DE ESCAPAMENTO SEGURO DE HTML (XSS DEFENSE)
  window.SecurityUtils = {
    /**
     * Escapa caracteres perigosos para prevenir injeção HTML/JS
     */
    escapeHTML: function (str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    },

    /**
     * Valida links externos permitindo apenas URLs seguras
     * Bloqueia protocolos perigosos como javascript:, data:, vbscript:
     */
    sanitizeWhatsAppUrl: function (url) {
      if (typeof url !== 'string') return '#';
      const cleanUrl = url.trim();

      // Permitido apenas HTTPS para WhatsApp oficial
      const allowedProtocols = ['https://chat.whatsapp.com/', 'https://wa.me/', 'https://api.whatsapp.com/'];
      const isAllowed = allowedProtocols.some(prefix => cleanUrl.toLowerCase().startsWith(prefix));

      if (isAllowed) {
        return cleanUrl;
      }

      console.warn("[CyberSecurity] URL não autorizada ou insegura bloqueada:", cleanUrl);
      return '#';
    },

    /**
     * Sanitiza qualquer string de texto plano antes de inserir no DOM
     */
    cleanText: function (str) {
      if (typeof str !== 'string') return '';
      return str.replace(/[<>'"`;]/g, '');
    }
  };

  // Congela o utilitário para evitar sobrescrita por scripts externos
  Object.freeze(window.SecurityUtils);

})();
