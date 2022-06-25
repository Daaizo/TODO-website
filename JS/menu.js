$(document).ready(function () {
  $("#addTodo").addClass("navivagionHoverLook"); // it opens first
  $("#addTodo").click(() => {
    showAddTodo();
    clearFields();
    $(".navBar").toggleClass("showNavigation", this.chacked);
    removeHoverFromNavBar();
    $("#addTodo").addClass("navivagionHoverLook");
  });
  $("#displayTODOs").click(() => {
    hideAddTodo();
    $(".navBar").toggleClass("showNavigation", this.chacked);
    removeHoverFromNavBar();
    $("#displayTODOs").addClass("navivagionHoverLook");
    displayTODOs(data.userLogin);
  });
  $("#myAccount").click(() => {
    removeHoverFromNavBar();
    $(".navBar").toggleClass("showNavigation", this.chacked);
    $("#myAccount").addClass("navivagionHoverLook");
  });
  $("#faq").click(() => {
    removeHoverFromNavBar();
    $(".navBar").toggleClass("showNavigation", this.chacked);
    $("#faq").addClass("navivagionHoverLook");
  });
  $("#logoutButton").click(() => {
    removeHoverFromNavBar();
    $(".navBar").toggleClass("showNavigation", this.chacked);
  });

  const passedParams = new URL(document.location).searchParams;
  var login = passedParams.get("log");
  if (login == null) {
    $("#welcomeText").html(
      "Hello guest you can try all features but they will not be assigned to your account! If you want them to be saved, you need to register. "
    );
    $("#logoutButton").text("Exit");
  } else {
    $("#welcomeText").html("Hello " + login + " !");
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
    todo.id = "";
    todo.userLogin = data.userLogin;
    todo.title = $("#title").val();
    todo.description = $("#description").val();
    var checkboxData = getCheckBoxData();
    if (checkboxData == null) checkboxData = "brak";
    todo.important = checkboxData;
    todo.type = checkRadio("TODOtype");
    data.addTODOtoStorage(todo);
    clearFields();
  });

  $("#deleteAllTODOs").click(function () {
    var dane =
      "<span class='bigText'>Are you sure you want to ALL TODOs ?</span> <br>";
    dane +=
      "<button id='acceptAllDeletion' class='submitButton'>yes</button><button id='notAcceptDeletion' class='cancelButton'>no</button>";
    fullScreenAlert(dane, "#fullScrWraper");
  });

  $("#s").click(function () {
    searchForTODO(data.userLogin);
  });

  $("#fullScrAlert").on("click", "#acceptAllDeletion", function () {
    removoAllTODOsfromStorage(data.userLogin);
    createAlert("info", "All todos removed");
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#notAcceptDeletion", function () {
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#acceptDeletion", function () {
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#notAcceptEdit", function () {
    hideFullScrAlert("#fullScrWraper");
  });
});

function removeHoverFromNavBar() {
  $("#addTodo").removeClass("navivagionHoverLook");
  $("#displayTODOs").removeClass("navivagionHoverLook");
  $("#myAccount").removeClass("navivagionHoverLook");
  $("#faq").removeClass("navivagionHoverLook");
}

function hideAddTodo() {
  $(".content").css("display", "none");
  $("#todosDiv").css("display", "flex");
}
function showAddTodo() {
  $(".content").css("display", "flex");
  $("#todosDiv").css("display", "none");
}
