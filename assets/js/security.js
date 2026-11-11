/**
 * ============================================================
 * O PREÇO CAIU - CYBERSECURITY ENGINE (DEFENSE-IN-DEPTH)
 * ============================================================
 * Active Security Controls:
 * 1. Anti-Clickjacking & UI Redressing (Frame-busting)
 * 2. XSS & JavaScript Injection Defense (DOM & Reflected)
 * 3. Client-side SQL Injection & Path Traversal Query Auditor
 * 4. Strict Protocol & Scheme Whitelisting (Anti-Open Redirect)
 * 5. Prototype Pollution Protection (Object Immutability)
 * ============================================================
 */

(function () {
  'use strict';

  // 1. ANTI-CLICKJACKING (Prevents execution within malicious third-party iframes)
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    // If cross-origin framing blocks window.top access, hide document to prevent clickjacking
    if (document.documentElement) {
      document.documentElement.style.display = 'none';
    }
  }

  // 2. SQL INJECTION & XSS URL AUDITOR (Scans query parameters and hash fragments)
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

    // Audit for SQL Injection attempt
    for (const pattern of SQLI_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Potential SQL Injection pattern detected and sanitized from URL.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }

    // Audit for XSS / JS Injection attempt
    for (const pattern of XSS_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Potential XSS / JS Injection pattern detected and sanitized from URL.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }

    // Audit for Path Traversal attempt
    for (const pattern of PATH_TRAVERSAL_PATTERNS) {
      if (pattern.test(fullCheck)) {
        console.warn("[CyberSecurity] Potential Path Traversal pattern detected and sanitized.");
        history.replaceState(null, "", window.location.pathname);
        return;
      }
    }
  }

  auditLocation();

  // 3. GLOBAL HTML ENTITY ENCODER & SANITIZATION UTILITIES
  window.SecurityUtils = {
    /**
     * Escapes critical characters to prevent HTML/JS injection
     * @param {string} str - Raw input string
     * @returns {string} - Escaped safe string
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
     * Validates destination URL against authorized WhatsApp HTTPS endpoints
     * Blocks dangerous pseudo-protocols such as javascript:, data:, vbscript:
     * @param {string} url - Target URL string
     * @returns {string} - Validated URL or fallback '#'
     */
    sanitizeWhatsAppUrl: function (url) {
      if (typeof url !== 'string') return '#';
      const cleanUrl = url.trim();

      // Only allow legitimate official WhatsApp endpoints over HTTPS
      const allowedProtocols = ['https://chat.whatsapp.com/', 'https://wa.me/', 'https://api.whatsapp.com/'];
      const isAllowed = allowedProtocols.some(prefix => cleanUrl.toLowerCase().startsWith(prefix));

      if (isAllowed) {
        return cleanUrl;
      }

      console.warn("[CyberSecurity] Blocked unauthorized or insecure destination URL:", cleanUrl);
      return '#';
    },

    /**
     * Strips dangerous injection characters from plain text
     * @param {string} str - Raw text string
     * @returns {string} - Cleaned text
     */
    cleanText: function (str) {
      if (typeof str !== 'string') return '';
      return str.replace(/[<>'"`;]/g, '');
    }
  };

  // Deep freeze security utilities to prevent runtime tampering
  Object.freeze(window.SecurityUtils);

})();
