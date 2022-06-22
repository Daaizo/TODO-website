

$(document).ready(function () {
  $("#myTodo").toggleClass("navivagionHoverLook");
  const passedParams = (new URL(document.location)).searchParams;
  var login = passedParams.get('log');  // nazwy musza sie zgadzac z tymi, ktore sa w formularzy wysylajacym dane
  if (login == null) {
    document.getElementById('welcomeText').innerHTML = "Hello you can try all features but they will not be assigned to your account! If you want them to be saved, you need to register. ";
  } else {
    document.getElementById('welcomeText').innerHTML = "Hello " + login + " !";
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
    alert("All todos removed");
  });
  $("#s").click(function () {
    searchForTODO(data.userLogin);
  });
});
function removoAllTODOsfromStorage(login) {
  var list = JSON.parse(localStorage.getItem('TODOs'));
  for (let i = 0; i < list.length; i++) {
    if (list[i].userLogin == login) {
      if (list.length != 1) {
        list.splice(i, 1);
        i = 0;
      }
      else list.pop();
    }
  }
  localStorage.setItem("TODOs", JSON.stringify(list));
}
function editTODO(i) {
  var list = JSON.parse(localStorage.getItem('TODOs'));
  $(".todoTitle").val(list[i].title);
  document.getElementById("description").value = (list[i].description) + "";
  alert("Correct the data or enter new data and press the green 'save edited data' button");
  $("#displayTODOs").click();


}
function displayTODOs(login) {
  var lista = JSON.parse(localStorage.getItem('TODOs'));
  var el = document.getElementById('tresc');
  var str = "";
  if (lista == null) el.innerHTML = str + "<tr><td>There is nothing here ... Add a new TODO!</td></tr>";
  else {
    for (i = 0; i < lista.length; i++) {
      if (lista[i].userLogin == login) {
        if (lista[i].type == "Priority") str += "<tr id='last'><td><h5 style='background-color:yellow'>";
        else str += "<tr id='last'><td><h5>"
        str += "TODO id " + (i) + " </h5><span class='boxTODO' >  <button onclick='deleteTODO(" + i + ")' class='cancelButton'> delete TODO</button> "
          + "  <button onclick='editTODO(" + i + ")'>edit TODO</button> " +
          "  <button onclick='saveEditedTODO(" + i + ")' id='editButton" + i + "' class='submitButton'> save edited todo</button></span></td></tr>";
        str += "<tr><td  > Title : " + lista[i].title + "</td></tr>";
        str += "<tr ><td> Description  : " + lista[i].description + "</td></tr>";

        str += "<tr><td> Todo type : " + lista[i].type + "</td></tr>";
        str += "<tr><td> Tags : " + lista[i].important + "</td></tr>";
      }
    }
    if (str == "") el.innerHTML = "There is nothing here ... Add a new TODO!";
    else el.innerHTML = str;
  }

}

function saveEditedTODO(i) {
  if (confirm("Zapisać edytowane dane dotyczące TODO o id=  " + i + "?")) {
    var lista = JSON.parse(localStorage.getItem("TODOs"));
    lista[i].title = document.getElementById("title").value;
    lista[i].description = document.getElementById("description").value;
    var checkboxData = getCheckBoxData();
    if (checkboxData == null) checkboxData = "brak";
    lista[i].important = checkboxData;
    lista[i].type = checkRadio("TODOtype");

    localStorage.setItem("TODOs", JSON.stringify(lista));
    $("#displayTODOs").click();
  }
  clearFields();
}
function deleteTODO(i) {
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  if ((confirm("Delete TODO nr" + (i) + " ?"))) {
    if (lista.length != 1) {
      lista.splice(i, 1);
    }
    else lista.pop();
    localStorage.setItem("TODOs", JSON.stringify(lista));
    $("#displayTODOs").click();

  }

}
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  const TODOtype = document.getElementsByName('TODOtype');
  TODOtype.checked = false;
  $("#homework").removeAttr("checked");
  $("#test").removeAttr("checked");

}
function searchForTODO(login) {
  var el = document.getElementById('tresc');
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  if (lista == null) {
    el.innerHTML = "<tr><td>There is nothing here ... Add a new TODO!</td></tr>";
    return false;
  }

  var input = document.getElementById("s").value;
  var str = "";
  const regex = new RegExp(input); // testujemy wyrazenie dla /(to co wpisalismy)/ 
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].userLogin == login) {
      if ((regex.test(lista[i].title)) || (regex.test(lista[i].description))) {
        str += "<tr><td><h4>TODO id " + (i) + "   <button onclick='deleteTODO(" + i + ")'> usun TODO</button> "
          + "  <button onclick='editTODO(" + i + ")'> edytuj TODO</button>" +
          "  <button onclick='saveEditedTODO(" + i + ")' id='editButton" + i + "' style='visibility :hidden'> zapisz edytowane todo</button></h4></td></tr>";
        str += "<tr><td> Tytuł :</td><td> " + lista[i].title + "</td></tr>";
        str += "<tr><td> Opis  :</td><td>" + lista[i].description + "</td></tr>";
      }
    }
  }
  console.log(str);
  if (str == "") el.innerHTML = "Nic tu nie ma .. Dodaj nowe TODO ! ";
  else el.innerHTML = str;


  document.getElementById("s").value = "";
}

function checkRadio(radioName) {
  var object = document.getElementsByName(radioName);
  for (i = 0; i < object.length; i++) {
    choosen = object[i].checked;
    if (choosen) {
      return object[i].value;
    }
  }
  //TODO zamienić na alert z nowej klasy 
  alert("Wybierz typ TODO przez dodaniem !");

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
