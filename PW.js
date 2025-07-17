const passwordForm = document.getElementById('passwordForm');
const passwordList = document.getElementById('passwordList');

let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

function displayPasswords() {
  passwordList.innerHTML = '';
  passwords.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.website}</td>
      <td>${entry.username}</td>
      <td>
        <span id="pw-${index}">••••••••</span>
        <button class="show-btn" onclick="toggleSavedPassword(${index})">👁️</button>
      </td>
      <td>
        <button class="delete-btn" onclick="deletePassword(${index})">Delete</button>
      </td>
    `;
    passwordList.appendChild(row);
  });
}

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const website = document.getElementById('website').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  passwords.push({ website, username, password });
  localStorage.setItem('passwords', JSON.stringify(passwords));
  passwordForm.reset();
  displayPasswords();
});

function deletePassword(index) {
  passwords.splice(index, 1);
  localStorage.setItem('passwords', JSON.stringify(passwords));
  displayPasswords();
}

function toggleSavedPassword(index) {
  const span = document.getElementById(`pw-${index}`);
  const original = passwords[index].password;
  if (span.textContent === '••••••••') {
    span.textContent = original;
  } else {
    span.textContent = '••••••••';
  }
}

function toggleInputPassword() {
  const input = document.getElementById('password');
  const eye = document.querySelector('.toggle-password');

  if (input.type === 'password') {
    input.type = 'text';
    eye.textContent = '🙈';
  } else {
    input.type = 'password';
    eye.textContent = '👁️';
  }
}

displayPasswords();
