/* ========================================================
   HRC SITE — renderers
   ======================================================== */

// ---- TOMBSTONES ----
function renderTombstones() {
  const c = document.getElementById('tombstones');
  if (!c || typeof TRANSACTIONS === 'undefined') return;
  c.innerHTML = TRANSACTIONS.map((t, i) => `
    <div class="tombstone" onclick="openTombstone(${i})">
      <img class="tombstone-img" src="${t.img}" alt="${t.title}">
      <div class="tombstone-meta">${t.sector}</div>
      <div class="tombstone-title">${t.title}</div>
      <div class="tombstone-link">${t.role} →</div>
    </div>
  `).join('');
}

function openTombstone(i) {
  const t = TRANSACTIONS[i];
  document.getElementById('modal-img').src = t.img;
  document.getElementById('modal-img').alt = t.title;
  document.getElementById('modal-meta').textContent = `${t.sector} · ${t.role}`;
  document.getElementById('modal-title').textContent = t.title;
  // Render description as multiple paragraphs (descriptions use \n\n as paragraph breaks)
  const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.getElementById('modal-desc').innerHTML = t.description
    .split(/\n\n+/)
    .map(p => `<p>${escape(p)}</p>`)
    .join('');
  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTombstone() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

// ---- SECTORS ----
function renderSectors() {
  const c = document.getElementById('sectors');
  if (!c || typeof SECTORS === 'undefined') return;
  c.innerHTML = SECTORS.map((s, i) => `
    <div class="sector">
      <div class="sector-num">${String(i + 1).padStart(2, '0')}</div>
      <h4>${s.name}</h4>
      <p>${s.desc}</p>
    </div>
  `).join('');
}

// ---- INSIGHTS TABS ----
const TAB_DATA = {
  insights:    { arr: () => POSTS,        label: 'Insight',         empty: 'New posts coming soon.' },
  cases:       { arr: () => CASE_STUDIES, label: 'Case Study',      empty: 'Case studies coming soon.' },
  whitepapers: { arr: () => WHITEPAPERS,  label: 'Whitepaper',      empty: 'Whitepapers coming soon.' }
};

function switchTab(key) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.tab[data-tab="${key}"]`).classList.add('active');
  renderTabContent(key);
}

function renderTabContent(key) {
  const c = document.getElementById('insights-grid');
  const cfg = TAB_DATA[key];
  const items = cfg.arr().slice(0, 4);
  if (items.length === 0) {
    c.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">${cfg.empty}</div>`;
    return;
  }
  c.innerHTML = items.map(item => {
    const isExternal = item.href && /^https?:\/\//.test(item.href);
    const target = isExternal ? ' target="_blank" rel="noopener"' : '';
    return `
      <a href="${item.href || '#'}" class="insight-card"${target}>
        <div class="insight-meta">${item.tag || cfg.label} · ${item.dateDisplay}</div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <span class="read-link">${isExternal ? 'Read article ↗' : 'Read →'}</span>
      </a>
    `;
  }).join('');
}

// ---- TESTIMONIALS ----
let curT = 0;
function renderTestimonial() {
  const c = document.getElementById('testimonial');
  if (!c || typeof TESTIMONIALS === 'undefined') return;
  const t = TESTIMONIALS[curT];
  c.innerHTML = `
    <blockquote>${t.quote}</blockquote>
    <cite><strong>${t.name}</strong>${t.title}</cite>
  `;
}
function nextTestimonial() { curT = (curT + 1) % TESTIMONIALS.length; renderTestimonial(); }
function prevTestimonial() { curT = (curT - 1 + TESTIMONIALS.length) % TESTIMONIALS.length; renderTestimonial(); }

// ---- AUTO-INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderTombstones();
  renderSectors();
  renderTabContent('insights');
  renderTestimonial();

  // Close modal on escape or backdrop click
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTombstone(); });
  document.getElementById('modal-backdrop').addEventListener('click', e => {
    if (e.target.id === 'modal-backdrop') closeTombstone();
  });
});
