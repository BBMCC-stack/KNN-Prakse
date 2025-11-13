const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const table = document.getElementById('inventoryTable');

const filterButton = document.getElementById('openFilterBtn');
const filterPanel = document.getElementById('filterPanel');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const applyFilterBtn = document.getElementById('applyFilterBtn');

openBtn.addEventListener('click', () => {
  filterPanel.classList.remove('active');
  panel.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  panel.classList.remove('open');
});

window.addEventListener('click', (e) => {
  if (e.target === panel) panel.classList.remove('open');
});

if (filterButton && filterPanel)
  filterButton.addEventListener('click', () => {
    panel.classList.remove('open');
    filterPanel.classList.add('active');
  });

  closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('active');
  });

  applyFilterBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const model = document.getElementById('filterModel').value.toLowerCase();
  const mac = document.getElementById('filterMac').value.toLowerCase();
  const status = document.getElementById('filterStatus').value.toLowerCase();
  const location = document.getElementById('filterLocation').value.toLowerCase();
  const client = document.getElementById('filterClient').value.toLowerCase();

  if (!model && !mac && !status && !location && !client) {
    alert('Lūdzu aizpildi vismaz vienu filtra lauku!');
    return;
  }

  const rows = document.querySelectorAll('#inventoryTable tr');
  let visibleCount = 0;

  rows.forEach((row, index) => {
    if (index === 0) return;
    const cells = row.querySelectorAll('td');
    const matches =
      (!model || cells[0].innerText.toLowerCase().includes(model)) &&
      (!mac || cells[1].innerText.toLowerCase().includes(mac)) &&
      (!status || cells[2].innerText.toLowerCase().includes(status)) &&
      (!location || cells[3].innerText.toLowerCase().includes(location)) &&
      (!client || cells[4].innerText.toLowerCase().includes(client));

    row.style.display = matches ? '' : 'none';
    if (matches) visibleCount++;
  });

  if (visibleCount === 0) {
    alert('Nav atrasts neviens ieraksts ar šādiem filtriem.');
    // Rāda atpakaļ visas rindas, jo neko neatlasa
    rows.forEach((row, index) => {
      if (index === 0) return;
      row.style.display = '';
    });
    return;
  }

  // Ja bija atrasti, tad aizver paneli
  filterPanel.classList.remove('active');
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

  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    const existingModelis = rows[i].cells[0].innerText.trim();
    const existingMac = rows[i].cells[1].innerText.trim();
    const existingStatuss = rows[i].cells[2].innerText.trim();
    const existingVieta = rows[i].cells[3].innerText.trim();
    const existingKlients = rows[i].cells[4].innerText.trim();

    if (
      existingModelis === modelis &&
      existingMac === mac &&
      existingStatuss === statuss &&
      existingVieta === vieta &&
      existingKlients === klients
    ) {
      alert('Šāds inventārs jau ir pievienots tabulā!');
      return;
    }
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

const statusSelect = document.getElementById('statuss-select');
statusSelect.addEventListener('change', () => {
  const selectedStatus = statusSelect.value;
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const rowStatus = rows[i].cells[2].innerText.toLowerCase();

    if (selectedStatus === 'all') {
      rows[i].style.display = '';
    } else if (
      (selectedStatus === 'available' && rowStatus === 'pieejams') ||
      (selectedStatus === 'rented' && rowStatus === 'izīrēts') ||
      (selectedStatus === 'writtenoff' && rowStatus === 'norakstīts')
    ) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
});

const clearFilterBtn = document.getElementById('clearFilterBtn');
if (clearFilterBtn) {
  clearFilterBtn.addEventListener('click', () => {
    // Notīra visus filtra laukus
    document.getElementById('filterModel').value = '';
    document.getElementById('filterMac').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterLocation').value = '';
    document.getElementById('filterClient').value = '';

    // Parāda visas rindas atpakaļ tabulā
    const rows = document.querySelectorAll('#inventoryTable tr');
    rows.forEach((row, index) => {
      if (index === 0) return;
      row.style.display = '';
    });
  });
}