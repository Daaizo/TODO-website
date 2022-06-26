$(document).ready(function () {
  $("#addTodo").addClass("navivagionHoverLook"); // it opens first
  $("#addTodo").click(() => {
    showContentAndHideElse(".content");
    clearFields();
    toggleHoverOnPressedButton("#addTodo");
  });
  $("#displayTODOs").click(() => {
    showContentAndHideElse("#todosDiv");
    toggleHoverOnPressedButton("#displayTODOs");
    displayTODOs(data.userLogin);
  });
  $("#myAccount").click(() => {
    showContentAndHideElse("#accountDetailsDiv");
    toggleHoverOnPressedButton("#myAccount");
    printUserData(getUserData(login));
  });
  $("#projectDetails").click(() => {
    showContentAndHideElse("#projectDetailsDiv");
    toggleHoverOnPressedButton("#projectDetails");
  });
  $("#logoutButton").click(() => {
    removeHoverFromNavBar();
    $(".navBar").toggleClass("showNavigation", this.chacked);
    window.location.href = 'https://daaizo.github.io/HTML-school-project/';
    return false;
  });

  $("#hamburgerCheckbox").change(() => {
    $(".navBar").toggleClass("showNavigation", this.chacked);
  });

  $("#saveTodo").click(() => {
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

  $("#deleteAllTODOs").click(() => {
    var dane =
      "<span class='bigText'>Are you sure you want to ALL TODOs ?</span> <br>";
    dane +=
      "<button id='acceptAllDeletion' class='submitButton'>yes</button><button id='notAcceptDeletion' class='cancelButton'>no</button>";
    fullScreenAlert(dane, "#fullScrWraper");
  });

  $("#s").click(() => {
    searchForTODO(data.userLogin);
  });

  $("#fullScrAlert").on("click", "#acceptAllDeletion", () => {
    removoAllUserTODOsfromStorage(data.userLogin);
    createAlert("info", "All todos removed");
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#notAcceptDeletion", () => {
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#acceptDeletion", () => {
    hideFullScrAlert("#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#notAcceptEdit", () => {
    hideFullScrAlert("#fullScrWraper");
  });

  //data passed with GET
  var login = getUserLogin();
  if (login == null) {
    $("#welcomeText").html(
      "Hello guest you can try all features but they will not be assigned to your account! If you want them to be saved, you need to register. "
    );
    $("#logoutButton").text("Exit");
  } else {
    $("#welcomeText").html("Hello " + login + " !");
  }
  const data = new Todo(login);
  ///
});

function clearFields() {
  $("#title").val("");
  $("#description").val("");
  $("#homework").removeAttr("checked");
  $("#test").removeAttr("checked");
  $("input[type=radio]").prop("checked", false);
  $("input[type=checkbox]").prop("checked", false);
}
function removeHoverFromNavBar() {
  $("#addTodo").removeClass("navivagionHoverLook");
  $("#displayTODOs").removeClass("navivagionHoverLook");
  $("#myAccount").removeClass("navivagionHoverLook");
  $("#projectDetails").removeClass("navivagionHoverLook");
}

function hideAll() {
  $(".content").css("display", "none");
  $("#todosDiv").css("display", "none");
  $("#accountDetailsDiv").css("display", "none");
  $("#projectDetailsDiv").css("display", "none");
}

function showContentAndHideElse(divNameOrId) {
  hideAll();
  switch (divNameOrId) {
    case ".content": {
      $(".content").css("display", "flex");
      break;
    }
    case "#todosDiv": {
      $("#todosDiv").css("display", "flex");
      break;
    }
    case "#accountDetailsDiv": {
      $("#accountDetailsDiv").css("display", "block");
      break;
    }
    case "#projectDetailsDiv": {
      $("#projectDetailsDiv").css("display", "flex");
      break;
    }
  }
}

function toggleHoverOnPressedButton(divNameOrId) {
  $(".navBar").toggleClass("showNavigation", this.chacked);
  removeHoverFromNavBar();
  $(divNameOrId).addClass("navivagionHoverLook");
}
