
// API address for the NBA MVP records
const uri = 'api/mvps';
let MVPs = [];

// Get all MVPs from the API
function getMVPs() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayMVPs(data))
    .catch(error => console.error('Unable to get MVPs.', error));
}

// Add a new MVP
function addMVP() {
  const playerTextbox = document.getElementById('add-player');
  const countTextbox = document.getElementById('add-count');
  const seasonsTextbox = document.getElementById('add-seasons');

  const mvp = {
    player: playerTextbox.value.trim(),
    mvp_count: Number(countTextbox.value),
    seasons: seasonsTextbox.value.split(',').map(s => s.trim())
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mvp)
  })
    .then(() => {
      getMVPs();
      playerTextbox.value = '';
      countTextbox.value = '';
      seasonsTextbox.value = '';
    })
    .catch(error => console.error('Unable to add MVP.', error));
}

// Delete an MVP
function deleteMVP(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
    .then(() => getMVPs())
    .catch(error => console.error('Unable to delete MVP.', error));
}

// Display the form to edit an MVP
function displayEditForm(id) {
  const mvp = MVPs.find(mvp => mvp.id === id);

  document.getElementById('edit-player').value = mvp.player;
  document.getElementById('edit-count').value = mvp.mvp_count;
  document.getElementById('edit-seasons').value = mvp.seasons.join(', ');
  document.getElementById('edit-id').value = mvp.id;

  document.getElementById('editForm').style.display = 'block';
}

// Update an existing MVP
function updateMVP() {
  const mvpId = document.getElementById('edit-id').value;

  const mvp = {
    id: parseInt(mvpId, 10),
    player: document.getElementById('edit-player').value.trim(),
    mvp_count: Number(document.getElementById('edit-count').value),
    seasons: document.getElementById('edit-seasons').value
      .split(',')
      .map(s => s.trim())
  };

  fetch(`${uri}/${mvpId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mvp)
  })
    .then(() => getMVPs())
    .catch(error => console.error('Unable to update MVP.', error));

  closeInput();
  return false;
}

// Close the edit form
function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

// Display all MVPs in the table
function _displayMVPs(data) {
  const tBody = document.getElementById('mvps');
  tBody.innerHTML = '';

  const button = document.createElement('button');

  data.forEach(mvp => {
    // Create the Edit button
    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${mvp.id})`);

    // Create the Delete button
    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteMVP(${mvp.id})`);

    // Create a table row for the MVP
    let tr = tBody.insertRow();

    tr.insertCell(0).textContent = mvp.id;
    tr.insertCell(1).textContent = mvp.player;
    tr.insertCell(2).textContent = mvp.mvp_count;
    tr.insertCell(3).textContent = mvp.seasons.join(', ');

    tr.insertCell(4).appendChild(editButton);
    tr.insertCell(5).appendChild(deleteButton);
  });

  // Save the list for the edit function
  MVPs = data;
}

// Load the MVPs when the page opens
getMVPs();