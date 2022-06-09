

$(document).ready(function () {

    $("#loginFrom").click(function () {
        toggleBlurAndDisplayForm("block");
        $("#loginForm").css("display", "block");
        $("#registrationForm").css("display", "none");

    });

    $("#registerForm").click(function () {
        toggleBlurAndDisplayForm("block");
        $("#registrationForm").css("display", "block");
        $("#loginForm").css("display", "none");
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
            console.log("dane sa wprowadzne ");


            if (checkEmail() && checkLogin() && checkPassword() && checkIfPasswordsAreEqual()
                //  && sprawdzBox("produkt") && sprawdzRadio("zaplata")
            ) {

                if (printDataFromRegister()) {
                    //jezeli uzytkownik zaakceptował wprowadzone dane to zarejestruj
                    var listOfUsers = JSON.parse(localStorage.getItem('listOfUsers'))
                    if (listOfUsers === null) listOfUsers = [];
                        var user  ={};
                        user.email = email.val();
                        user.login = login.val();
                        user.password = password.val();
                        listOfUsers.push(user); 
                        localStorage.setItem('listOfUsers', JSON.stringify(listOfUsers));
                         alert("Konto zostalo stworzone teraz sie mozesz zalogowac");
                  
                }

                else console.log("odrzucenie danych");
                return true;
            }
            return false;
        }

    })





});


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
