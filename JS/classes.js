class Todo {
    constructor(login) {
        this.storageName = "TODOs";
        this.setUserLogin(login);
    }

    setUserLogin(login) {
        if (login == null) {
            this.userLogin = "tempUser";
        } else {
            this.userLogin = login;
        }
    }


    addTODOtoStorage(data) {
        
        var list = JSON.parse(localStorage.getItem(this.storageName))
        if (list == null) list = [];
        list.push(data)
        localStorage.setItem(this.storageName, JSON.stringify(list));
    }
   
}




function addTODO() {

    if (login == null) login = "";
    var item = {};
    item.userLogin = login;
    item.title = document.getElementById("title").value;
    item.description = document.getElementById("description").value;
    // item.color = document.getElementById("color").value;
    // item.quantity = document.getElementById("quantity").value;
    alert("Pomyslnie zapisano nowe TODO ");
    displayTODOs();
    return item;
}





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
            alert("Login lub hasło się nie zgadza, spróbuj ponownie !");
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
                alert("Użytkownik o podanym loginie istnieje, wybierz inny login i spróbuj ponownie");
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
            }
            else {
                alert("Login lub hasło się nie zgadza, spróbuj ponownie !");
                return false;
            }
        }
    }
    alert("Login lub hasło się nie zgadza, spróbuj ponownie !");
    return false;
}

function getLocalStorage() {
    try {
        var listOfUsers = JSON.parse(localStorage.getItem('listOfUsers'))
        if (listOfUsers === null) listOfUsers = [];
        return listOfUsers;
    }
    catch {
        console.error("nie udalo sie pobrac local storage");
        return false;
    }

}
function updateLocalStorage(data) {
    try {
        localStorage.setItem('listOfUsers', JSON.stringify(data));
        alert("Konto zostalo stworzone teraz sie mozesz zalogowac");
    }
    catch {
        alert("Nie udało się stworzyć konta");
    }

}
function handleLogin() {
    const currentUserName = document.getElementById('login').value;
    const currentUserPass = document.getElementById('password').value;
    sessionStorage.setItem("CURRENT USER NAME ", currentUserName);
    sessionStorage.setItem("PASS", currentUserPass);
}
