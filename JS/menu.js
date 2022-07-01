$(document).ready(function () {
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
   const allUserTodos = new Todo(login);

  $("#addTodoButton").click(() => {
    showContentAndHideElse(".content");
    clearFields();
    toggleHoverOnPressedButton("#addTodoButton");
  });
  $("#addTodoButton").click(); //homepage after login

  $("#displayTODOsButton").click(() => {
    showContentAndHideElse("#todosDiv");
    toggleHoverOnPressedButton("#displayTODOsButton");
    allUserTodos.dislayUserTodos();
  });
  $("#searchBar").keyup(() => {
    allUserTodos.searchForTODO();
  });
  $("#myAccountButton").click(() => {
    showContentAndHideElse("#accountDetailsDiv");
    toggleHoverOnPressedButton("#myAccountButton");
    printUserData(getUserData(login));
  });
  $("#projectDetailsButton").click(() => {
    showContentAndHideElse("#projectDetailsDiv");
    toggleHoverOnPressedButton("#projectDetailsButton");
    printProjectInfo();
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
      return false;
    }
    var todo = {};
    todo.id = "";
    todo.userLogin = allUserTodos.userLogin;
    todo.title = $("#title").val();
    todo.description = $("#description").val();
    var checkboxallUserTodos = getCheckBoxData();
    if (checkboxallUserTodos == null) checkboxallUserTodos = "brak";
    todo.important = checkboxallUserTodos;
    todo.type = checkRadio("TODOtype");
    allUserTodos.addTODOtoStorage(todo);
    clearFields();
  });

  $("#deleteAllTODOs").click(() => {
    var dane =
    `<span class='bigText'>Are you sure you want to ALL TODOs ?</span><br>
    <button id='acceptAllDeletion' class='submitButton'>yes</button>
    <button id='notAcceptDeletion' class='cancelButton' onclick='hideFullScrAlert("#fullScrWraper")'>no</button>`;
    fullScreenAlert(dane, "#fullScrWraper");
  });
  $("#fullScrAlert").on("click", "#acceptAllDeletion", () => {
    allUserTodos.removoAllUserTODOsfromStorage();
    createAlert("info", "All todos removed");
    hideFullScrAlert("#fullScrWraper");
  });

});

function printProjectInfo(){
  fetch('https://daaizo.github.io/HTML-school-project/projectInfo.html')
.then(response => {
    if (!response.ok) {
        throw new Error("Txt loading error " + response.status);
    }
    return response.text();
})
.then(text => {
    $("#projectDetailsDiv").html(text);
})
.catch(error => {
   createAlert("error", "Failed to load txt file, pls try again later");
});
}
function clearFields() {
  $("#title").val("");
  $("#description").val("");
  $("#homework").removeAttr("checked");
  $("#test").removeAttr("checked");
  $("input[type=radio]").prop("checked", false);
  $("input[type=checkbox]").prop("checked", false);
}
function removeHoverFromNavBar() {
  $("#addTodoButton").removeClass("navivagionHoverLook");
  $("#displayTODOsButton").removeClass("navivagionHoverLook");
  $("#myAccountButton").removeClass("navivagionHoverLook");
  $("#projectDetailsButton").removeClass("navivagionHoverLook");
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
      $("#projectDetailsDiv").css("display", "block");
      break;
    }
  }
}

function toggleHoverOnPressedButton(divNameOrId) {
  $(".navBar").toggleClass("showNavigation", this.chacked);
  removeHoverFromNavBar();
  $(divNameOrId).addClass("navivagionHoverLook");
}
