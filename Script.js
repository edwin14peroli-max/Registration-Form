const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Track validity of each field
const validity = {
  name: false,
  email: false,
  password: false
};

// Email format regex (standard simple pattern)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName() {
  const value = nameInput.value.trim();
  if (value === '') {
    nameError.textContent = 'Name is required.';
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    validity.name = false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
    nameInput.classList.add('valid');
    validity.name = true;
  }
  toggleSubmit();
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value === '') {
    emailError.textContent = 'Email is required.';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    validity.email = false;
  } else if (!emailRegex.test(value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    validity.email = false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    validity.email = true;
  }
  toggleSubmit();
}

function validatePassword() {
  const value = passwordInput.value;
  if (value.length === 0) {
    passwordError.textContent = 'Password is required.';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    validity.password = false;
  } else if (value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters long.';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    validity.password = false;
  } else {
    passwordError.textContent = '';
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    validity.password = true;
  }
  toggleSubmit();
}

function toggleSubmit() {
  submitBtn.disabled = !(validity.name && validity.email && validity.password);
}

// Real-time validation as the user types
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Final check on submit (in case JS was bypassed somehow)
form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateName();
  validateEmail();
  validatePassword();

  if (validity.name && validity.email && validity.password) {
    alert('Registration successful!');
    form.reset();
    validity.name = false;
    validity.email = false;
    validity.password = false;
    submitBtn.disabled = true;
    [nameInput, emailInput, passwordInput].forEach(i => i.classList.remove('valid', 'invalid'));
  }
});