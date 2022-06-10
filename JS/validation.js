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

function checkField(field, regex) {
    if (!regex.test(field.value)) return (false);
    else return (true);
}



function checkPassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&%^*()_+])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    //CO NAJMNIEJ 1 duża litera, 1 znak specjalny, 1 liczba,1 mala litera , 6-20 znaków
    // ?=.* czy ta czesc jest poprawana i cokolwiek dalej np. ^(?=.*[A-Z]).{1,20}$ czy w calym napisie, ktory ma 1-20 znakow jest duza litera, jest true. nie ma false 
    // https://rubular.com/r/gEmHAEm9wKr1Tj    <- regex checker

    const errorField = document.getElementById("passwordError");
    const field = document.getElementById("password");
    if (!checkField(field, passwordRegex)) {
        errorField.innerHTML = "Wpisz poprawne hasło!</br> Hasło powinno zawierać Co najmniej 1 dużą litere, jeden znak specjalny, 1 liczbę ,1 malą litere , 6-20 znaków";
        field.classList.add("error");
        return false;
    }
    else {
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
        errorField.innerHTML = "Wpisz poprawny email!</br>Email powininen zawierać znak @ i adres poczty np. jas@wp.pl";
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
        errorField.innerHTML = "Wpisz poprawny login! </br> Login nie może zawierać spacji i musi zawierać przynajmniej 2 znaki";
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