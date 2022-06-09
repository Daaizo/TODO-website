function checkRegex() {
    if (checkPassword() && checkEmail() && checkLogin()
        //  && sprawdzBox("produkt") && sprawdzRadio("zaplata")
    ) {
        printDataFromRegister();
        return true;
    }
    return false;
}
function printDataFromRegister() {
    var dane = "Czy akctepujesz wprowadzone dane rejestracyjne:\n";
    dane += "Email: " + document.getElementById('email').value + "\n";
    dane += "Login: " + document.getElementById('login').value + "\n";
    dane += "Hasło: " + document.getElementById('password').value + "\n";

    //dane+="Produkty: "+zbierzDaneZCheckBox() +"\n";
    // dane+="Sposób zapłaty: "+zbierzDaneZRadio() +"\n";
    // dane+="Państwo: "+document.getElementById('panstwo').value +"\n";
    if (window.confirm(dane)) return true;
    else return false;
}

function zbierzDaneZRadio() {
    var dane = "";
    var obiekt = document.getElementsByName("zaplata");
    for (i = 0; i < obiekt.length; i++) {
        if (obiekt[i].checked) {
            dane += obiekt[i].value;
            return dane;
        }
    }
    return dane;

}
function zbierzDaneZCheckBox() {
    var dane = "";
    var obiekt = document.getElementsByName("produkt");
    for (i = 0; i < obiekt.length; i++) {
        if (obiekt[i].checked) dane += obiekt[i].value + " ";
    }
    return dane;
}
function checkField(field, regex) {
    if (!regex.test(field.value)) return (false);
    else return (true);
}

function sprawdzRadio(nazwa_radio) {
    var obiekt = document.getElementsByName(nazwa_radio);
    for (i = 0; i < obiekt.length; i++) {
        wybrany = obiekt[i].checked;
        if (wybrany) {
            document.getElementById("zaplata_error").innerHTML = "";
            return true;
        }
    }
    document.getElementById("zaplata_error").innerHTML = "Wybierz sposób zapłaty !";
    return false;
}

function sprawdzBox(boxName) {
    var obiekt = document.getElementsByName(boxName);
    for (i = 0; i < obiekt.length; i++) {
        wybrany = obiekt[i].checked;
        if (wybrany) {
            document.getElementById("produkt_error").innerHTML = "";
            return true;
        }
    }
    document.getElementById("produkt_error").innerHTML = "Wybierz produkt !";
    return false;
}



function checkPassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&%^*()_+])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    //CO NAJMNIEJ 1 duża litera, jeden znak specjalny, 1 liczba,1 mala litera , 6-20 znaków
    // https://rubular.com/r/gEmHAEm9wKr1Tj    <- regex checker

    const errorField = document.getElementById("passwordError");
    const field = document.getElementById("password");
    if (!checkField(field, passwordRegex)) {
        errorField.innerHTML = "Poprawne hasło powinno zawierać Co najmniej 1 dużą litere, jeden znak specjalny, 1 liczbę ,1 malą litere , 6-20 znaków";
        field.classList.add("error");
        return false;
    }
    else {
        console.log("poprawne haslo");
        errorField.innerHTML = "";
        field.classList.remove("error");
        return true;
    }
}

function checkEmail() {
    const emailRegex = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    const errorField = document.getElementById("emailError");
    const field = document.getElementById("email");
    if (!checkField(field, emailRegex)) {
        errorField.innerHTML = "Wpisz poprawny email!\n Email powininen zawierać znak @ i adres poczty np. jas@wp.pl";
        field.classList.add("error");
        return false;
    }
    else {
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
        errorField.innerHTML = "Wpisz poprawny login! Login nie może zawierać spacji!";
        field.classList.add("error");
        return false;
    }
    else {
        errorField.innerHTML = "";
        field.classList.remove("error");
        return true;
    }
}
function checkIfPasswordsAreEqual(){
    const pass = document.getElementById("password");
    const passRep = document.getElementById("passwordRepeat");
    const errorField = document.getElementById("passwordError");
    if(pass.value == passRep.value){
        pass.classList.remove("error");
        passRep.classList.remove("error");
        errorField.innerHTML = "";
        return true;

    }else{
        pass.classList.add("error");
        errorField.innerHTML = "Wprowadzone hasła nie są identyczne!";
        passRep.classList.add("error");
        return false;
    }
}
function isAllDataEntered(email, login, password, passwordRepeat) {
    if (checkIfDataIsEntered(email, "email") &&
        checkIfDataIsEntered(login, "login") &&
        checkIfDataIsEntered(password, "hasło") &&
        checkIfDataIsEntered(passwordRepeat, "powtórz hasło")
    ) {
        return true;
    }
    return false;
}

function checkIfDataIsEntered(data, nazwaPola) {
    const dataValue = data.val();
    if (dataValue == "") {
        data.addClass("error");
        alert("Wprowadz dane w pole " + nazwaPola);
        return false;
    }
    else {
        data.removeClass("error");
        return true;
    }
}