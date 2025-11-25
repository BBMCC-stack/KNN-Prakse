const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const klientuTable = document.getElementById('klientuTable');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    if (row) {
      loadRowData(row);
      panel.classList.add('open');
    }
  }
});

openBtn.addEventListener('click', () => {
  clearForm();
  panel.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  clearForm();
  panel.classList.remove('open');
});

window.addEventListener('click', (e) => {
  if (e.target === panel) {
    clearForm();
    panel.classList.remove('open');
  }
});

function clearForm() {
  const editId = document.getElementById('edit_id');
  const vards = document.getElementById('vards');
  const adrese = document.getElementById('adrese');
  const telefons = document.getElementById('telefons');
  const epasts = document.getElementById('epasts');
  const irsakdat = document.getElementById('irsakdat');
  const irbeigdat = document.getElementById('irbeigdat');
  
  if (editId) editId.value = '';
  if (vards) vards.value = '';
  if (adrese) adrese.value = '';
  if (telefons) telefons.value = '';
  if (epasts) epasts.value = '';
  if (irsakdat) irsakdat.value = '';
  if (irbeigdat) irbeigdat.value = '';
}

function loadRowData(row) {
  const id = row.getAttribute('data-id');
  const editId = document.getElementById('edit_id');
  const vards = document.getElementById('vards');
  const adrese = document.getElementById('adrese');
  const telefons = document.getElementById('telefons');
  const epasts = document.getElementById('epasts');
  const irsakdat = document.getElementById('irsakdat');
  const irbeigdat = document.getElementById('irbeigdat');
  
  if (editId) editId.value = id;
  if (vards) vards.value = row.cells[0].innerText;
  if (adrese) adrese.value = row.cells[1].innerText;
  if (telefons) telefons.value = row.cells[2].innerText;
  if (epasts) epasts.value = row.cells[3].innerText;
  if (irsakdat) irsakdat.value = row.cells[4].innerText;
  if (irbeigdat) irbeigdat.value = row.cells[5].innerText;
}

if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const vards = document.getElementById('vards')?.value.trim();
    const adrese = document.getElementById('adrese')?.value.trim();
    const telefons = document.getElementById('telefons')?.value.trim();
    const epasts = document.getElementById('epasts')?.value.trim();
    const irsakdat = document.getElementById('irsakdat')?.value.trim();
    const irbeigdat = document.getElementById('irbeigdat')?.value.trim();
    const edit_id = document.getElementById('edit_id')?.value;

    if (!vards) {
    alert('Lūdzu aizpildi vārdu!');
    return;
  }

  const formData = new FormData();
  formData.append('vards', vards);
  formData.append('adrese', adrese);
  formData.append('telefons', telefons);
  formData.append('epasts', epasts);
  formData.append('irsakdat', irsakdat);
  formData.append('irbeigdat', irbeigdat);

  if (edit_id) {
    formData.append('action', 'update');
    formData.append('id', edit_id);
  } else {
    formData.append('action', 'add');
  }

  console.log('Sending to save_klienti.php...');

  fetch('save_klienti.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(text => {
    console.log('Server response:', text);
    return JSON.parse(text);
  })
  .then(data => {
    console.log('Parsed data:', data);
    if (data.success) {
      console.log('Success! edit_id:', edit_id);
      if (edit_id) {
        const row = document.querySelector(`tr[data-id="${edit_id}"]`);
        console.log('Updating row:', row);
        if (row) {
          row.cells[0].innerText = data.vards;
          row.cells[1].innerText = data.adrese;
          row.cells[2].innerText = data.telefons;
          row.cells[3].innerText = data.epasts;
          row.cells[4].innerText = data.irsakdat;
          row.cells[5].innerText = data.irbeigdat;
        }
      } else {
        const row = klientuTable.insertRow(1);
        row.setAttribute('data-id', data.id);
        row.insertCell(0).innerText = data.vards;
        row.insertCell(1).innerText = data.adrese;
        row.insertCell(2).innerText = data.telefons;
        row.insertCell(3).innerText = data.epasts;
        row.insertCell(4).innerText = data.irsakdat;
        row.insertCell(5).innerText = data.irbeigdat;
        
        const actionCell = row.insertCell(6);
        const editBtn = document.createElement('button');
        editBtn.className = 'button button3 edit-btn';
        editBtn.style.padding = '8px 16px';
        editBtn.style.fontSize = '14px';
        editBtn.textContent = '✎';
        actionCell.appendChild(editBtn);
      }
      
      clearForm();
      panel.classList.remove('open');
    } else {
      alert('Kļūda: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Kļūda saglabājot datus');
  });
  });
} else {
  console.error('saveBtn element not found!');
}

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