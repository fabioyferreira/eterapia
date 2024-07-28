document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:3000/users'; // Altere para a URL do seu backend
    const userForm = document.getElementById('cadpaciente');
    const cancelButton = document.getElementById('cancel-button');
    const usersTable = document.getElementById('users');
    let editingUserId = null;
  
    userForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nomepaciente = document.getElementById('nomepaciente').value;
      const cpfpaciente = document.getElementById('cpfpaciente').value;
      const emailpaciente = document.getElementById('emailpaciente').value;
  
      addUser({ nomepaciente, cpfpaciente, emailpaciente });
    });
  
    cancelButton.addEventListener('click', function () {
      clearForm();
    });
  
    function fetchUsers() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          usersTable.innerHTML = '';
          data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.nomepaciente}</td>
              <td>${user.cpfpaciente}</td>
              <td>${user.emailpaciente}</td>
              <td class="actions">
                <button onclick="editUser(${user.id}, '${user.nomepaciente}', ${user.cpfpaciente}, '${user.emailpaciente}')">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
              </td>
            `;
            usersTable.appendChild(row);
          });
        });
    }
  
    window.editUser = function (id, nomepaciente, cpfpaciente, emailpaciente) {
      document.getElementById('nomepaciente').value = nomepaciente;
      document.getElementById('cpfpaciente').value = cpfpaciente;
      document.getElementById('emailpaciente').value = emailpaciente;
      editingUserId = id;
      document.querySelector('h2').textContent = 'Edit User';
      cancelButton.style.display = 'inline';
    };
  
    window.deleteUser = function (id) {
      fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(() => fetchUsers());
    };
  
    function addUser(user) {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(() => {
          fetchUsers();
          clearForm();
        });
    }
  
    function updateUser(id, user) {
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(() => {
          fetchUsers();
          clearForm();
        });
    }
  
    function clearForm() {
      document.getElementById('nomepaciente').value = '';
      document.getElementById('cpfpaciente').value = '';
      document.getElementById('emailpaciente').value = '';
      editingUserId = null;
      document.querySelector('h2').textContent = 'Add User';
      cancelButton.style.display = 'none';
    }
  
    fetchUsers();
  });



/////////////////////////////////////////////////////


