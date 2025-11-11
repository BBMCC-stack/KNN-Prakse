const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const table = document.getElementById('inventoryTable');

openBtn.addEventListener('click', () => {
  panel.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  panel.classList.remove('open');
});

window.addEventListener('click', (e) => {
  if (e.target === panel) {
    panel.classList.remove('open');
  }
});

saveBtn.addEventListener('click', () => {
  // Get values from klienti form fields
  const vards = document.getElementById('vards').value.trim();
  const adrese = document.getElementById('adrese').value.trim();
  const telefons = document.getElementById('telefons').value.trim();
  const epasts = document.getElementById('epasts').value.trim();
  const irsakdat = document.getElementById('irsakdat').value.trim();
  const irbeigdat = document.getElementById('irbeigdat').value.trim();

  // Require at least name and phone
  if (!vards || !telefons) {
    alert('Lūdzu aizpildi vismaz vārdu un telefona numuru!');
    return;
  }

  // Add new row to klienti table
  const row = table.insertRow(-1);
  row.insertCell(0).innerText = vards;
  row.insertCell(1).innerText = adrese;
  row.insertCell(2).innerText = telefons;
  row.insertCell(3).innerText = epasts;
  row.insertCell(4).innerText = irsakdat;
  row.insertCell(5).innerText = irbeigdat;

  // Clear form fields
  document.getElementById('vards').value = '';
  document.getElementById('adrese').value = '';
  document.getElementById('telefons').value = '';
  document.getElementById('epasts').value = '';
  document.getElementById('irsakdat').value = '';
  document.getElementById('irbeigdat').value = '';

  panel.classList.remove('open');
});