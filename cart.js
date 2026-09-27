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
  { id: 'pko', nazwa: 'PKO BP', logoHtml: '<div class="lg-pko"><span>PKO</span><span class="lg-sub">BP</span></div>' },
  { id: 'mbank', nazwa: 'mBank', logoHtml: '<div class="lg-mbank">m</div>' },
  { id: 'ing', nazwa: 'ING', logoHtml: '<div class="lg-ing"><span class="lg-lion">🦁</span></div>' },
  { id: 'santander', nazwa: 'Santander', logoHtml: '<div class="lg-santander"><span class="lg-flame"></span></div>' },
  { id: 'pekao', nazwa: 'Pekao', logoHtml: '<div class="lg-pekao">P</div>' },
  { id: 'millennium', nazwa: 'Millennium Bank', logoHtml: '<div class="lg-millennium">M</div>' },
  { id: 'blik', nazwa: 'BLIK', logoHtml: '<div class="lg-blik">BLIK</div>' },
  { id: 'przelewy24', nazwa: 'Przelewy24', logoHtml: '<div class="lg-p24">P24</div>' },
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
