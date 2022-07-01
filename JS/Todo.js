class Todo {
  static emptyListText =
    "<span class='bigText spannedRow'>There is nothing here ... Add a new TODO!";
  constructor(login) {
    this.setUserLogin(login);
  }

  setUserLogin(login) {
    if (login == null) {
      this.userLogin = "tempUser";
    } else {
      this.userLogin = login;
    }
  }

  addTODOtoStorage(data) {
    var list = getLocalStorageWithTodos();
    if (list == null || list.length == 0) {
      list = [];
      data.id = 0;
    } else data.id = list[list.length - 1].id + 1;
    list.push(data);
    updateLocalStorageWithTodos(list);
    createAlert("success", "The new TODO has been successfully saved");
  }
  getUserTodos() {
    var lista = getLocalStorageWithTodos();
    var userTodos = [];
    if (lista != null) {
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].userLogin == this.userLogin) {
          userTodos.push(lista[i]);
        }
      }
    }
    return userTodos;
  }

  removoAllUserTODOsfromStorage() {
    var list = getLocalStorageWithTodos();
    for (let i = 0; i < list.length; i++) {
      if (list[i].userLogin == this.userLogin) {
        if (list.length != 1) {
          list.splice(i, 1);
          i = 0;
        } else list.pop();
      }
    }
    updateLocalStorageWithTodos(list);
  }
  dislayUserTodos() {
    var lista = this.getUserTodos();
    var el = $("#todos");
    var str = "";
    if (lista == null || lista.length == 0) {
      el.html(str + Todo.emptyListText);
      return;
    } else {
      for (let i = 0; i < lista.length; i++) {
        str += printTodo(lista[i]);
      }
      el.html(str);
    }
  }
  searchForTODO() {
    var todoList = this.getUserTodos();
    var input = $("#searchBar");
    var el = $("#todos");
    var finalHtmlString = "";
    if (todoList.length == 0 || input.val().length == 0) {
      //there is no todos or searchbar is empty
      this.dislayUserTodos();
      return false;
    }

    //replacing all special characters with \ ex."?" -> "/?
    //$&	inserts the whole match in .replace function
    var val = $("#searchBar")
      .val()
      .replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/gi, "\\$&");
    const regex = new RegExp(val, "gi");
    for (let i = 0; i < todoList.length; i++) {
      if (
        todoList[i].title.match(regex) ||
        regex.test(todoList[i].id) ||
        todoList[i].description.match(regex) ||
        todoList[i].type.match(regex) ||
        todoList[i].important.match(regex)
      ) {
        finalHtmlString += printTodo(todoList[i]);
      }
    }

    if (finalHtmlString == "")
      el.html("<span class='bigText spannedRow'> Nothing found </span> ");
    else {
      el.html(finalHtmlString);
      $(".todoText:contains(" + input.val() + ")").each(function () {
        $(this).html(
          $(this)
            .text()
            .replace(regex, `<span class="regexMarkedText">$&</span>`)
        );
      });
    }
  }
}
// constains non case sens  https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
  return function (elem) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

function getLocalStorageWithTodos() {
  return JSON.parse(localStorage.getItem("TODOs"));
}
function updateLocalStorageWithTodos(listOfTodos) {
  localStorage.setItem("TODOs", JSON.stringify(listOfTodos));
}
function findTodoWithId(id) {
  var listOfTodos = getLocalStorageWithTodos();
  var returnValue = {};
  for (let i = 0; i < listOfTodos.length; i++) {
    if (listOfTodos[i].id == id) {
      returnValue.todo = listOfTodos[i];
      returnValue.todoPos = i;
      return returnValue;
    }
  }
}

function editTODO(todoNumber) {
  var object = findTodoWithId(todoNumber);
  var todoToedit = object.todo;
  var htmlData =
    `<div style='width: 100%;text-align: left;'>
      <h1 class='bigText'> Edit TODO </h1>
      `+$("#addTodoTable").html() +
    `</div></br>
    <button class='submitButton' id='acceptEdit'
      onclick='saveEditedTODO(${object.todoPos})'> save edited todo
    </button>
    <button id='notAcceptEdit' class='cancelButton' onclick='hideFullScrAlert("#fullScrWraper")'>cancel</button>`;
  fullScreenAlert(htmlData, "#fullScrWraper");

  $(".todoTitle").val(todoToedit.title);
  $("#description").val(todoToedit.description);
  if (todoToedit.type == "Not very important")
    $("[name=TODOtype]")[0].checked = true;
  else $("input:radio[name=TODOtype]")[1].checked = true;
  changeCheckboxValue(String(todoToedit.important));
  createAlert(
    "info",
    "Correct the data or enter new data and press the green 'save edited data' button"
  );
}

function saveEditedTODO(i) {
  var lista = getLocalStorageWithTodos();
  lista[i].title = $("#title").val();
  lista[i].description = $("#description").val();
  var checkboxData = getCheckBoxData();
  if (checkboxData == null) checkboxData = "";
  lista[i].important = checkboxData;
  lista[i].type = checkRadio("TODOtype");
  updateLocalStorageWithTodos(lista);
  clearFields();
  hideFullScrAlert("#fullScrWraper");
  createAlert("success", "TODO number " + lista[i].id + " updated");
  const allTodos = new Todo(lista[i].userLogin);
  allTodos.dislayUserTodos();
  $("#searchBar").val("");
}
function changeCheckboxValue(important) {
  switch (important) {
    case "":
      break;
    case "#homework ":
      console.log("2");
      $("[name=TODOtype2]")[0].checked = true;
      break;
    case "#test ":
      $("[name=TODOtype2]")[1].checked = true;
      break;
    case "#homework #test ":
      $("[name=TODOtype2]")[0].checked = true;
      $("[name=TODOtype2]")[1].checked = true;
      break;
  }
}
function deleteTODO(todoNumber) {
  var object = findTodoWithId(todoNumber);
  var dane =
    `<span class='bigText'>Are you sure you want to delete TODO ?</span> <br>
    <button id='acceptDeletion' class='submitButton'
      onclick='confirmedDelete("${object.todoPos}")'>yes
    </button>
    <button id='notAcceptDeletion' class='cancelButton' onclick='hideFullScrAlert("#fullScrWraper")'>no</button>`;
  fullScreenAlert(dane, "#fullScrWraper");
}
function confirmedDelete(i) {
  var lista = getLocalStorageWithTodos();
  var allUserTOdos = new Todo(lista[i].userLogin);
  var number = lista[i].id;
  if (lista.length != 1) {
    lista.splice(i, 1);
  } else lista.pop();
  updateLocalStorageWithTodos(lista);
  hideFullScrAlert("#fullScrWraper");
  createAlert("success", "TODO number " + number + " deleted");
  allUserTOdos.dislayUserTodos();

}

function checkRadio(radioName) {
  var object = $("[name=" + radioName + "]");
  for (let i = 0; i < object.length; i++) {
    var choosen = object[i].checked;
    if (choosen) {
      return object[i].value;
    }
  }
  createAlert("warning", "Chose TODO type before adding!");
  return false;
}

function getCheckBoxData() {
  var data = "";
  var object = $('[name="TODOtype2"]');
  for (let i = 0; i < object.length; i++) {
    if (object[i].checked) data += object[i].value + " ";
  }
  return data;
}

function printTodo(lista) {
  var str = "<table class='todoRow'><tr id='last'><td><h5";
  if (lista.type == "Critical") str += " style='background-color:yellow'>";
  else str += ">";
  str += `
      TODO number  <span class="todoText bigText">${lista.id} </span> </h5>
      <span class='boxTODO' >
        <button onclick="deleteTODO(${lista.id})" class='cancelButton'> delete TODO</button>
        <button onclick="editTODO(${lista.id})">edit TODO</button>
      </span>
      </td>
      </tr>
      <tr>
        <td> Title : <span class='todoText'> ${lista.title}</span></td>
      </tr>
      <tr>
        <td> Description  :  <span class='todoText'>${lista.description} </span></td>
      </tr>
      <tr>
        <td> Todo type :  <span class='todoText'>${lista.type}</span></td>
      </tr>
      <tr><td> Tags :  <span class='todoText'>${lista.important}</span></td>
      </tr>
    </table>`;
  return str;
}
