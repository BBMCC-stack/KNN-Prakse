const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const inventaruTable = document.getElementById('inventoryTable');
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
  const modelis = document.getElementById('modelis')?.value.trim();
  const mac = document.getElementById('mac')?.value.trim();
  const statuss = document.getElementById('statuss')?.value;
  const vieta = document.getElementById('vieta')?.value.trim();
  const klients = document.getElementById('klients')?.value;
  const edit_id = document.getElementById('edit_id')?.value;

  console.log('Form values:', {modelis, mac, statuss, vieta, klients, edit_id});

  if (!modelis || !mac) {
    alert('Lūdzu aizpildi vismaz modeli un MAC adresi!');
    return;
  }

  const formData = new FormData();
  formData.append('modelis', modelis);
  formData.append('mac', mac);
  formData.append('statuss', statuss);
  formData.append('vieta', vieta);
  formData.append('klients', klients || '');

  if (edit_id) {
    formData.append('action', 'update');
    formData.append('id', edit_id);
  } else {
    formData.append('action', 'add');
  }

  console.log('Sending to save_inventars.php...');

  fetch('save_inventars.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(text => {
    console.log('Server response:', text);
    return JSON.parse(text);
  })
  .then(data => {
    if (data.success) {
      if (edit_id && editingRow) {
        editingRow.cells[0].innerText = data.modelis;
        editingRow.cells[1].innerText = data.mac;
        editingRow.cells[2].innerText = data.statuss;
        editingRow.cells[2].setAttribute('data-status', data.statuss_num);
        editingRow.cells[3].innerText = data.vieta;
        editingRow.cells[4].innerText = data.klients;
        editingRow = null;
      } else {
        const row = inventaruTable.insertRow(-1);
        row.setAttribute('data-id', data.id);
        row.insertCell(0).innerText = data.modelis;
        row.insertCell(1).innerText = data.mac;
        const statusCell = row.insertCell(2);
        statusCell.innerText = data.statuss;
        statusCell.setAttribute('data-status', data.statuss_num);
        row.insertCell(3).innerText = data.vieta;
        row.insertCell(4).innerText = data.klients;
        
        const actionCell = row.insertCell(5);
        const editBtn = document.createElement('button');
        editBtn.textContent = '✎';
        editBtn.className = 'button button3 edit-btn';
        editBtn.style.padding = '8px 16px';
        editBtn.style.fontSize = '14px';
        actionCell.appendChild(editBtn);
      }
      clearForm();
      panel.classList.remove('open');
    } else {
      alert('Kļūda: ' + (data.error || 'Nezināma kļūda'));
    }
  })
  .catch(error => {
    alert('Kļūda: ' + error);
    console.error('Error:', error);
  });
});

// Handle edit button clicks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    editingRow = row;
    loadRowData(row);
    panel.classList.add('open');
  }
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
  const editId = document.getElementById('edit_id');
  const modelis = document.getElementById('modelis');
  const mac = document.getElementById('mac');
  const statuss = document.getElementById('statuss');
  const vieta = document.getElementById('vieta');
  const klients = document.getElementById('klients');
  
  if (editId) editId.value = '';
  if (modelis) modelis.value = '';
  if (mac) mac.value = '';
  if (statuss) statuss.value = '0';
  if (vieta) vieta.value = '';
  if (klients) klients.value = '';
}

function loadRowData(row) {
  const id = row.getAttribute('data-id');
  const editId = document.getElementById('edit_id');
  const modelis = document.getElementById('modelis');
  const mac = document.getElementById('mac');
  const statuss = document.getElementById('statuss');
  const vieta = document.getElementById('vieta');
  const klients = document.getElementById('klients');
  
  if (editId) editId.value = id;
  if (modelis) modelis.value = row.cells[0].innerText;
  if (mac) mac.value = row.cells[1].innerText;
  if (statuss) {
    const statusNum = row.cells[2].getAttribute('data-status');
    statuss.value = statusNum || '0';
  }
  if (vieta) vieta.value = row.cells[3].innerText;
  if (klients) klients.value = row.cells[4].innerText;
}

const statusSelect = document.getElementById('statuss-select');
if (statusSelect) {
  statusSelect.addEventListener('change', () => {
    const selected = statusSelect.value;
    const rows = document.querySelectorAll('#inventoryTable tr');

    rows.forEach((row, index) => {
      if (index === 0) return;
      const statusCell = row.cells[2];
      if (!statusCell) return;

      const statusNum = statusCell.getAttribute('data-status');

      if (selected === 'all' || selected === statusNum) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

const searchInput = document.getElementById('searchInput');
const inventaraTable = document.getElementById('inventoryTable');

if (searchInput && inventaraTable) {
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const rows = inventaraTable.getElementsByTagName('tr');

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
