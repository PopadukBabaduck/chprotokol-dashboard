// app.js

// — курсы для обмена CHP → TRX
const CHP_TO_USD_RATE = 0.01;
const USD_TO_TRX_RATE = 2.5;
const CHP_TO_TRX_RATE = CHP_TO_USD_RATE * USD_TO_TRX_RATE;
let animatedTons = parseFloat(localStorage.getItem('tons')) || 0;

// ─────────────── ВСТАВКА ПОСЛЕ CHP_TO_TRX_RATE ───────────────

// 1) Словарь всех «ручных» монет (MANUAL_COINS) с балансами и ценами:
const MANUAL_COINS = {
  BTC:    { balance: 0,    price: 121341.92 },
  ETH:    { balance: 0,    price: 2850.39 },
  USDT:   { balance: 0, price: 1.12    },
  XRP:    { balance: 0,    price: 2.61    },
  BNB:    { balance: 0,    price: 742.38  },
  SOL:    { balance: 0,    price: 198.73  },
  USDC:   { balance: 0,    price: 1.12    },
  DOGE:   { balance: 0,    price: 0.26    },
  ADA:    { balance: 0,    price: 0.86    },
  TRX:    { balance: 0,    price: 0.30    },
  STETH:  { balance: 0,    price: 2848.79 },
  WBTC:   { balance: 0,    price: 121316.16 },
  SUI:    { balance: 0,    price: 4.12    },
  HYPE:   { balance: 0,    price: 37.30   },
  WSTETH: { balance: 0,    price: 3435.01 },
  LINK:   { balance: 0,    price: 17.81   },
  AVAX:   { balance: 0,    price: 26.62   },
  XLM:    { balance: 0,    price: 0.32    },
  BCH:    { balance: 0,    price: 486.90  },
  SHIB:   { balance: 0,    price: 0.00    },
  HBAR:   { balance: 0,    price: 0.22    },
  LEO:    { balance: 0,    price: 9.84    },
  TON:    { balance: 0,    price: 3.40    }, // TON-баланс синхронизируется отдельно
  LTC:    { balance: 0,    price: 109.08  },
  XMR:    { balance: 0,    price: 443.43  },
  WETH:   { balance: 0,    price: 2852.05 },
  DOT:    { balance: 0,    price: 5.22    },
  USDS:   { balance: 0,    price: 1.12    },
  BGB:    { balance: 0,    price: 6.24    },
  WEETH:  { balance: 0,    price: 3049.73 },
  PEPE:   { balance: 0,    price: 0.00    },
  "BSC-USD": { balance: 0, price: 1.12    },
  PI:     { balance: 0,    price: 0.85    },
  USDE:   { balance: 0,    price: 1.12    },
  WBT:    { balance: 0,    price: 35.62   },
  CBBTC:  { balance: 0,    price: 121434.88 },
  AAVE:   { balance: 0,    price: 288.43  },
  TAO:    { balance: 0,    price: 488.20  },
  DAI:    { balance: 0,    price: 1.12    },
  UNI:    { balance: 0,    price: 6.85    },
  NEAR:   { balance: 0,    price: 3.24    },
  APT:    { balance: 0,    price: 6.14    },
  JITOSOL:{ balance: 0,    price: 239.34  },
  OKB:    { balance: 0,    price: 58.64   },
  ONDO:   { balance: 0,    price: 1.07    },
  BUIDL:  { balance: 0,    price: 1.12    },
  CRO:    { balance: 0,    price: 0.11    },
  ETC:    { balance: 0,    price: 21.18   },
  KAS:    { balance: 0,    price: 0.12    },
  ICP:    { balance: 0,    price: 6.01    },
  TKX:    { balance: 0,    price: 37.34   },
  SUSDE:  { balance: 0,    price: 1.31    },
  TRUMP:  { balance: 0,    price: 14.58   },
  GT:     { balance: 0,    price: 23.92   },
  RENDER: { balance: 0,    price: 5.43    },
  MNT:    { balance: 0,    price: 0.83    },
  VET:    { balance: 0,    price: 0.03    },
  FET:    { balance: 0,    price: 0.99    },
  ENA:    { balance: 0,    price: 0.43    },
  ATOM:   { balance: 0,    price: 5.56    },
  WLD:    { balance: 0,    price: 1.62    },
  USD1:   { balance: 0,    price: 1.12    },
  POL:    { balance: 0,    price: 0.27    },
  LBTC:   { balance: 0,    price: 120736.00 },
  ALGO:   { balance: 0,    price: 0.26    },
  ARB:    { balance: 0,    price: 0.45    },
  FIL:    { balance: 0,    price: 3.26    },
  SUSDS:  { balance: 0,    price: 1.18    },
  FTN:    { balance: 0,    price: 4.94    },
  BONK:   { balance: 0,    price: 0.00    },
  TIA:    { balance: 0,    price: 2.96    },
  JUP:    { balance: 0,    price: 0.64    },
  FDUSD:  { balance: 0,    price: 1.12    },
  JLP:    { balance: 0,    price: 5.22    },
  S:      { balance: 0,    price: 0.55    },
  BNSOL:  { balance: 0,    price: 210.53  },
  FARTCOIN:{balance: 0,    price: 1.69    },
  KCS:    { balance: 0,    price: 12.81   },
  STX:    { balance: 0,    price: 1.05    },
  QNT:    { balance: 0,    price: 106.67  },
  VIRTUAL:{ balance: 0,    price: 2.26    },
  RSETH:  { balance: 0,    price: 2983.94 },
  OP:     { balance: 0,    price: 0.86    },
  INJ:    { balance: 0,    price: 14.86   },
  NEXO:   { balance: 0,    price: 1.40    },
  SEI:    { balance: 0,    price: 0.26    },
  IP:     { balance: 0,    price: 5.01    },
  FLR:    { balance: 0,    price: 0.02    },
  IMX:    { balance: 0,    price: 0.75    },
  RETH:   { balance: 0,    price: 3261.87 },
  WIF:    { balance: 0,    price: 1.32    },
  USDT0:  { balance: 0,    price: 1.12    },
  EOS:    { balance: 0,    price: 0.84    },
  XDC:    { balance: 0,    price: 0.08    },
  CRV:    { balance: 0,    price: 0.92    },
  SOLVBTC:{ balance: 0,    price: 121740.64 },
  GRT:    { balance: 0,    price: 0.13    },
  MKR:    { balance: 0,    price: 1856.66 },
  FLOKI:  { balance: 0,    price: 0.00    },
  TON:    { balance: getTonBalance() || 0, price: 3.41 } // обновлённый баланс TON
};

// 2) Функция списания USD из любого актива (MANUAL_COINS):
function spendUSDFromWallet(usdAmount) {
  for (const sym in MANUAL_COINS) {
    const { balance, price } = MANUAL_COINS[sym];
    const usdBal = balance * price;
    if (usdBal >= usdAmount) {
      // сколько единиц этого актива нужно списать
      const units = usdAmount / price;
      MANUAL_COINS[sym].balance -= units;
      // если списали TON — синхронизируем локально
      if (sym === 'TON') setTonBalance(MANUAL_COINS.TON.balance);
      // сохраняем обновлённый кошелёк в localStorage
      localStorage.setItem('coinsConfig', JSON.stringify(
        JSON.parse(localStorage.getItem('coinsConfig') || '[]')
      ));
      return true;
    }
  }
  return false;
}

// 3) Функции для работы с балансом TON:
function getTonBalance() {
  return parseFloat(localStorage.getItem('ton_balance')) || 0;
}
function setTonBalance(val) {
  localStorage.setItem('ton_balance', val);
  MANUAL_COINS.TON.balance = val;
}

// 4) Функции для работы с балансом CHP:
function getChpBalance() {
  return parseFloat(localStorage.getItem('chp_balance')) || 0;
}
function setChpBalance(val) {
  localStorage.setItem('chp_balance', val);
}

// ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.special-section').style.display = 'none';
    document.querySelector('.download-apk-section').style.display = 'none';
  // 0) если не залогинен → назад на login.html
  if (!localStorage.getItem('loggedInUser')) {
    location.replace('login.html');
    return;
  }

  // 1) Внедряем стили для fullscreen-картинок и тостов
  injectFullscreenStyles();

  // 2) Синхронизация начальных балансов TON и TRX
  MANUAL_COINS.TON.balance = getTonBalance();
  MANUAL_COINS.TRX.balance = parseFloat(localStorage.getItem('trx_balance')) || 0;

  // 3) Запускаем инициализацию приложения
  initApp();

  // 4) Подгружаем курсы сразу (если панель кошелька окажется открыта)
  loadWalletRates();
});

// -- toasty --
function showToast(message) {
  // воспроизводим короткий синтезаторный звук
  Tone.start().then(() => {
    new Tone.Synth().toDestination().triggerAttackRelease('G4', '16n');
  });
  // создаём и показываем «тост»
  let t = document.createElement('div');
  t.className = 'custom-toast';
  t.textContent = message;
  document.body.append(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => t.classList.remove('show'), 2000);
  setTimeout(() => t.remove(), 2400);
}

function injectFullscreenStyles() {
  const css = `
    body.no-scroll { overflow: hidden; }
    @keyframes growRotate {
      from { transform: translate(-50%, -50%) scale(0.5) rotate(0deg); opacity: 0; }
      to   { transform: translate(-50%, -50%) scale(1)   rotate(360deg); opacity: 1; }
    }
    .card.fullscreen {
      position: fixed;
      top: 50%; left: 50%;
      width: 80vw; max-height: 80vh; height: auto;
      transform-origin: center center;
      animation: growRotate 0.8s ease-out forwards;
      z-index: 2000;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6);
      cursor: pointer;
    }
    .custom-toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
      background: rgba(0,0,0,0.8);
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      z-index: 3000;
      font-family: sans-serif;
    }
    .custom-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
}

function initApp() {
  if (!localStorage.getItem('initialized')) {
    // 1) Создаём базовые значения
    localStorage.setItem('tons', '0');              // CHP-фарм с нуля
    localStorage.setItem('power', '0');
    localStorage.setItem('upgradeLevels', '{}');
    localStorage.setItem('coinsConfig', '[]');
    // 2) Синхронизируем TON-баланс
    setTonBalance(MANUAL_COINS.TON.balance || 0);
    MANUAL_COINS.TON.balance = getTonBalance();
    // 3) Синхронизируем TRX-баланс
    MANUAL_COINS.TRX.balance = parseFloat(localStorage.getItem('trx_balance')) || 0;
    // 4) Отмечаем, что инициализация выполнена
    localStorage.setItem('initialized', '1');
  }

  // показываем главный экран и запускаем логику
  document.getElementById('main-app').classList.remove('hidden');
  startApp();
}

function renderSpecialSection() {
  const specialSec = document.querySelector('.special-section');
  let chp = parseFloat(localStorage.getItem('tons')) || 0;
  let trx = MANUAL_COINS.TRX.balance;

  specialSec.innerHTML = `
    <div class="special-wrap">
      <div style="margin-bottom:16px; font-size:24px; color:#00eaff; font-weight:bold;">
        Exchange CHP to TRX
      </div>
      <div style="margin-bottom:8px;">Your balance CHP: <b id="sp-chp-bal">${chp.toFixed(6)}</b></div>
      <input id="sp-chp-amount" type="number" min="0" step="0.000001"
             placeholder="How much to exchange?"
             style="padding:8px; font-size:16px; width:180px;">
      <button id="sp-exchange-btn" style="margin-left:10px; padding:8px 16px;">
        Exchange
      </button>
      <div id="sp-result" style="margin-top:12px; font-size:16px; color:#0fa;"></div>
      <div style="margin-top:18px;">
        Your TRX balance: <b id="sp-trx-bal">${trx.toFixed(6)}</b>
      </div>
    </div>
  `;

  specialSec
    .querySelector('#sp-exchange-btn')
    .onclick = () => {
      let chpNow = parseFloat(localStorage.getItem('tons')) || 0;
      let amount = parseFloat(
        specialSec.querySelector('#sp-chp-amount').value
      ) || 0;

      if (amount <= 0) {
        specialSec.querySelector('#sp-result').textContent = "Enter amount > 0";
        return;
      }
      if (amount > chpNow) {
        specialSec.querySelector('#sp-result').textContent = "Insufficient CHP!";
        return;
      }

      // 1) Списываем CHP
      chpNow -= amount;
      localStorage.setItem('tons', chpNow);

      // 2) Добавляем TRX в MANUAL_COINS и localStorage
      MANUAL_COINS.TRX.balance += amount * CHP_TO_TRX_RATE;
      localStorage.setItem('trx_balance', MANUAL_COINS.TRX.balance);

      // 3) Обновляем coinsConfig (если TRX нет в списке, создаём)
      let coinsNow = JSON.parse(localStorage.getItem('coinsConfig') || '[]');
      let tronNow = coinsNow.find(c => c.symbol === 'TRX');
      if (!tronNow) {
        tronNow = { id: 'tron', symbol: 'TRX', balance: 0 };
        coinsNow.push(tronNow);
      }
      tronNow.balance += amount * CHP_TO_TRX_RATE;
      localStorage.setItem('coinsConfig', JSON.stringify(coinsNow));

      // 4) Показываем результат
      specialSec.querySelector('#sp-result').textContent =
        `Обмен успешно! Получено ${(amount * CHP_TO_TRX_RATE).toFixed(6)} TRX`;

      // 5) Перерисовываем секцию (обновляем балансы внутри)
      renderSpecialSection();

      // 6) Обновляем метрики и кошелёк
      updateDisplay();
      loadWalletRates();
    };
}

function startApp() {
  //
  // 1) particles.js
  //
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.6 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 120,
        color: '#fff',
        opacity: 0.2,
        width: 1
      },
      move: { enable: true, speed: 2, out_mode: 'bounce' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' } }
    },
    retina_detect: true
  });

  //
  // 2) Vanilla Tilt (опционально)
  //
  VanillaTilt.init(
    document.querySelectorAll('.cooler-wrapper[data-tilt]'),
    { max: 8, speed: 400, glare: true, 'max-glare': 0.3, scale: 1.02, perspective: 1000 }
  );

  //
  // 3) UI-ссылки
  //
  const metricsContainer = document.getElementById('metrics-container');
  const cardsEl          = document.querySelector('.power-cards');
  const walletBtn        = document.getElementById('wallet-btn');
  const walletPanel      = document.getElementById('wallet-panel');
  const walletList       = document.getElementById('wallet-list');
  const walletSearch     = document.getElementById('wallet-search');
  const walletTotal      = document.getElementById('wallet-total');
  const hideZero         = document.getElementById('hide-zero-checkbox');
  const miningTab        = document.querySelector('.power-tabs .tab:first-child');
  const specialTab       = document.querySelector('.power-tabs .tab:last-child');
  const specialSec       = document.querySelector('.special-section');
  const downloadApkBlock = document.querySelector('.download-apk-section');
  const googleBtn = document.querySelector('.download-apk-section .google-play');
  const appleBtn  = document.querySelector('.download-apk-section .app-store');


  // Обработчики “Coming soon!”
googleBtn.addEventListener('click', () => {
  alert('Coming soon!');
});
appleBtn.addEventListener('click', () => {
  alert('Coming soon!');
});

  //
  // 4) Метрики: Balance / Power / Speed (карточки с иконками)
  //
  const metrics = [
    {
      id: 'tons',
      label: 'Balance',
      unit: 'CHP',
      svg: `<img src="logo_final.png" class="chp-logo" alt="CHPROTOKOL">`
    },
    {
      id: 'power',
      label: 'Power',
      unit: 'CHP/h',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
              <path d="M11 21h-1l1-7H6l7-12h1l-1 7h4l-7 12z"/>
            </svg>`
    },
    {
      id: 'speed',
      label: 'Speed',
      unit: 'CHP/s',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v7h6v-4h2v4h6v-7h3z"/>
            </svg>`
    }
  ];

  function renderMetrics() {
    metricsContainer.innerHTML = '';
    metrics.forEach(m => {
      const div = document.createElement('div');
      div.className = 'metric-card';
      div.innerHTML = `
        <div class="metric-icon">${m.svg}</div>
        <div class="metric-info">
          <div class="metric-label">${m.label}</div>
          <div class="metric-value" id="${m.id}">0.000000</div>
          <div class="metric-unit">${m.unit}</div>
        </div>`;
      metricsContainer.append(div);
    });
  }

  //
  // 5) УБИРАЕМ «динамическое» создание модального окна обмена
  //    (блок ниже полностью удалён, т.к. используем встроенную секцию `.special-section`)
  //
  // const modal = document.createElement('div');
  // modal.id = 'exchange-modal';
  // modal.className = 'exchange-modal';
  // modal.innerHTML = `…`;
  // document.body.append(modal);
  // … и все связанные обработчики `backdrop.addEventListener… btnModal.addEventListener…`
  //

  //
  // 6) Состояние игры из localStorage
  //
  let tons   = parseFloat(localStorage.getItem('tons'))  || 0;
  let power  = parseFloat(localStorage.getItem('power')) || 0;
  let levels = JSON.parse(localStorage.getItem('upgradeLevels')) || {};

  // описание всех 20 апгрейдов
const upgrades = [
  { id: 'u1',  name: 'Garage settings',        baseCost: 1,  basePower: 0.5, img: 'garage-setup.png' },
  { id: 'u2',  name: 'Cooling system',          baseCost: 1,  basePower: 1.0, img: 'cooling-system.png' },
  { id: 'u3',  name: 'Processor',               baseCost: 1,  basePower: 2.0, img: 'processor.png' },
  { id: 'u4',  name: 'Graphics card',           baseCost: 1,  basePower: 5.0, img: 'graphics-card.png' },
  { id: 'u5',  name: 'Motherboard',             baseCost: 1,  basePower: 1.5, img: 'motherboard.png' },
  { id: 'u6',  name: 'RAM',                     baseCost: 1,  basePower: 1.2, img: 'ram.png' },
  { id: 'u7',  name: 'SSD drive',               baseCost: 1,  basePower: 0.8, img: 'ssd-drive.png' },
  { id: 'u8',  name: 'Power supply',            baseCost: 1,  basePower: 1.1, img: 'power-supply.png' },
  { id: 'u9',  name: 'Liquid cooling',          baseCost: 1,  basePower: 3.0, img: 'liquid-cooling.png' },
  { id: 'u10', name: 'Fan controller',          baseCost: 1,  basePower: 0.7, img: 'fan-controller.png' },
  { id: 'u11', name: 'BIOS ',       baseCost: 1,  basePower: 1.3, img: 'bios-optimization.png' },
  { id: 'u12', name: 'Temperature ',  baseCost: 1,  basePower: 0.6, img: 'temperature-monitor.png' },
  { id: 'u13', name: 'PCIe bus booster',        baseCost: 1,  basePower: 1.4, img: 'pcie-booster.png' },
  { id: 'u14', name: 'Power stabilizer',        baseCost: 1,  basePower: 0.9, img: 'power-stabilizer.png' },
  { id: 'u15', name: 'Power cables',            baseCost: 1,  basePower: 0.4, img: 'power-cables.png' },
  { id: 'u16', name: 'Backup battery',          baseCost: 1,  basePower: 0.3, img: 'backup-battery.png' },
  { id: 'u17', name: 'RGB lighting',       baseCost: 1,  basePower: 0.2, img: 'rgb-lighting.png' },
  { id: 'u18', name: 'Noise canceller',         baseCost: 1,  basePower: 0.1, img: 'noise-canceller.png' },
  { id: 'u19', name: 'Case anti-vibration',     baseCost: 1,  basePower: 0.25, img: 'anti-vibration.png' },
  { id: 'u20', name: 'USB hub',                 baseCost: 1,  basePower: 0.15, img: 'usb-hub.png' },
];


  function getCost(u, lvl) {
    // базовая стоимость в TON → в USD (TON.price взят из MANUAL_COINS)
    const costInTon = u.baseCost * Math.pow(1.2, lvl - 1);
    return costInTon * MANUAL_COINS.TON.price;
  }
  function getPower(u, lvl) {
    return u.basePower * Math.pow(1.15, lvl - 1);
  }

  //
  // 7) рендерим карточки
  //
  function renderCards() {
    cardsEl.innerHTML = '';
    upgrades.forEach(u => {
      const lvl  = levels[u.id] || 1;
      const cost = getCost(u, lvl);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${u.img}" alt="${u.name}">
        <div class="card-title">${u.name}</div>
        <div class="card-sub">${cost.toFixed(2)} USD</div>
      `;

      card.addEventListener('click', async () => {
        const costUSD = getCost(u, lvl);

        // пробуем списать USD из кошелька
        if (!spendUSDFromWallet(costUSD)) {
          showToast(`Нужно ${costUSD.toFixed(2)} USD, недостаточно средств.`);
          return;
        }

        // обновляем отображение кошелька
        loadWalletRates();

        // даём игроку энергию
        let powerNow = parseFloat(localStorage.getItem('power')) || 0;
        powerNow += getPower(u, lvl);
        localStorage.setItem('power', powerNow);

        // повышаем уровень апгрейда
        levels[u.id] = lvl + 1;
        localStorage.setItem('upgradeLevels', JSON.stringify(levels));

        // перерисовываем UI
        updateDisplay();
        renderCards();

        // звук и full-screen-анимация картинки
        await Tone.start();
        new Tone.Synth().toDestination().triggerAttackRelease('C4','8n');

        document.body.classList.add('no-scroll');
        const img = card.querySelector('img');
        const fsImg = img.cloneNode(true);
        fsImg.classList.add('fullscreen-img');
        document.body.append(fsImg);
        fsImg.addEventListener('click', () => {
          fsImg.remove();
          document.body.classList.remove('no-scroll');
        });
      });

      cardsEl.append(card);
    });
  }

  //
  // 8) обновляем числовые показатели
  //
  function updateDisplay() {
    const tonsVal  = parseFloat(localStorage.getItem('tons'))  || 0;
    const powerVal = parseFloat(localStorage.getItem('power')) || 0;
    document.getElementById('tons').textContent  = tonsVal.toFixed(6);
    document.getElementById('power').textContent = powerVal.toFixed(6);
    document.getElementById('speed').textContent = (powerVal / 3600).toFixed(6);
  }

  setInterval(() => {
    let tonsVal  = parseFloat(localStorage.getItem('tons'))  || 0;
    let powerVal = parseFloat(localStorage.getItem('power')) || 0;
    tonsVal += powerVal / 3600;
    localStorage.setItem('tons', tonsVal);
    updateDisplay();
  }, 1000);

  //
  // 9) панель кошелька — загрузка курсов
  //
  async function loadWalletRates() {
    walletList.innerHTML = '';
    let total = 0;

    Object.entries(MANUAL_COINS).forEach(([symbol, coin]) => {
      let balance = coin.balance;
      if (symbol === 'TON') balance = getTonBalance();
      const price = coin.price;
      const displayBalance = balance;
      total += displayBalance * price;

      const li = document.createElement('li');
      li.dataset.symbol = symbol.toLowerCase();
      li.innerHTML = `
        <span>${symbol} (${displayBalance.toFixed(6)})</span>
        <span>${price.toFixed(2)} USD</span>
      `;
      walletList.append(li);
    });

    walletTotal.textContent = `${total.toFixed(2)} USD`;
    applyFilter();
  }

  function applyFilter() {
    const term = walletSearch.value.trim().toLowerCase();
    walletList.querySelectorAll('li').forEach(li => {
      const has = li.dataset.symbol.includes(term);
      const bal = parseFloat(li.textContent.match(/\(([^)]+)\)/)[1]);
      li.style.display = (has && (!hideZero.checked || bal > 0)) ? '' : 'none';
    });
  }

  walletSearch.addEventListener('input', applyFilter);
  hideZero.addEventListener('change', applyFilter);

  walletBtn.addEventListener('click', e => {
    e.stopPropagation();
    walletPanel.classList.toggle('show');
    if (walletPanel.classList.contains('show')) loadWalletRates();
  });
  setInterval(() => {
    if (walletPanel.classList.contains('show')) loadWalletRates();
  }, 60_000);

  miningTab.onclick = () => {
    miningTab.classList.add('active');
    specialTab.classList.remove('active');
    cardsEl.style.display    = '';
    specialSec.style.display = 'none';
    downloadApkBlock.style.display = '';
  };
  specialTab.onclick = () => {
    specialTab.classList.add('active');
    miningTab.classList.remove('active');
    cardsEl.style.display    = 'none';
    specialSec.style.display = '';
    downloadApkBlock.style.display = 'none';

    renderSpecialSection();
  };

  // стартуем: метрики, карточки, дисплей, кошелёк, секция «Special»
  renderMetrics();
  renderCards();
  updateDisplay();
  loadWalletRates();
 
}
