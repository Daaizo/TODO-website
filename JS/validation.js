$(document).ready(function () {
  $("#fullScrAlert").on("click", "#acceptRegister", function () {
    const email = $("#email");
    const login = $("#login");
    const password = $("#password");
    const passwordRepeat = $("#passwordRepeat");
    if (User.checkIfLoginIsUnique(login.val())) {
      const user = new User(login.val(), email.val(), password.val());
      user.addUserToStorage();
      toggleBlurAndDisplayForm("none");
      $("#fullScrAlert").css("display", "none");
      $(".formContent").toggleClass("blur");
    }
  });
  $("#fullScrAlert").on("click", "#notAcceptRegister", function () {
    $("#fullScrAlert").css("display", "none");
    $(".formContent").toggleClass("blur");
  });
});
function printDataFromRegister() {
  const login = $("#login");
  if (User.checkIfLoginIsUnique(login.val())) {
    hideAlert();
    var dane = "Are you accepting the registration data you have entered:<br>";
    dane += "Email: " + document.getElementById("email").value + "<br>";
    dane += "Login: " + document.getElementById("login").value + "<br>";
    dane += "Password: " + document.getElementById("password").value + "<br>";
    dane +=
      "<button id='acceptRegister'>yes</button><button id='notAcceptRegister'>no</button>";
    fullScreenAlert(dane, ".formContent");
  }
}

function checkField(field, regex) {
  if (!regex.test(field.value)) return false;
  else return true;
}
function checkPassword() {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$&%^*()_+])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
  //Strong password made by me, one small letter,one big, special sign , number , 6-20 length
  // https://rubular.com/r/gEmHAEm9wKr1Tj    <- regex checker to trye it

  const errorField = document.getElementById("passwordError");
  const field = document.getElementById("password");
  if (!checkField(field, passwordRegex)) {
    createAlert(
      "erorr",
      "Enter a valid password!</br> Password should contain at least 1 uppercase letter, 1 special character, 1 number, 1 lowercase letter, 6-20 characters"
    );
    field.classList.add("error");
    return false;
  } else {
    errorField.innerHTML = "";
    field.classList.remove("error");
    return true;
  }
}

function checkEmail() {
  const emailRegex =
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
  const errorField = document.getElementById("emailError");
  const field = document.getElementById("email");
  if (!checkField(field, emailRegex)) {
    createAlert(
      "erorr",
      "Enter a valid email!</br>Email should contain the @ sign and an email address such as jas@gmail.com "
    );
    field.classList.add("error");
    return false;
  } else {
    errorField.innerHTML = "";
    field.classList.remove("error");
    return true;
  }
}

function checkLogin() {
  const loginRegex = /^[^ ]{2,20}$/;
  const errorField = document.getElementById("loginError");
  const field = document.getElementById("login");
  if (!checkField(field, loginRegex)) {
    createAlert(
      "erorr",
      "Enter a valid login! </br> The login must not contain spaces and must contain at least 2 characters"
    );
    field.classList.add("error");
    return false;
  } else {
    errorField.innerHTML = "";
    field.classList.remove("error");
    return true;
  }
}
function checkIfPasswordsAreEqual() {
  const pass = document.getElementById("password");
  const passRep = document.getElementById("passwordRepeat");
  const errorField = document.getElementById("passwordError");
  if (pass.value == passRep.value) {
    pass.classList.remove("error");
    passRep.classList.remove("error");
    errorField.innerHTML = "";
    return true;
  } else {
    pass.classList.add("error");
    errorField.innerHTML = "The passwords entered are not identical!";
    passRep.classList.add("error");
    return false;
  }
}
function isAllDataEntered(email, login, password, passwordRepeat) {
  if (
    checkIfDataIsEntered(email, "email") &&
    checkIfDataIsEntered(login, "login") &&
    checkIfDataIsEntered(password, "password") &&
    checkIfDataIsEntered(passwordRepeat, "repeat password")
  ) {
    return true;
  }
  return false;
}

function checkIfDataIsEntered(data, nazwaPola) {
  const dataValue = data.val();
  if (dataValue == "") {
    data.addClass("error");
    createAlert("warning", "Enter data in  " + nazwaPola + " field");
    return false;
  } else {
    data.removeClass("error");
    return true;
  }
}
