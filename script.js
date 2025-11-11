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
  const modelis = document.getElementById('modelis').value.trim();
  const mac = document.getElementById('mac').value.trim();
  const statuss = document.getElementById('statuss').value;
  const vieta = document.getElementById('vieta').value.trim();
  const klients = document.getElementById('klients').value.trim();

  if (!modelis || !mac || !statuss || !vieta || !klients) {
    alert('Lūdzu aizpildi visus laukumus!');
    return;
  }


  const row = table.insertRow(-1);
  row.insertCell(0).innerText = modelis;
  row.insertCell(1).innerText = mac;
  row.insertCell(2).innerText = statuss;
  row.insertCell(3).innerText = vieta;
  row.insertCell(4).innerText = klients;

  document.getElementById('modelis').value = '';
  document.getElementById('mac').value = '';
  document.getElementById('statuss').value = 'Pieejams';
  document.getElementById('vieta').value = '';
  document.getElementById('klients').value = '';

  panel.classList.remove('open');
});