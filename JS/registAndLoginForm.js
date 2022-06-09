

$(document).ready(function () {

    $("#loginFrom").click(function () {
        clearLoginForm();
        toggleBlurAndDisplayForm("block");
        $("#loginForm").css("display", "block");
        $("#registrationForm").css("display", "none");

    });

    $("#registerForm").click(function () {
        toggleBlurAndDisplayForm("block");
        $("#registrationForm").css("display", "block");
        $("#loginForm").css("display", "none");
        clearRegisterForm();
    });

    $('#loginWithoutAccount').on('click', function () {
        try {
            location.href = "http://localhost/DanielCharlak/HTML/login.html";
        }
        catch {
            console.alert("nie udało się przejść na stronę użytkownika");
        }
    });

    //klikniecie poza okno z fromularzem zamyka formularz
    $(window).click(function (event) {
        closeFormIfClickedOutsideIt(event);
    });

    $(".close").click(function () {
        toggleBlurAndDisplayForm("none");
    });
    $(".cancelButton").click(function () {
        toggleBlurAndDisplayForm("none");
    });

    $("#registerButton").click(function () {
        //zbieranie danych z pól - mimo tego ze są required podwóje sprawdzenie
        const email = $('#email');
        const login = $('#login');
        const password = $('#password');
        const passwordRepeat = $('#passwordRepeat');

        if (isAllDataEntered(email, login, password, passwordRepeat)) {
            //if (checkEmail() && checkLogin() && checkPassword() && checkIfPasswordsAreEqual()) {
            if (checkEmail() && checkLogin() && checkIfPasswordsAreEqual()) {
                if (printDataFromRegister()) {
                    //jezeli uzytkownik zaakceptował wprowadzone dane to zarejestruj
                    if (User.checkIfLoginIsUnique(login.val())) {

                        const user = new User(login.val(), email.val(), password.val());
                        user.addUserToStorage();
                        toggleBlurAndDisplayForm("none");
                    }
                }
                else console.log("odrzucenie danych");
            }
        }
    })
    $("#sprawdz").click(function () {
        const login = $('#log');
        const password = $('#loginPas');
        console.log(login + login.val());
        console.log(User.checkIfUserExists(login.val(), password.val()));
    });

});

function a() {
    const login = $('#log');
    const password = $('#loginPas');
    return User.checkIfUserExists(login.val(), password.val());

}
function clearLoginForm() {
    $('#log').val("");
    $('#loginPas').val("");
}
function clearRegisterForm() {
    $(".formContent h5").text("");

    $('#email').val("");
    $('#login').val("");
    $('#password').val("");
    $('#passwordRepeat').val("");
    $('#email').removeClass("error");
    $('#login').removeClass("error");
    $('#password').removeClass("error");
    $('#passwordRepeat').removeClass("error");
}
function toggleBlurAndDisplayForm(display) {
    $("#form").css("display", display);
    $(".parallax").toggleClass("blur");
}

function closeFormIfClickedOutsideIt(event) {
    try {
        var form = document.getElementById("form");// z $ nie działa ?
        if (event.target == form) {
            toggleBlurAndDisplayForm("none");
        }
    }
    catch {
        console.alert("nie udało się zrobić efektu rozmazania");
    }
}
