const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const table = document.getElementById('inventoryTable');
let editingRow = null; // Track which row is being edited

openBtn.addEventListener('click', () => {
  editingRow = null; // Clear editing mode when adding new
  clearForm();
  const filterPanel = document.getElementById('filterPanel');
  if (filterPanel) filterPanel.classList.remove('active');
  panel.classList.add('open');
});

openBtn.addEventListener('click', () => {
  editingRow = null;
  clearForm();
  panel.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  editingRow = null;
  clearForm();
  panel.classList.remove('open');
});

window.addEventListener('click', (e) => {
  if (e.target === panel) {
    editingRow = null;
    clearForm();
    panel.classList.remove('open');
  }
});

saveBtn.addEventListener('click', () => {
  const modelis = document.getElementById('modelis').value.trim();
  const mac = document.getElementById('mac').value.trim();
  const statuss = document.getElementById('statuss').value;
  const vieta = document.getElementById('vieta').value.trim();
  const klients = document.getElementById('klients').value.trim();

  if (!modelis || !mac) {
    alert('Lūdzu aizpildi vismaz modeli un MAC adresi!');
    return;
  }

  if (editingRow) {
    // Update existing row
    editingRow.cells[0].innerText = modelis;
    editingRow.cells[1].innerText = mac;
    editingRow.cells[2].innerText = statuss;
    editingRow.cells[3].innerText = vieta;
    editingRow.cells[4].innerText = klients;
    editingRow = null;
  } else {
    // Add new row
    const row = table.insertRow(-1);
    row.insertCell(0).innerText = modelis;
    row.insertCell(1).innerText = mac;
    row.insertCell(2).innerText = statuss;
    row.insertCell(3).innerText = vieta;
    row.insertCell(4).innerText = klients;
    // Add edit button
    const actionCell = row.insertCell(5);
    const editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.className = 'button button3';
    editBtn.style.padding = '8px 16px';
    editBtn.style.fontSize = '14px';
    editBtn.onclick = () => {
      editingRow = row;
      loadRowData(row);
      panel.classList.add('open');
    };
    actionCell.appendChild(editBtn);
  }

  clearForm();
  panel.classList.remove('open');
});

// --- Filter panel logic ---
const filterButton = document.getElementById('openFilterBtn');
const filterPanel = document.getElementById('filterPanel');
const closeFilterBtn = document.getElementById('closeFilterBtn');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const clearFilterBtn = document.getElementById('clearFilterBtn');

if (filterButton && filterPanel)
  filterButton.addEventListener('click', () => {
    panel.classList.remove('open');
    filterPanel.classList.add('active');
  });

if (closeFilterBtn)
  closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('active');
  });

if (applyFilterBtn)
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
      rows.forEach((row, index) => {
        if (index === 0) return;
        row.style.display = '';
      });
      return;
    }
    filterPanel.classList.remove('active');
  });

if (clearFilterBtn) {
  clearFilterBtn.addEventListener('click', () => {
    document.getElementById('filterModel').value = '';
    document.getElementById('filterMac').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterLocation').value = '';
    document.getElementById('filterClient').value = '';
    const rows = document.querySelectorAll('#inventoryTable tr');
    rows.forEach((row, index) => {
      if (index === 0) return;
      row.style.display = '';
    });
  });
}

function clearForm() {
  document.getElementById('modelis').value = '';
  document.getElementById('mac').value = '';
  document.getElementById('statuss').value = 'Pieejams';
  document.getElementById('vieta').value = '';
  document.getElementById('klients').value = '';
}

function loadRowData(row) {
  document.getElementById('modelis').value = row.cells[0].innerText;
  document.getElementById('mac').value = row.cells[1].innerText;
  document.getElementById('statuss').value = row.cells[2].innerText;
  document.getElementById('vieta').value = row.cells[3].innerText;
  document.getElementById('klients').value = row.cells[4].innerText;
}

const statusSelect = document.getElementById('statuss-select');
if (statusSelect) {
  statusSelect.addEventListener('change', () => {
    const selected = statusSelect.value.toLowerCase(); // all / available / rented / writtenoff
    const rows = document.querySelectorAll('#inventoryTable tr');

    rows.forEach((row, index) => {
      if (index === 0) return; // izlaiž tabulas virsrakstus
      const statusCell = row.cells[2]; // 3. kolonna ir "Statuss"
      if (!statusCell) return;

      const cellText = statusCell.innerText.toLowerCase();

      if (selected === 'all') {
        row.style.display = '';
      } else if (
        (selected === 'available' && cellText.includes('pieejams')) ||
        (selected === 'rented' && cellText.includes('izīrēts')) ||
        (selected === 'writtenoff' && cellText.includes('norakstīts'))
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}