$(document).ready(function () {
  $("#addTodo").addClass("navivagionHoverLook"); // it opens first
  $("#addTodo").click(() => {
    removeHoverFromNavBar();
    $("#addTodo").addClass("navivagionHoverLook");
  });
  $("#displayTODOs").click(() => {
    removeHoverFromNavBar();
    $("#displayTODOs").addClass("navivagionHoverLook");
   // $(".content").css(({ opacity:0 }));
  });
  $("#myAccount").click(() => {
    removeHoverFromNavBar();
    $("#myAccount").addClass("navivagionHoverLook");
  });
  $("#faq").click(() => {
    removeHoverFromNavBar();
    $("#faq").addClass("navivagionHoverLook");
  });
  $("#logoutButton").click(() => {
    removeHoverFromNavBar();
  });

  const passedParams = new URL(document.location).searchParams;
  var login = passedParams.get("log");
  if (login == null) {
    document.getElementById("welcomeText").innerHTML =
      "Hello guest you can try all features but they will not be assigned to your account! If you want them to be saved, you need to register. ";
    $("#logoutButton").text("Exit");
  } else {
    document.getElementById("welcomeText").innerHTML = "Hello " + login + " !";
  }

  const data = new Todo(login);
  $("#hamburgerCheckbox").change(function () {
    $(".navBar").toggleClass("showNavigation", this.chacked);
  });

  $("#saveTodo").click(function () {
    if (!checkRadio("TODOtype")) {
      return;
    }

    var todo = {};
    todo.userLogin = data.userLogin;
    todo.title = $("#title").val();
    todo.description = $("#description").val();
    var checkboxData = getCheckBoxData();
    if (checkboxData == null) checkboxData = "brak";
    todo.important = checkboxData;
    todo.type = checkRadio("TODOtype");
    data.addTODOtoStorage(todo);
    $("#displayTODOs").click();
    clearFields();
  });
  $("#displayTODOs").click(function () {
    displayTODOs(data.userLogin);
  });

  $("#deleteAllTODOs").click(function () {
    removoAllTODOsfromStorage(data.userLogin);
    $("#displayTODOs").click();
    createAlert("info", "All todos removed");
  });
  $("#s").click(function () {
    searchForTODO(data.userLogin);
  });
});

function removeHoverFromNavBar() {
  $("#addTodo").removeClass("navivagionHoverLook");
  $("#displayTODOs").removeClass("navivagionHoverLook");
  $("#myAccount").removeClass("navivagionHoverLook");
  $("#faq").removeClass("navivagionHoverLook");
}
