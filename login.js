// login.js
document.addEventListener('DOMContentLoaded', () => {
  const ALLOWED_REFS = ['CODE1','CODE2','CODE3']; // ваши реферальные коды
  const toggleAuth   = document.getElementById('toggle-auth');
  const authTitle    = document.getElementById('auth-title');
  const submitBtn    = document.getElementById('submit-auth');
  const refCont      = document.getElementById('referral-container');
  const errEl        = document.getElementById('auth-error');
  const inpUser      = document.getElementById('login-input');
  const inpPass      = document.getElementById('pass-input');
  const inpRef       = document.getElementById('ref-input');

  // храним всех пользователей в localStorage.users как объект { username: { password: '...' } }
  let users       = JSON.parse(localStorage.getItem('users') || '{}');
  let isRegister  = false;

  // если уже залогинен — сразу в дашборд
  if (localStorage.getItem('loggedInUser')) {
    location.replace('app.html');
    return;
  }

  // переключаем режим Login/Register
  toggleAuth.addEventListener('click', () => {
    isRegister = !isRegister;
    authTitle.textContent  = isRegister ? 'Register' : 'Login';
    submitBtn.textContent  = isRegister ? 'Register' : 'Login';
    refCont.classList.toggle('hidden', !isRegister);
    errEl.textContent = '';
  });

  // генератор пароля (если надо)
  function genPass(len = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';
    for (let i=0; i<len; i++) {
      pwd += chars[Math.floor(Math.random()*chars.length)];
    }
    return pwd;
  }

  submitBtn.addEventListener('click', () => {
    const u = inpUser.value.trim();
    let   p = inpPass.value.trim();
    const r = inpRef.value.trim();

    if (!u) { errEl.textContent = 'Введите username'; return; }
    if (!p) { errEl.textContent = 'Введите password'; return; }

    if (isRegister) {
      // проверяем referral
      if (!ALLOWED_REFS.includes(r)) {
        errEl.textContent = 'Неверный referral code';
        return;
      }
      // сохраняем нового пользователя
      users[u] = { password: p };
      localStorage.setItem('users', JSON.stringify(users));
      // теперь авто-подставляем и переключаем на Login
      inpPass.value = p;
      toggleAuth.click();
      errEl.textContent = '✅ Зарегистрированы! Теперь войдите.';
      return;
    }

    // Login
    if (!users[u] || users[u].password !== p) {
      errEl.textContent = 'Неверное имя или пароль';
      return;
    }

    // Успешный вход — инициализируем игру (если ещё не было)
    if (!localStorage.getItem('initialized')) {
      localStorage.setItem('tons', '0');
      localStorage.setItem('power','0');
      localStorage.setItem('upgradeLevels','{}');
      localStorage.setItem('coinsConfig','[]');
      localStorage.setItem('initialized','1');
    }

    // сохраняем залогиненного пользователя
    localStorage.setItem('loggedInUser', u);

    // переходим в Dashboard
    location.href = 'app.html';
  });
});
