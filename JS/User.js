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
