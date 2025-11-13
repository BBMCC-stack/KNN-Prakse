const panel = document.getElementById('sidePanel');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeFormBtn');
const saveBtn = document.getElementById('saveBtn');
const table = document.getElementById('inventoryTable');
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
    const row = table.insertRow(-1);
    row.insertCell(0).innerText = vards;
    row.insertCell(1).innerText = adrese;
    row.insertCell(2).innerText = telefons;
    row.insertCell(3).innerText = epasts;
    row.insertCell(4).innerText = irsakdat;
    row.insertCell(5).innerText = irbeigdat;
    
    // Add action button cell
    const actionCell = row.insertCell(6);
    const actionBtn = document.createElement('button');
    actionBtn.textContent = '+';
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
