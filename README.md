# 📉 O Preço Caiu - Site de Ofertas & Grupos no WhatsApp

Landing page moderna, ultra rápida e altamente blindada contra ameaças cibernéticas para comunidades de ofertas e cupons no WhatsApp.

---

## 🔒 Arquitetura de Cibersegurança Implementada

Mesmo sem sistema de login, o site conta com múltiplas camadas de proteção ativa (*Defense-in-Depth*):

1. **Proteção Contra SQL Injection (SQLi)**:
   - Bloqueio no servidor via `.htaccess` (rejeita requisições com `UNION`, `SELECT`, `DROP`, `INSERT`, `--`, `INFORMATION_SCHEMA`).
   - Módulo cliente `security.js` que audita e limpa qualquer tentativa de injeção passada por parâmetros de URL (`?param=...`) ou fragmentos de hash (`#...`).
2. **Proteção Contra XSS e JS Injection (DOM & Reflected)**:
   - Sanitização completa com `SecurityUtils.escapeHTML()` antes de qualquer inserção dinâmica no DOM.
   - Validação estrita de URLs de destino (`SecurityUtils.sanitizeWhatsAppUrl()`), aceitando exclusivamente protocolos oficiais HTTPS do WhatsApp e bloqueando `javascript:`, `data:`, `vbscript:`.
   - `Content-Security-Policy (CSP)` estrito configurado tanto nas meta tags quanto nos cabeçalhos HTTP do servidor.
3. **Anti-Clickjacking & UI Redressing**:
   - `X-Frame-Options: DENY` e `frame-ancestors 'none'`.
   - Script de *Frame-Busting* nativo que impede que o site seja incorporado em `<iframe>` de sites de terceiros maliciosos.
4. **Proteção Contra Prototype Pollution**:
   - Os objetos centrais de configuração (`SITE_CONFIG`) são congelados com `Object.freeze()`, tornando impossível a sobrescrita de links por scripts de terceiros em runtime.
5. **Anti-MIME Sniffing & Anti-Referrer Leak**:
   - `X-Content-Type-Options: nosniff`.
   - `Referrer-Policy: strict-origin-when-cross-origin` com `rel="noopener noreferrer"` em todos os links externos.

---

## 📁 Estrutura do Projeto

```
o-preco-caiu/
│
├── index.html              # Página principal (Lista de grupos, sem barra de pesquisa)
├── .htaccess               # Regras de cibersegurança (Apache/LiteSpeed/cPanel)
├── vercel.json             # Cabeçalhos de segurança para Vercel
├── README.md               # Documentação completa
│
└── assets/
    ├── css/
    │   └── style.css       # Estilos da lista, logo oficial e responsividade
    ├── js/
    │   ├── security.js     # Módulo ativo de auditoria e segurança contra injeções
    │   ├── config.js       # Arquivo para configurar os links dos grupos do WhatsApp
    │   └── main.js         # Renderização da lista e redirecionamento direto
    └── img/
        ├── logo.png        # Logotipo oficial (amarelo, preto e vermelho)
        └── *.webp          # Imagens otimizadas das categorias
```

---

## ⚙️ Como Alterar os Links dos Grupos de WhatsApp

Para trocar os links dos grupos, você só precisa editar o arquivo:

👉 **`assets/js/config.js`**

Exemplo:
```javascript
{
  id: "smartphones",
  name: "Smartphone & iPhone",
  description: "Celulares com super desconto, lançamentos Apple e Samsung, cupons e frete grátis.",
  badge: "🔥 Super Ativo",
  badgeType: "hot",
  members: "2.480 membros",
  image: "assets/img/smartphone-e-iphone.webp",
  fallbackEmoji: "📱",
  whatsappUrl: "https://chat.whatsapp.com/SEU_LINK_AQUI"
}
```

Ao clicar no botão verde **"Entrar"** (ou em qualquer lugar da linha do grupo), o usuário é direcionado instantaneamente para o link do WhatsApp oficial em uma nova aba segura.
