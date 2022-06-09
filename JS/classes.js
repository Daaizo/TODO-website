class User {
    constructor() {
        handleLogin();
        var data = {};
        data.name = document.getElementById("name").value;
        data.price = document.getElementById("price").value;
        data.color = document.getElementById("color").value;
        data.quantity = document.getElementById("quantity").value;

        this.login = login;
        this.email = email;
        this.password = password;
    }

    addUserToStorage() {
    }
        
    deleteUserFromStorage() {

    }
    checkIfThereIsStorageForUsers() {

    }
    


    //     function saveUser(){
    //     var item = {};
    //     item.name = document.getElementById("name").value;
    //     item.price = document.getElementById("price").value;
    //     item.color = document.getElementById("color").value;
    //     item.quantity = document.getElementById("quantity").value;

    //     var lista = JSON.parse(localStorage.getItem('listaUzytkownikow'))
    //     if (lista===null) lista=[]; 
    //     lista.push(item); 

    //     localStorage.setItem('listaProdutkow', JSON.stringify(lista));
    //     alert("pomyslnie zapisano produkt");
    //     displayProducts();
    // }
}
function handleLogin() {
    const currentUserName = document.getElementById('login').value;
    const currentUserPass = document.getElementById('password').value;
    sessionStorage.setItem("CURRENT USER NAME ", currentUserName);
    sessionStorage.setItem("PASS", currentUserPass);
}
class Todo {
    constructor(userLogin, title, description) {
        this.userLogin = userLogin;
        this.title = title;
        this.description = description;
    }


}