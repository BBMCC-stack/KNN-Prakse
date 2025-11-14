const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const klientuTable = document.getElementById('klientuTable');
let editingRow = null; // Track which row is being edited

openBtn.addEventListener('click', () => {
  editingRow = null; // Clear editing mode when adding new
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

function clearForm() {
  document.getElementById('vards').value = '';
  document.getElementById('adrese').value = '';
  document.getElementById('telefons').value = '';
  document.getElementById('epasts').value = '';
  document.getElementById('irsakdat').value = '';
  document.getElementById('irbeigdat').value = '';
}

function loadRowData(row) {
  document.getElementById('vards').value = row.cells[0].innerText;
  document.getElementById('adrese').value = row.cells[1].innerText;
  document.getElementById('telefons').value = row.cells[2].innerText;
  document.getElementById('epasts').value = row.cells[3].innerText;
  document.getElementById('irsakdat').value = row.cells[4].innerText;
  document.getElementById('irbeigdat').value = row.cells[5].innerText;
}

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
    alert('Ludzu aizpildi vismaz vardu un telefona numuru!');
    return;
  }

  // Check if we're editing an existing row
  if (editingRow) {
    // Update existing row
    editingRow.cells[0].innerText = vards;
    editingRow.cells[1].innerText = adrese;
    editingRow.cells[2].innerText = telefons;
    editingRow.cells[3].innerText = epasts;
    editingRow.cells[4].innerText = irsakdat;
    editingRow.cells[5].innerText = irbeigdat;
    editingRow = null;
  } else {
    // Add new row to klienti table
    const row = klientuTable.insertRow(-1);
    row.insertCell(0).innerText = vards;
    row.insertCell(1).innerText = adrese;
    row.insertCell(2).innerText = telefons;
    row.insertCell(3).innerText = epasts;
    row.insertCell(4).innerText = irsakdat;
    row.insertCell(5).innerText = irbeigdat;
    
    // Add action button cell
    const actionCell = row.insertCell(6);
    const actionBtn = document.createElement('button');
    actionBtn.textContent = '✎';
    actionBtn.className = 'button button3';
    actionBtn.style.padding = '8px 16px';
    actionBtn.style.fontSize = '14px';
    actionBtn.onclick = () => {
      editingRow = row;
      loadRowData(row);
      panel.classList.add('open');
    };
    actionCell.appendChild(actionBtn);
  }

  // Clear form fields
  clearForm();

  panel.classList.remove('open');
});

// --- Filter panel logic ---
const filterButton = document.querySelector('.button.button1:nth-of-type(3)');
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
    const vards = document.getElementById('filterVards').value.toLowerCase();
    const adrese = document.getElementById('filterAdrese').value.toLowerCase();
    const telefons = document.getElementById('filterTelefons').value.toLowerCase();
    const epasts = document.getElementById('filterEpasts').value.toLowerCase();
    const irsakdat = document.getElementById('filterIrsakdat').value;
    const irbeigdat = document.getElementById('filterIrbeigdat').value;
    if (!vards && !adrese && !telefons && !epasts && !irsakdat && !irbeigdat) {
      alert('Lūdzu aizpildi vismaz vienu filtra lauku!');
      return;
    }
    const rows = document.querySelectorAll('#kleintuTable tr');
    let visibleCount = 0;
    rows.forEach((row, index) => {
      if (index === 0) return;
      const cells = row.querySelectorAll('td');
      const matches =
        (!vards || cells[0].innerText.toLowerCase().includes(vards)) &&
        (!adrese || cells[1].innerText.toLowerCase().includes(adrese)) &&
        (!telefons || cells[2].innerText.toLowerCase().includes(telefons)) &&
        (!epasts || cells[3].innerText.toLowerCase().includes(epasts)) &&
        (!irsakdat || cells[4].innerText.includes(irsakdat)) &&
        (!irbeigdat || cells[5].innerText.includes(irbeigdat));
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
    document.getElementById('filterVards').value = '';
    document.getElementById('filterAdrese').value = '';
    document.getElementById('filterTelefons').value = '';
    document.getElementById('filterEpasts').value = '';
    document.getElementById('filterIrsakdat').value = '';
    document.getElementById('filterIrbeigdat').value = '';
    const rows = document.querySelectorAll('#klientuTable tr');
    rows.forEach((row, index) => {
      if (index === 0) return;
      row.style.display = '';
    });
  });
}

const searchInput = document.getElementById('searchInput');
const klientaTable = document.getElementById('klientuTable');

if (searchInput && klientuTable) {
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = klientuTable.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let match = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    match = true;
                    break;
                }
            }

            rows[i].style.display = match ? '' : 'none';
        }
    });
}