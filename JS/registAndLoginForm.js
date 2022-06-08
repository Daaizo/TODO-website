$(document).ready(function () {
    //przycisk login
    $("#login").click(function () {
        toggleBlurAndDisplayForm("block");
        $("#loginForm").css("display", "block");
        $("#registrationForm").css("display", "none");
    });
    $("#register").click(function () {
        toggleBlurAndDisplayForm("block");
        $("#registrationForm").css("display", "block");
        $("#loginForm").css("display", "none");
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


    $('#loginWithoutAccount').on('click', function () {
      
        location.href = "http://localhost/DanielCharlak/HTML/login.html";
    });


    function handleSubmit(){
        const currentUserName = document.getElementById('login').value;
        const currentUserPass = document.getElementById('password').value;
    
        sessionStorage.setItem("CURRENT USER NAME ",currentUserName);
        sessionStorage.setItem("PASS",currentUserPass);
    }

}
);

function toggleBlurAndDisplayForm(display) {
    $("#form").css("display", display);
    $(".parallax").toggleClass("blur");
}

function closeFormIfClickedOutsideIt(event) {
    var form = document.getElementById("form");// z $ nie działa ?
    if (event.target == form) {
        toggleBlurAndDisplayForm("none");
    }
};
