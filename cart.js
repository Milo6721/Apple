// ===== KATALOG PRODUKTÓW =====
const KATALOG = {
  iphone: {
    nazwa: 'iPhone Pro',
    cena: 9999,
    warianty: { 'Pro': 0, 'Pro · Tytan': 1000, 'Pro Max': 3000 },
    svg: '<svg viewBox="0 0 100 200"><rect x="4" y="4" width="92" height="192" rx="22" fill="#3a3a3e"/><rect x="9" y="9" width="82" height="182" rx="17" fill="#050505"/><rect x="34" y="16" width="32" height="11" rx="5.5" fill="#151515"/></svg>'
  },
  watch: {
    nazwa: 'Apple Watch Ultra',
    cena: 3499,
    warianty: { '41mm': 0, '49mm': 400 },
    svg: '<svg viewBox="0 0 120 160"><rect x="26" y="8" width="68" height="110" rx="22" fill="#8a8a8f"/><rect x="33" y="15" width="54" height="96" rx="16" fill="#000"/><rect x="94" y="50" width="9" height="18" rx="3" fill="#6a6a6f"/></svg>'
  },
  airpods: {
    nazwa: 'AirPods Pro',
    cena: 1299,
    warianty: null,
    svg: '<svg viewBox="0 0 120 140"><path d="M40 20 Q30 10 22 22 L18 50 Q16 65 26 72 L34 78 Q40 82 42 74 L46 35 Q47 24 40 20 Z" fill="#f2f2f2"/><path d="M80 20 Q90 10 98 22 L102 50 Q104 65 94 72 L86 78 Q80 82 78 74 L74 35 Q73 24 80 20 Z" fill="#f2f2f2"/></svg>'
  }
}

const BANKI = [
  { id: 'pko', nazwa: 'PKO BP', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#d0021b"/><path d="M10 28V12h7c4 0 6.5 2.3 6.5 6s-2.5 6-6.5 6h-3v4h-4zm4-7.5h2.5c1.8 0 2.8-.9 2.8-2.5s-1-2.5-2.8-2.5H14v5z" fill="white"/></svg>' },
  { id: 'mbank', nazwa: 'mBank', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#000"/><path d="M9 28V15h3.2l3.5 5 3.5-5H22v13h-3v-8l-3.3 4.7L12.4 20v8H9z" fill="#94dd00"/><circle cx="27" cy="21.5" r="6.5" fill="none" stroke="#94dd00" stroke-width="2.4"/></svg>' },
  { id: 'ing', nazwa: 'ING', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#ff6200"/><path d="M9 12h5v16H9V12zm9 0h4.5l6 9.5V12H33v16h-4.5l-6-9.5V28H18V12z" fill="white"/></svg>' },
  { id: 'santander', nazwa: 'Santander', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#ec0000"/><path d="M20 9c-5 0-9 3.5-9 9 0 3.2 1.8 5.6 4.3 7-1 .5-1.8 1.5-1.8 2.8 0 2.2 2.4 3.2 6.5 3.2s6.5-1 6.5-3.2c0-1.3-.8-2.3-1.8-2.8 2.5-1.4 4.3-3.8 4.3-7 0-5.5-4-9-9-9zm0 3.2c2.7 0 4.8 2 4.8 5.3s-2 5.6-4.8 6.8c-2.8-1.2-4.8-3.5-4.8-6.8s2.1-5.3 4.8-5.3z" fill="white"/></svg>' },
  { id: 'pekao', nazwa: 'Pekao', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#00447c"/><path d="M11 28V12h6.5c4.2 0 6.8 2.2 6.8 5.7 0 2.4-1.3 4.2-3.4 5l4 5.3h-4.7l-3.3-4.6H15V28h-4zm4-7.7h2c1.8 0 2.9-.9 2.9-2.5s-1.1-2.5-2.9-2.5h-2v5z" fill="white"/><path d="M27 12h3.5v11.8c0 2.8-1.7 4.6-4.8 4.6-1 0-1.9-.2-2.5-.4l.5-3c.4.1.9.2 1.3.2 1.2 0 2-.6 2-2.1V12z" fill="#ffcc00"/></svg>' },
  { id: 'millennium', nazwa: 'Millennium Bank', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#003b70"/><circle cx="14" cy="20" r="7" fill="#00a1de"/><circle cx="24" cy="20" r="7" fill="#e6007e" opacity=".9"/></svg>' },
  { id: 'blik', nazwa: 'BLIK', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#000"/><rect x="8" y="8" width="10" height="10" rx="2" fill="#ff2e2e"/><rect x="22" y="8" width="10" height="10" rx="2" fill="#ffd400"/><rect x="8" y="22" width="10" height="10" rx="2" fill="#00c48c"/><rect x="22" y="22" width="10" height="10" rx="2" fill="#2e9bff"/></svg>' },
  { id: 'przelewy24', nazwa: 'Przelewy24', logoHtml: '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#e6301e"/><path d="M11 27l10-15h8l-10 15h-8z" fill="white"/><circle cx="27" cy="13" r="3" fill="white"/></svg>' },
]

// ===== STAN KOSZYKA =====
let koszyk = []          // [{id, nazwa, wariant, dopłata, cena}]
let subskrypcjaAJAI = false
let wybraneWarianty = { iphone: 'Pro', watch: '41mm' }
let wybranyBank = null

function idg() { return 'k' + Date.now() + Math.floor(Math.random()*1000) }

// ===== WYBÓR WARIANTU (chipy pod produktem) =====
function wybierzWariant(produktId, wariant, el) {
  wybraneWarianty[produktId] = wariant
  const kontener = el.parentElement
  kontener.querySelectorAll('.wariant-chip').forEach(c => c.classList.remove('wybrany'))
  el.classList.add('wybrany')
}

// ===== DODAWANIE DO KOSZYKA =====
function dodajDoKoszyka(produktId) {
  const p = KATALOG[produktId]
  const wariant = wybraneWarianty[produktId] || null
  const doplata = (p.warianty && wariant) ? p.warianty[wariant] : 0
  koszyk.push({
    id: idg(),
    produktId,
    nazwa: p.nazwa,
    wariant,
    cena: p.cena + doplata,
    svg: p.svg
  })
  odswiezKoszyk()
  animujLiczbe()
  pokazToast('🛒 Dodano do koszyka: ' + p.nazwa + (wariant ? ' (' + wariant + ')' : ''))
}

function dodajSubskrypcje() {
  subskrypcjaAJAI = true
  odswiezKoszyk()
  animujLiczbe()
  pokazToast('✨ Dodano subskrypcję AJAI+')
  otworzKoszyk()
}

function usunZKoszyka(itemId) {
  koszyk = koszyk.filter(x => x.id !== itemId)
  odswiezKoszyk()
}

function animujLiczbe() {
  const c = document.getElementById('cart-count')
  c.classList.remove('pop')
  void c.offsetWidth
  c.classList.add('pop')
}

// ===== RENDER KOSZYKA =====
function odswiezKoszyk() {
  const count = koszyk.length + (subskrypcjaAJAI ? 1 : 0)
  const cEl = document.getElementById('cart-count')
  cEl.textContent = count
  cEl.style.display = count > 0 ? 'flex' : 'none'

  const body = document.getElementById('cart-body')
  const foot = document.getElementById('cart-foot')

  if (count === 0) {
    body.innerHTML = `<div class="cart-empty">
      <svg viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12L5 3H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Koszyk jest pusty.<br>Ale poczekaj, zaraz coś Ci zaproponujemy.
    </div>`
    foot.style.display = 'none'
    return
  }

  foot.style.display = 'block'

  let html = koszyk.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">${item.svg}</div>
      <div class="cart-item-info">
        <div class="nazwa">${item.nazwa}</div>
        <div class="wariant">${item.wariant ? item.wariant : 'wariant standardowy'}</div>
        <div class="cena">${formatPln(item.cena)}</div>
      </div>
      <button class="cart-remove" onclick="usunZKoszyka('${item.id}')">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>`).join('')

  if (subskrypcjaAJAI) {
    html += `
    <div class="cart-item">
      <div class="cart-item-thumb" style="background:linear-gradient(135deg,#7c3aed,#4c1d95)">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none"><circle cx="12" cy="12" r="8" stroke="white" stroke-width="1.6"/></svg>
      </div>
      <div class="cart-item-info">
        <div class="nazwa">AJAI+ <span class="sub-tag">subskrypcja</span></div>
        <div class="wariant">odnawia się co miesiąc, obiecujemy</div>
        <div class="cena">39 zł / mies.</div>
      </div>
      <button class="cart-remove" onclick="usunSubskrypcje()">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>`
  }

  body.innerHTML = html

  const sumaProdukty = koszyk.reduce((s, x) => s + x.cena, 0)
  const sumaSub = subskrypcjaAJAI ? 39 : 0

  document.getElementById('sum-produkty').textContent = formatPln(sumaProdukty)
  document.getElementById('sum-subskrypcje').textContent = formatPln(sumaSub) + '/mies.'
  document.getElementById('sum-total').textContent = formatPln(sumaProdukty + sumaSub)
}

function usunSubskrypcje() {
  subskrypcjaAJAI = false
  odswiezKoszyk()
}

function formatPln(n) { return n.toLocaleString('pl-PL') + ' zł' }

// ===== OTWIERANIE / ZAMYKANIE PANELU =====
function otworzKoszyk() {
  document.getElementById('cart-overlay').classList.add('otwarty')
  document.getElementById('cart-panel').classList.add('otwarty')
}
function zamknijKoszyk() {
  document.getElementById('cart-overlay').classList.remove('otwarty')
  document.getElementById('cart-panel').classList.remove('otwarty')
}

// ===== MODAL PŁATNOŚCI =====
function otworzPlatnosc() {
  if (koszyk.length === 0 && !subskrypcjaAJAI) return
  wybranyBank = null

  const sumaProdukty = koszyk.reduce((s, x) => s + x.cena, 0)
  const sumaSub = subskrypcjaAJAI ? 39 : 0

  // odbuduj całą strukturę pay-content od zera - niezależnie od tego co tam było poprzednio
  const content = document.getElementById('pay-content')
  content.innerHTML = `
    <h3>Wybierz metodę płatności</h3>
    <div class="pay-sub">Wybierz bank, przez który (rzekomo) zapłacisz</div>
    <div class="bank-lista" id="bank-lista">
      ${BANKI.map(b => `
        <div class="bank-opcja" onclick="wybierzBank('${b.id}', this)">
          <div class="bank-logo bank-logo-${b.id}">${b.logoHtml}</div>
          <span class="nazwa">${b.nazwa}</span>
        </div>`).join('')}
    </div>
    <div class="pay-summary">
      <div class="cart-line"><span>Produkty</span><span>${formatPln(sumaProdukty)}</span></div>
      <div class="cart-line"><span>Subskrypcje / mies.</span><span>${formatPln(sumaSub)}/mies.</span></div>
      <div class="cart-line total"><span>Do zapłaty dziś</span><span>${formatPln(sumaProdukty + sumaSub)}</span></div>
    </div>`

  document.getElementById('pay-overlay').classList.add('otwarty')
}

function zamknijPlatnosc() {
  document.getElementById('pay-overlay').classList.remove('otwarty')
}

function wybierzBank(bankId, el) {
  wybranyBank = bankId
  const bank = BANKI.find(b => b.id === bankId)
  document.querySelectorAll('.bank-opcja').forEach(o => o.classList.remove('wybrany'))
  el.classList.add('wybrany')

  // od razu pokaż że nie da się zrealizować zamówienia - bez wypełniania czegokolwiek
  setTimeout(() => pokazBlad(bank), 350)
}

function pokazBlad(bank) {
  const content = document.getElementById('pay-content')
  content.innerHTML = `
    <div class="success-screen">
      <div class="success-icon" style="background:#ff3b30">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h3>Nie można zrealizować tego zamówienia</h3>
      <p>Próbowaliśmy połączyć się z ${bank.nazwa}, ale coś poszło nie tak. To pommE — parodia, nic tu naprawdę nie kupisz.<br><br>Dziękujemy za odwiedzenie strony.</p>
      <button class="btn-final-pay" style="margin-top:18px" onclick="zamknijPlatnosc()">Zamknij</button>
    </div>`
}

function finalizujPlatnosc() {
  // przycisk zostaje w kodzie dla zgodności, ale wybór banku sam finalizuje proces
  return
}

// init
odswiezKoszyk()
