
// API address for the NBA MVP records
const uri = '/api/mvps';

// Store the MVP records
let MVPs = [];

// Get all MVPs from the API
function getMVPs() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayMVPs(data))
        .catch(error => console.error('Unable to get MVPs.', error));
}

// Add a new MVP
function addMVP() {
    const id = document.getElementById('mvp-id').value;

    // Get the information from the form
    const mvp = {
        player: document.getElementById('player').value.trim(),
        mvp_count: Number(document.getElementById('mvp-count').value),
        seasons: document.getElementById('seasons').value
            .split(',')
            .map(s => s.trim())
    };

    // Choose whether to add or update an MVP
    let url = uri;
    let method = 'POST';

    if (id !== '') {
        url = uri + '/' + id;
        method = 'PUT';
        mvp.id = Number(id);
    }

    // Send the MVP information to the API
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mvp)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to save MVP.');
            }

            // Clear the form and reload the list
            document.getElementById('mvp-form').reset();
            document.getElementById('mvp-id').value = '';
            document.getElementById('form-title').textContent = 'Add an MVP';
            document.getElementById('save-button').textContent = 'Add MVP';
            document.getElementById('cancel-button').hidden = true;

            getMVPs();
        })
        .catch(error => console.error('Unable to save MVP.', error));
}

// Delete an MVP
function deleteMVP(id) {
    if (confirm('Are you sure you want to delete this MVP?')) {
        fetch(uri + '/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Unable to delete MVP.');
                }

                getMVPs();
            })
            .catch(error => console.error('Unable to delete MVP.', error));
    }
}

// Load an MVP into the form for editing
function editMVP(id) {
    // Find the MVP in the list
    const mvp = MVPs.find(mvp => mvp.id === id);

    if (!mvp) {
        return;
    }

    // Fill in the form with the MVP's information
    document.getElementById('mvp-id').value = mvp.id;
    document.getElementById('player').value = mvp.player;
    document.getElementById('mvp-count').value = mvp.mvp_count;
    document.getElementById('seasons').value = mvp.seasons.join(', ');

    // Change the form to editing mode
    document.getElementById('form-title').textContent = 'Edit MVP';
    document.getElementById('save-button').textContent = 'Update MVP';
    document.getElementById('cancel-button').hidden = false;
}

// Display all MVPs in the table
function displayMVPs(data) {
    // Find the table body in your HTML
    const list = document.getElementById('mvp-list');

    // Clear the old rows
    list.innerHTML = '';

    // Save the records for the edit function
    MVPs = data;

    // Add each MVP to the table
    MVPs.forEach(mvp => {
        const row = list.insertRow();

        row.insertCell(0).textContent = mvp.id;
        row.insertCell(1).textContent = mvp.player;
        row.insertCell(2).textContent = mvp.mvp_count;
        row.insertCell(3).textContent = mvp.seasons.join(', ');

        // Create the Edit and Delete buttons
        const actions = row.insertCell(4);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editMVP(mvp.id);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteMVP(mvp.id);
        };

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
    });
}

// Submit the form when adding or updating an MVP
document.getElementById('mvp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addMVP();
});

// Cancel editing and clear the form
document.getElementById('cancel-button').addEventListener('click', function() {
    document.getElementById('mvp-form').reset();
    document.getElementById('mvp-id').value = '';
    document.getElementById('form-title').textContent = 'Add an MVP';
    document.getElementById('save-button').textContent = 'Add MVP';
    this.hidden = true;
});

// Refresh the MVP list when the button is clicked
document.getElementById('refresh-button').addEventListener('click', getMVPs);

// Load the MVPs when the page opens
getMVPs();