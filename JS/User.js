class User {
  constructor(login, email, password) {
    this.login = login;
    this.email = email;
    this.password = password;
  }

  addUserToStorage() {
    const allUsers = getLocalStorage();
    var user = {};
    user.login = this.login;
    user.email = this.email;
    user.password = this.password;
    allUsers.push(user);
    updateLocalStorage(allUsers);
  }

  static checkIfUserExists(log, pass) {
    var allUsers = getLocalStorage();
    if (allUsers.length === 0) {
      createAlert(
        "warning",
        "Login or password does not match, please try again!"
      );
      return false;
    }
    return searchForUser(log, pass, allUsers);
  }

  static checkIfLoginIsUnique(log) {
    var allUsers = getLocalStorage();
    if (allUsers.length == 0) {
      return true;
    }
    for (i = 0; i < allUsers.length; i++) {
      if (allUsers[i].login == log) {
        createAlert(
          "error",
          "A user with the same login exists, select another login and try again"
        );
        return false;
      }
    }
    return true;
  }
}

function searchForUser(login, password, array) {
  var lista = array;
  if (lista == null) {
    return false;
  }
  for (i = 0; i < lista.length; i++) {
    if (lista[i].login == login) {
      if (lista[i].password == password) {
        return true;
      } else {
        createAlert(
          "warning",
          "Login or password does not match, please try again!"
        );
        return false;
      }
    }
  }
  createAlert("warning", "Login or password does not match, please try again!");
  return false;
}

function getLocalStorage() {
  try {
    var listOfUsers = JSON.parse(localStorage.getItem("listOfUsers"));
    if (listOfUsers === null) listOfUsers = [];
    return listOfUsers;
  } catch {
    console.error("failed to loadl local storage");
    return false;
  }
}
function updateLocalStorage(data) {
  try {
    localStorage.setItem("listOfUsers", JSON.stringify(data));
    createAlert(
      "success",
      "The account has been created and now you can log in."
    );
  } catch {
    createAlert("erorr", "Failed to create account.");
  }
}
function handleLogin() {
  const currentUserName = document.getElementById("login").value;
  const currentUserPass = document.getElementById("password").value;
  sessionStorage.setItem("CURRENT USER NAME ", currentUserName);
  sessionStorage.setItem("PASS", currentUserPass);
}
function getUserData(login) {
  var listOfUsers = getLocalStorage();
  for (i = 0; i < listOfUsers.length; i++) {
    if (listOfUsers[i].login == login) {
      return listOfUsers[i];
    }
  }
}
function getUserLogin() {
  const passedParams = new URL(document.location).searchParams;
  var login = passedParams.get("log");
  return login;
}
function printUserData(data) {
  if (data == null) {
    // trying site a a guest
    $("#accountDetailsDiv").html(
      "<h1 class='bigText'> No account has been created, you are trying the page as a guest. To get all funcionalities such as account management, register !</h1>"
    );
    return false;
  }
  const htmlTable = `
  <h1 class='bigText'>Account details</h1>
  <table id="accountDetailsTable">
    <tr>
      <td>Login :</td>
      <td>${data.login}</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td>${data.email}</td>
    </tr>
    <tr>
      <td>Password:</td>
      <td>${data.password}</td>
    </tr>

  </table>
  <div class="buttons">
    <button id="editAccountButton" onclick="editAccount()">Edit account details </button>
    <button id="deleteAccountButton" class="cancelButton" onclick="deleteAccount()">Delete account </button>
  </div>
      `;
  $("#accountDetailsDiv").html(htmlTable);
}
function deleteAccount() {
  var data = `<span class='bigText'>Are you sure you want to delete your account and all related data?</span> <br>
  <button class='submitButton' onclick='deleteAccountConfirmed()'>yes</button>
  <button class='cancelButton' onclick=' hideFullScrAlert("#fullScrWraper")'>no</button>`;
  fullScreenAlert(data, "#fullScrWraper");
}
function deleteAccountConfirmed() {
  const login = getUserLogin();
  removoAllUserTODOsfromStorage(login);
  list = getLocalStorage();
  for (let i = 0; i < list.length; i++) {
    if (list[i].login == login) {
      if (list.length != 1) {
        list.splice(i, 1);
      } else list.pop();
    }
  }
  localStorage.setItem("listOfUsers", JSON.stringify(list));
  createAlert("success", "Account deleted");
  setTimeout(function () {
    $("#logoutButton").click();
    // back to login site after some time
  }, 1000);
}

function editAccount() {
  var user = getUserData(getUserLogin());

  var htmlData = `
  <div style='width: 100%;text-align: left;'>
    <h1 class='bigText'> Edit Account </h1>
    <p>Please correct all fields with the correct data</p><br>
    <hr>
    <label for="email"><b>Email</b></label>
    <input type="text" value="${user.email}" name="email" id="email" required>
    <h6 id="emailError" class="errorText"></h6>
    <label for="login"><b>Login</b></label>
    <input type="text" value="${user.login}" name="login" id="login" required>
    <h6 id="loginError" class="errorText"></h6>
    <label for="password"><b>Password</b></label>
    <input type="password" value="${user.password}" name="psw" id="password" required>
    <h6 id="passwordError" class="errorText"></h6>
    <label for="passwordRepeat"><b>Repeat Password</b></label>
    <input type="password" value="${user.password}" name="psw-repeat" id="passwordRepeat" required>
    <br>
    <br>

  </div>
  <span class="buttons">
      <button class="cancelButton"   onclick=hideFullScrAlert("#fullScrWraper")>Cancel</button>
      <button class="submitButton" onclick=saveEditedAccount("${user.login}") >Save Edited data</button>
    </span>

`;
  fullScreenAlert(htmlData, "#fullScrWraper");

  createAlert(
    "info",
    "Correct the data or enter new data and press the green 'save edited data' button"
  );
}
function saveEditedAccount(oldLogin) {
  const email = $("#email");
  const login = $("#login");
  const password = $("#password");
  const passwordRepeat = $("#passwordRepeat");
  if (isAllDataEntered(email, login, password, passwordRepeat)) {
    if (
      checkEmail() &&
      checkLogin() &&
      checkPassword() &&
      checkIfPasswordsAreEqual()
    ) {
      if (User.checkIfLoginIsUnique(login.val())) {
        changeLoginInTodos(oldLogin, login.val());

        var listOfUser = getLocalStorage();
        for (let i = 0; i < listOfUser.length; i++) {
          if (listOfUser[i].login == oldLogin) {
            console.log("halo");
            listOfUser[i].login = login.val();
            listOfUser[i].email = email.val();
            listOfUser[i].password = password.val();
            updateLocalStorage(listOfUser);
            updateGetAndReload(login.val());
            hideFullScrAlert("#fullScrWraper");
            createAlert("success", "Account data updated");
            return;
          }
        }
      }
    }
  }
}

function changeLoginInTodos(oldLogin, newLogin) {
  var listOfTodos = JSON.parse(localStorage.getItem("TODOs"));
  for (let i = 0; i < listOfTodos.length; i++) {
    if (listOfTodos[i].userLogin == oldLogin) {
      listOfTodos[i].userLogin = newLogin;
    }
  }
  localStorage.setItem("TODOs", JSON.stringify(listOfTodos));
}
function updateGetAndReload(userLogin) {
  var params = new URLSearchParams(location.search);
params.set('log', userLogin);
window.location.search = params.toString();
}
