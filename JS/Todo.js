class Todo {
  static emptyListText =
    "<span class='bigText' style='grid-column: 1/ span2;'>There is nothing here ... Add a new TODO!";
  constructor(login) {
    this.storageName = "TODOs";
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
    var list = JSON.parse(localStorage.getItem(this.storageName));
    if (list == null || list.length == 0) {
      list = [];
      data.id = 0;
    } else data.id = list[list.length - 1].id + 1;
    list.push(data);
    localStorage.setItem(this.storageName, JSON.stringify(list));
    createAlert("success", "The new TODO has been successfully saved");
  }
}
function removoAllUserTODOsfromStorage(login) {
  var list = JSON.parse(localStorage.getItem("TODOs"));
  for (let i = 0; i < list.length; i++) {
    if (list[i].userLogin == login) {
      if (list.length != 1) {
        list.splice(i, 1);
        i = 0;
      } else list.pop();
    }
  }
  localStorage.setItem("TODOs", JSON.stringify(list));
}

function displayTODOs(login) {
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  var el = document.getElementById("todos");
  var str = "";
  if (lista == null) el.innerHTML = str + Todo.emptyListText;
  else {
    for (i = 0; i < lista.length; i++) {
      if (lista[i].userLogin == login) {
        if (lista[i].type == "Critical")
          str +=
            "<table class='todoRow'><tr id='last'><td><h5 style='background-color:yellow'>";
        else str += "<table class='todoRow'><tr id='last'><td><h5>";
        str +=
          "TODO number " +
          lista[i].id +
          " </h5><span class='boxTODO' >  <button onclick='deleteTODO(" +
          i +
          ")' class='cancelButton'> delete TODO</button> " +
          "  <button onclick='editTODO(" +
          i +
          ")'>edit TODO</button> " +
          "</span></td></tr>";
        str +=
          "<tr><td> Title : <span class='todoText'>" +
          lista[i].title +
          "</span></td></tr>";
        str +=
          "<tr ><td> Description  :  <span class='todoText'>" +
          lista[i].description +
          "</span></td></tr>";

        str +=
          "<tr><td> Todo type :  <span class='todoText'>" +
          lista[i].type +
          "</span></td></tr>";
        str +=
          "<tr><td> Tags :  <span class='todoText'>" +
          lista[i].important +
          "</span></td></tr></table>";
      }
    }
    if (str == "") el.innerHTML = Todo.emptyListText;
    else el.innerHTML = str;
  }
}
function editTODO(i) {
  var htmlData =
    "<div style='width: 100%;text-align: left;'><h1 class='bigText'> Edit TODO </h1> " +
    $("#addTodoTable").html() +
    " </div></br><button class='submitButton' id='acceptEdit' onclick='saveEditedTODO(" +
    i +
    ")'>save edited todo</button> <button id='notAcceptEdit' class='cancelButton'>cancel</button>";
  fullScreenAlert(htmlData, "#fullScrWraper");
  var list = JSON.parse(localStorage.getItem("TODOs"));
  $(".todoTitle").val(list[i].title);
  $("#description").val(list[i].description);
  const todoType = checkRadio("TODOtype");
  console.log(checkRadio("TODOtype"));
  console.log(todoType);
  if (todoType == "Not very important") $("input:radio[name=TODOtype]")[0].checked = true;
  else $("input:radio[name=TODOtype]")[1].checked = true;

  createAlert(
    "info",
    "Correct the data or enter new data and press the green 'save edited data' button"
  );
}
function saveEditedTODO(i) {
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  lista[i].title = document.getElementById("title").value;
  lista[i].description = document.getElementById("description").value;
  var checkboxData = getCheckBoxData();
  if (checkboxData == null) checkboxData = "brak";
  lista[i].important = checkboxData;
  lista[i].type = checkRadio("TODOtype");
  localStorage.setItem("TODOs", JSON.stringify(lista));
  clearFields();
  displayTODOs(lista[i].userLogin);
  hideFullScrAlert("#fullScrWraper");
}
function deleteTODO(i) {
  var dane =
    "<span class='bigText'>Are you sure you want to delete TODO ?</span> <br>";
  dane +=
    "<button id='acceptDeletion' class='submitButton' onclick='confirmedDelete(" +
    i +
    ")'>yes</button><button id='notAcceptDeletion' class='cancelButton'>no</button>";
  fullScreenAlert(dane, "#fullScrWraper");
}
function confirmedDelete(i) {
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  var login = lista[i].userLogin;
  var number = lista[i].id;
  if (lista.length != 1) {
    lista.splice(i, 1);
  } else lista.pop();
  localStorage.setItem("TODOs", JSON.stringify(lista));
  createAlert("success", "TODO number " + number + " deleted");
  displayTODOs(login);
}

function searchForTODO(login) {
  var el = document.getElementById("tresc");
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  if (lista == null) {
    el.innerHTML =
      "<tr><td>There is nothing here ... Add a new TODO!</td></tr>";
    return false;
  }

  var input = document.getElementById("s").value;
  var str = "";
  const regex = new RegExp(input);
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].userLogin == login) {
      if (regex.test(lista[i].title) || regex.test(lista[i].description)) {
        str +=
          "<tr><td><h4>TODO id " +
          i +
          "   <button onclick='deleteTODO(" +
          i +
          ")'> usun TODO</button> " +
          "  <button onclick='editTODO(" +
          i +
          ")'> edytuj TODO</button>" +
          "  <button onclick='saveEditedTODO(" +
          i +
          ")' id='editButton" +
          i +
          "' style='visibility :hidden'> zapisz edytowane todo</button></h4></td></tr>";
        str += "<tr><td> Tytuł :</td><td> " + lista[i].title + "</td></tr>";
        str +=
          "<tr><td> Opis  :</td><td>" + lista[i].description + "</td></tr>";
      }
    }
  }
  if (str == "") el.innerHTML = "Nic tu nie ma .. Dodaj nowe TODO ! ";
  else el.innerHTML = str;

  document.getElementById("s").value = "";
}

function checkRadio(radioName) {
  var object = document.getElementsByName(radioName);
  for (i = 0; i < object.length; i++) {
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
  var object = document.getElementsByName("TODOtype2");
  for (i = 0; i < object.length; i++) {
    if (object[i].checked) data += object[i].value + " ";
  }
  return data;
}
