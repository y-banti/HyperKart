/* ============================================================
   HYPEKART — main.js
   Handles: rendering, cart, search, filters, mobile menu,
            scroll reveal, skeletons, toasts, policy modals
   ============================================================ */

'use strict';

// ─── UTILS ────────────────────────────────────────────────────
const fmt = n => '₹' + Number(n).toLocaleString('en-IN');

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.4;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
}

function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

const isDetailPage = () => qs('#product-detail-root') !== null;
const isIndexPage = () => !isDetailPage();

// ─── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = 'success', duration = 3000) {
  const container = qs('#toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '!'}</span>${msg}`;
  container.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, duration);
}

// ─── CART ─────────────────────────────────────────────────────
const CART_KEY = 'hypekart_cart';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx > -1) { cart[idx].qty++; } else {
    cart.push({ id: productId, name: product.name, price: product.price, image: product.images[0], qty: 1 });
  }
  saveCart(cart);
  updateCartUI();
  showToast(`<strong>${product.name}</strong> added to cart!`);
}

function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
  updateCartUI();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx < 0) return;
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart(cart);
  updateCartUI();
}

function clearCart() {
  saveCart([]);
  updateCartUI();
}

function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}

function updateCartUI() {
  const cart = getCart();
  const badge = qs('#cart-badge');
  const count = cartCount();
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
  renderCartDrawer();
}

function renderCartDrawer() {
  const itemsEl = qs('#cart-items');
  const footerEl = qs('#cart-footer');
  const totalEl = qs('#cart-total');
  if (!itemsEl) return;
  const cart = getCart();
  if (cart.length === 0) {
    itemsEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <p>Your cart is empty.</p>
            <p style="margin-top:6px;font-size:13px;">Discover products below!</p>
          </div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy"
             onerror="this.src='https://placehold.co/72x72/ede9e2/888?text=+'">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${fmt(item.price)}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">🗑</button>
      </div>`).join('');
  if (totalEl) totalEl.textContent = fmt(cartTotal());
  if (footerEl) footerEl.style.display = 'block';
}

function initCart() {
  updateCartUI();
  // Delegated events on cart drawer
  document.addEventListener('click', e => {
    if (e.target.matches('.qty-btn')) {
      const id = e.target.dataset.id;
      updateQty(id, e.target.dataset.action === 'inc' ? 1 : -1);
    }
    if (e.target.matches('.cart-item-remove')) removeFromCart(e.target.dataset.id);
  });
  qs('#cart-btn')?.addEventListener('click', openCart);
  qs('#mobile-cart-btn')?.addEventListener('click', () => { closeMobileMenu(); openCart(); });
  qs('#cart-close')?.addEventListener('click', closeCart);
  qs('#cart-backdrop')?.addEventListener('click', closeCart);
  qs('#clear-cart-btn')?.addEventListener('click', () => { clearCart(); showToast('Cart cleared', 'error'); });
}

function openCart() { qs('#cart-drawer')?.classList.add('open'); qs('#cart-backdrop')?.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { qs('#cart-drawer')?.classList.remove('open'); qs('#cart-backdrop')?.classList.remove('open'); document.body.style.overflow = ''; }

// ─── MOBILE MENU ──────────────────────────────────────────────
function initMobileMenu() {
  const btn = qs('#hamburger');
  const menu = qs('#mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Use event delegation so dynamically-added links also close menu
  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') closeMobileMenu();
  });
}
function closeMobileMenu() {
  qs('#mobile-menu')?.classList.remove('open');
  qs('#hamburger')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── SEARCH ───────────────────────────────────────────────────
function initSearch() {
  const overlay = qs('#search-overlay');
  const input = qs('#search-input');
  const resultsEl = qs('#search-results');

  function open() { overlay?.classList.add('open'); input?.focus(); document.body.style.overflow = 'hidden'; }
  function close() { overlay?.classList.remove('open'); input && (input.value = ''); if (resultsEl) resultsEl.innerHTML = '<p class="search-hint">Start typing to discover products…</p>'; document.body.style.overflow = ''; }

  qs('#search-btn')?.addEventListener('click', open);
  qs('#mobile-search-btn')?.addEventListener('click', () => { closeMobileMenu(); open(); });
  qs('#search-close')?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  let timer;
  input?.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => doSearch(input.value.trim(), resultsEl), 200);
  });
}

function doSearch(query, container) {
  if (!query) { container.innerHTML = '<p class="search-hint">Start typing to discover products…</p>'; return; }
  const q = query.toLowerCase();
  const res = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
    p.description.toLowerCase().includes(q)
  );
  if (!res.length) {
    container.innerHTML = `<div class="no-results"><h3>No results for "${query}"</h3><p>Try a different keyword or browse by category.</p></div>`;
    return;
  }
  container.innerHTML = `
      <p style="margin-bottom:20px;color:var(--text-secondary);font-size:14px;">${res.length} result${res.length > 1 ? 's' : ''} for "<strong>${query}</strong>"</p>
      <div class="search-results-grid">${res.map(renderProductCard).join('')}</div>`;
  attachCardEvents(container);
}

// ─── PRODUCT CARD COMPONENT ───────────────────────────────────
function renderProductCard(p) {
  // Every product is now an affiliate product
  return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-image-wrap">
          <a href="product-detail.html?id=${p.id}">
            <img src="${p.images[0]}" alt="${p.name}" loading="lazy"
                 onerror="this.src='https://placehold.co/400x400/ede9e2/888?text=${encodeURIComponent(p.name)}'">
          </a>
          ${p.isTrending ? '<span class="badge badge-trending">🔥 Trending</span>' : ''}
          <span class="badge badge-affiliate" style="top:auto;bottom:12px">Affiliate</span>
        </div>
        <div class="product-info">
          <h3 class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-rating">
            <span class="stars" title="${p.rating} out of 5">${stars(p.rating)}</span>
            <span class="rating-count">(${p.reviewCount})</span>
          </div>
          <p class="product-price">${fmt(p.price)}</p>
          <p class="product-desc-short">${p.description}</p>
          <div class="product-actions">
            <a href="product-detail.html?id=${p.id}" class="btn-view">View Details</a>
            <a href="${p.shopifyLink}" target="_blank" rel="noopener noreferrer" class="btn-buy-card">
              ${p.shopifyLink.includes('amazon') ? 'Buy on Amazon' : 'Buy Now'}
            </a>
          </div>
        </div>
      </article>`;
}

function attachCardEvents(ctx = document) {
  qsa('.add-to-cart-btn', ctx).forEach(btn =>
    btn.addEventListener('click', () => addToCart(btn.dataset.id))
  );
}

// ─── NAVBAR NAV LINKS ─────────────────────────────────────────
function renderNavLinks() {
  const navEl = qs('#nav-links');
  const mobileEl = qs('#mobile-nav-links');
  if (!navEl && !mobileEl) return;
  const cats = getCategories();
  const links = `<a href="index.html#home">Home</a>` +
    cats.map(c => {
      const meta = categoryMeta[c] || {};
      return `<a href="index.html#section-${c}">${meta.navLabel || c}</a>`;
    }).join('');
  if (navEl) navEl.innerHTML = links;
  if (mobileEl) mobileEl.innerHTML = links;
}

// ─── SKELETON LOADING ─────────────────────────────────────────
function renderSkeletons(container, count = 4) {
  container.innerHTML = `<div class="product-grid">${Array.from({ length: count }, () => `
          <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-line w90"></div>
            <div class="skeleton skeleton-line w70"></div>
            <div class="skeleton skeleton-line w50"></div>
          </div>`).join('')
    }</div>`;
}

// ─── FILTERS ──────────────────────────────────────────────────
let filterState = { category: 'all', priceRange: 'all', rating: 0, sort: 'default' };

function populateCategoryFilter() {
  const sel = qs('#filter-category');
  if (!sel) return;
  getCategories().forEach(c => {
    const meta = categoryMeta[c] || {};
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = meta.navLabel || c;
    sel.appendChild(opt);
  });
}

function initFilters() {
  populateCategoryFilter();
  ['filter-category', 'filter-price', 'filter-rating', 'filter-sort'].forEach(id => {
    qs('#' + id)?.addEventListener('change', readAndApplyFilters);
  });
  qs('#filter-reset')?.addEventListener('click', resetFilters);
}

function readAndApplyFilters() {
  filterState.category = qs('#filter-category')?.value || 'all';
  filterState.priceRange = qs('#filter-price')?.value || 'all';
  filterState.rating = parseFloat(qs('#filter-rating')?.value || '0');
  filterState.sort = qs('#filter-sort')?.value || 'default';
  applyFilters();
}

function resetFilters() {
  ['filter-category', 'filter-price', 'filter-rating', 'filter-sort'].forEach(id => {
    const el = qs('#' + id);
    if (el) el.selectedIndex = 0;
  });
  filterState = { category: 'all', priceRange: 'all', rating: 0, sort: 'default' };
  applyFilters();
}

function applyFilters() {
  let result = [...products];
  const isFiltered = filterState.category !== 'all' || filterState.priceRange !== 'all' || filterState.rating > 0 || filterState.sort !== 'default';

  if (filterState.category !== 'all') result = result.filter(p => p.category === filterState.category);
  if (filterState.priceRange !== 'all') {
    const [mn, mx] = filterState.priceRange.split('-').map(Number);
    result = result.filter(p => p.price >= mn && p.price <= mx);
  }
  if (filterState.rating > 0) result = result.filter(p => p.rating >= filterState.rating);

  switch (filterState.sort) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break;
    case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    case 'trending': result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)); break;
  }

  const filteredView = qs('#filtered-view');
  const categorySections = qs('#products-container');
  const grid = qs('#filtered-grid');
  const countEl = qs('#filter-count');
  const titleEl = qs('#filtered-title');

  if (isFiltered) {
    filteredView?.classList.add('active');
    categorySections?.classList.add('hidden');
    if (grid) grid.innerHTML = result.length ? result.map(renderProductCard).join('') : '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">No products match your filters.</p>';
    if (titleEl) {
      const cat = filterState.category !== 'all' ? (categoryMeta[filterState.category]?.label || filterState.category) : 'All Products';
      titleEl.textContent = cat;
    }
    attachCardEvents(filteredView);
  } else {
    filteredView?.classList.remove('active');
    categorySections?.classList.remove('hidden');
  }
  if (countEl) countEl.textContent = isFiltered ? `${result.length} product${result.length !== 1 ? 's' : ''}` : '';
}

// ─── CATEGORY SECTIONS (Homepage) ────────────────────────────
function renderHomePage() {
  const container = qs('#products-container');
  if (!container) return;

  const cats = getCategories();
  const trending = products.filter(p => p.isTrending);

  // Initial HTML with placeholders
  let html = '';

  // Render Category Sections
  html += cats.map((c, i) => `
      <section class="section ${i % 2 === 0 ? 'section-alt' : ''} reveal" id="section-${c}">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-eyebrow">${categoryMeta[c]?.icon || ''} ${c}</span>
              <h2 class="section-title">${categoryMeta[c]?.label || c}</h2>
            </div>
          </div>
          <div id="grid-${c}" class="skeleton-placeholder"></div>
        </div>
      </section>`).join('');

  container.innerHTML = html;

  // Render Category Content
  cats.forEach((c, i) => {
    const gridEl = qs(`#grid-${c}`);
    if (!gridEl) return;
    renderSkeletons(gridEl, 4);
    setTimeout(() => {
      const catProducts = products.filter(p => p.category === c);
      gridEl.innerHTML = `<div class="product-grid">${catProducts.map(renderProductCard).join('')}</div>`;
      attachCardEvents(gridEl);
    }, 200 + i * 100);
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Observe newly added elements
function observeReveal(ctx = document) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  ctx.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

// ─── HEADER SCROLL EFFECT ─────────────────────────────────────
function initHeaderScroll() {
  const header = qs('#site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ─── POLICY MODALS ────────────────────────────────────────────
const policyContent = {
  shipping: { title: 'Shipping Information', body: '<p>Standard delivery takes 5-7 business days across India.</p>' },
  returns: { title: 'Returns & Refunds', body: '<p>We accept returns within 7 days of delivery.</p>' },
  faq: { title: 'FAQ', body: '<p>Standard questions and answers here.</p>' },
  contact: { title: 'Contact Us', body: '<p>Email: support@hypekart.in</p>' },
  about: { title: 'About HypeKart', body: '<p>Premium viral products curated for you.</p>' },
  privacy: { title: 'Privacy Policy', body: '<p>Your data is secure with us.</p>' },
  terms: { title: 'Terms of Service', body: '<p>Official terms of use.</p>' }
};

function initPolicyModals() {
  const backdrop = qs('#policy-modal');
  const closeBtn = qs('#policy-close');
  const titleEl = qs('#policy-title');
  const bodyEl = qs('#policy-body');

  document.addEventListener('click', e => {
    const el = e.target.closest('.policy-link');
    if (!el) return;
    e.preventDefault();
    const key = el.dataset.policy;
    const data = policyContent[key];
    if (!data || !backdrop) return;
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.body;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', closePolicyModal);
  backdrop?.addEventListener('click', e => { if (e.target === backdrop) closePolicyModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePolicyModal(); });
}

function closePolicyModal() {
  qs('#policy-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── NEWSLETTER ───────────────────────────────────────────────
function initNewsletter() {
  const btn = qs('#newsletter-btn');
  const input = qs('#newsletter-email');
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    if (!input.value.includes('@')) { showToast('Please enter a valid email.', 'error'); return; }
    showToast('Thanks for subscribing! 🎉');
    input.value = '';
  });
}

// ─── PRODUCT DETAIL PAGE ─────────────────────────────────────
function initProductDetailPage() {
  const root = qs('#product-detail-root');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const p = id ? getProductById(id) : null;

  if (!p) {
    root.innerHTML = `<div class="container" style="padding:100px; text-align:center;"><h2>Product Not Found</h2><a href="index.html">Back to Home</a></div>`;
    return;
  }

  document.title = `${p.name} — HYPEKART`;

  const hasLink = p.shopifyLink && !p.shopifyLink.startsWith('INSERT');
  const sizeHtml = p.sizes?.length
    ? `<div class="detail-option">
             <label class="detail-option-label">Select Size</label>
             <div class="size-btns">${p.sizes.map((s, i) => `<button class="sz-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>`).join('')}</div>
           </div>` : '';
  const colorHtml = p.colors?.length
    ? `<div class="detail-option">
             <label class="detail-option-label">Select Color</label>
             <div class="color-swatches">${p.colors.map((c, i) => `<button class="color-swatch ${i === 0 ? 'active' : ''}" style="background:${c}" data-color="${c}" aria-label="Color ${c}"></button>`).join('')}</div>
           </div>` : '';

  const reviewsToDisplay = p.reviews || [
    { name: 'Aryan S.', avatar: 'A', rating: 5, title: 'Absolutely love it!', text: 'Exceeded my expectations!' },
    { name: 'Priya M.', avatar: 'P', rating: 4, title: 'Very good purchase', text: 'Looks exactly like the pictures.' }
  ];

  root.innerHTML = `
      <section class="detail-section">
        <div class="container">
          <div class="breadcrumb">
            <a href="index.html">Home</a> <span>/</span> 
            <a href="index.html#section-${p.category}">${categoryMeta[p.category]?.navLabel || p.category}</a> <span>/</span> 
            <span>${p.name}</span>
          </div>
          
          <div class="detail-layout">
            <div class="detail-gallery">
              <div class="main-img-wrap">
                <img id="main-img" src="${p.images[0]}" alt="${p.name}">
              </div>
              ${p.images.length > 1 ? `
              <div class="thumb-row">
                <button class="thumb-btn active" data-img="${p.images[0]}"><img src="${p.images[0]}"></button>
                ${p.images.slice(1).map(img => `<button class="thumb-btn" data-img="${img}"><img src="${img}"></button>`).join('')}
              </div>` : ''}
            </div>

            <div class="detail-info">
              <div class="detail-category">${categoryMeta[p.category]?.icon || '📦'} ${categoryMeta[p.category]?.label || p.category}</div>
              <h1 class="detail-title">${p.name}</h1>
              
              <div class="detail-rating-row">
                <div class="stars">${stars(p.rating)}</div>
                <span>${p.rating} / 5 (${p.reviewCount} Reviews)</span>
              </div>

              <div class="detail-price">${fmt(p.price)}</div>
              
              <p class="detail-desc">${p.description}</p>

              ${sizeHtml}
              ${colorHtml}

              <div class="detail-actions">
                <a href="${p.shopifyLink}" target="_blank" class="detail-buy">
                  ${p.shopifyLink.includes('amazon') ? 'Buy on Amazon' : 'Buy Now'} — ${fmt(p.price)}
                </a>
              </div>

              <ul class="detail-features">
                ${(p.features || ['Premium Quality', 'Fast Shipping', 'Secure Checkout']).map(f => `<li>${f}</li>`).join('')}
              </ul>

              <div class="detail-meta">
                <p><strong>SKU:</strong> ${p.sku || 'HK-' + p.id.toUpperCase()}</p>
                <p><strong>Category:</strong> ${p.category}</p>
              </div>

              ${p.isTrending ? `<div class="trending-pill">🔥 Trending Pick</div>` : ''}
            </div>
          </div>
        </div>
      </section>

      <section class="reviews-section">
        <div class="container">
          <div class="reviews-layout">
            <div class="reviews-summary">
              <div class="big-score">${p.rating}</div>
              <div class="stars" style="color:#fbbf24; font-size:24px;">${stars(p.rating)}</div>
              <div class="rating-bars">
                ${[5, 4, 3, 2, 1].map(s => `
                  <div class="rating-bar-row">
                    <span>${s}★</span>
                    <div class="rb-track"><div class="rb-fill" style="width: ${s === 5 ? '85' : s === 4 ? '10' : '5'}%"></div></div>
                    <span>${s === 5 ? '85' : s === 4 ? '10' : '5'}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="reviews-list">
              <h3 style="font-size:32px; margin-bottom:40px;">What our customers say</h3>
              ${reviewsToDisplay.map(r => `
                <div class="review-card">
                  <div class="review-header">
                    <div class="reviewer-avatar">${r.avatar}</div>
                    <div>
                      <div style="font-weight:700;">${r.name}</div>
                      <div style="color:#fbbf24; font-size:12px;">${'★'.repeat(r.rating)}</div>
                    </div>
                  </div>
                  <h4 class="review-title">${r.title}</h4>
                  <p class="review-text">${r.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 class="section-title">You might also love</h2>
          <div class="product-grid" id="related-grid" style="margin-top:40px;"></div>
        </div>
      </section>
    `;

  // Re-attach gallery events
  const mainImgNode = qs('#main-img');
  qsa('.thumb-btn', root).forEach(btn => {
    btn.addEventListener('click', () => {
      mainImgNode.src = btn.dataset.img;
      qsa('.thumb-btn', root).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Option toggles
  qsa('.sz-btn', root).forEach(btn => btn.addEventListener('click', () => {
    qsa('.sz-btn', root).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));
  qsa('.color-swatch', root).forEach(btn => btn.addEventListener('click', () => {
    qsa('.color-swatch', root).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));

  // Related Products
  const relatedGrid = qs('#related-grid');
  if (relatedGrid) {
    const related = products.filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(renderProductCard).join('');
    attachCardEvents(relatedGrid);
  }
}

// ─── INIT ─────────────────────────────────────────────────────
function init() {
  initHeaderScroll();
  renderNavLinks();
  initCart();
  initMobileMenu();
  initSearch();
  initPolicyModals();
  initNewsletter();

  if (isIndexPage()) {
    renderHomePage();
    initFilters();
    setTimeout(() => {
      initScrollReveal();
      observeReveal();
    }, 500);
  } else {
    initProductDetailPage();
    setTimeout(initScrollReveal, 100);
  }
}

document.addEventListener('DOMContentLoaded', init);
