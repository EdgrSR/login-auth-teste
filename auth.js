class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

class Auth {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  isEmailRegistered(email) {
    return this.users.some((user) => user.email === email);
  }

  validatePassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  registerUser(name, email, password) {
    if (this.isEmailRegistered(email)) {
      this.showError("registerError", "E-mail já cadastrado.");
      return false;
    }
    const newUser = new User(name, email, password);
    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
    return true;
  }

  loginUser(email, password) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      return true;
    } else {
      this.showError("loginError", "E-mail ou senha incorretos.");
      return false;
    }
  }

  showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }

  clearError(elementId) {
    document.getElementById(elementId).textContent = "";
  }
}

const auth = new Auth();

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    auth.clearError("registerError");

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;

    if (!name || !email || !password || !confirmPassword) {
      auth.showError("registerError", "Por favor, preencha todos os campos.");
      return;
    }

    if (!auth.validatePassword(password, confirmPassword)) {
      auth.showError("registerError", "As senhas não coincidem.");
      return;
    }

    if (auth.registerUser(name, email, password)) {
      const registerModal = bootstrap.Modal.getInstance(
        document.getElementById("registerModal")
      );
      registerModal.hide();

      alert("Cadastro realizado com sucesso!");
      document.getElementById("registerForm").reset();
    }
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    auth.clearError("loginError");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (auth.loginUser(email, password)) {
      window.location.href = "main.html";
    }
  });
