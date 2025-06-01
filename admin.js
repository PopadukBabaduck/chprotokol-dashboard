// Список нужных монет (идентификаторы CoinGecko)
const COINS = [
  'bitcoin','ethereum','tether','ripple','binancecoin','solana','usd-coin',
  'dogecoin','cardano','tron', /* ...добавьте остальные по аналогии */
];

// Загрузка текущих сохранённых значений
function loadAdminData() {
  const bal = JSON.parse(localStorage.getItem('adminBalances') || '{}');
  const addr= JSON.parse(localStorage.getItem('adminAddresses')|| '{}');
  const tbody = document.querySelector('#admin-table tbody');
  tbody.innerHTML = '';

  COINS.forEach(id => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${id.toUpperCase()}</td>
      <td><input type="number" step="0.000001" name="bal-${id}" value="${bal[id]||0}"></td>
      <td><input type="text" name="addr-${id}" value="${addr[id]||''}" placeholder="Ваш ${id}-адрес"></td>
    `;
    tbody.append(row);
  });
}

// Сохранение из полей в localStorage
document.getElementById('save-btn').addEventListener('click', () => {
  const bal = {}, addr = {};
  COINS.forEach(id => {
    bal[id] = parseFloat(document.querySelector(`[name=bal-${id}]`).value) || 0;
    addr[id]= document.querySelector(`[name=addr-${id}]`).value.trim();
  });
  localStorage.setItem('adminBalances', JSON.stringify(bal));
  localStorage.setItem('adminAddresses', JSON.stringify(addr));
  alert('Данные сохранены.');
});

window.addEventListener('DOMContentLoaded', loadAdminData);