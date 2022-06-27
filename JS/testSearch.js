$(document).ready(function () {
  var allUserTOdos = [];
  $("#seachSite").click(() => {
    allUserTOdos = allUserTodos("123");
  });
  $("#searchBar").keyup(() => {
    searchForTODO(allUserTOdos);
  });
});
function allUserTodos(login) {
  var lista = JSON.parse(localStorage.getItem("TODOs"));
  var userTodos = [];
  if (lista != null) {
    for (i = 0; i < lista.length; i++) {
      if (lista[i].userLogin == login) {
        userTodos.push(lista[i]);

      }
    }
  }
  return userTodos;
}
function searchForTODO(userTodos) {
  var input = $("#searchBar");
  var el = $("#tresc");
  var finalHtmlString = "";
  if (userTodos.length == 0 || input.val().length == 0) {
    console.log("puste nie maco szukac");
    for (i = 0; i < userTodos.length; i++) {
        finalHtmlString += printTodos(userTodos[i],i);
    }
    el.html(finalHtmlString);
    // todo sa wyswietlone
    return false;
  }


  const regex = new RegExp(input.val(),"i");
  var lista = userTodos;
  for (i = 0; i < lista.length; i++) {
    if (lista[i].title.match(regex) || lista[i].description.match(regex) || lista[i].type.match(regex) || lista[i].important.match(regex)) {
        finalHtmlString += printTodos(lista[i],i);
    }
  }

  if (finalHtmlString == "") el.html("nie znaleziono nic");
  else{
    el.html( markFoundRegex(finalHtmlString, input.val()));
  }
}
function markFoundRegex(finalHtmlString, textToMark){
  const regex = new RegExp(textToMark, "gi");
  finalHtmlString =  finalHtmlString.replace(regex, "<span class='regexMarkedText'>"+textToMark +"</span>");
  return finalHtmlString;
}
function printTodos(lista,i){
  var str = "<table class='todoRow'><tr id='last'><td>";
  if (lista.type == "Critical")str += "<h5 style='background-color:yellow'>";
  else str += "<h5>";
  str += `
    TODO number ${lista.id}  </h5>
    <span class='boxTODO' >
      <button onclick="deleteTODO(${i})" class='cancelButton'> delete TODO</button>
      <button onclick="editTODO(${i})">edit TODO</button>
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
    </tr>;
    <tr><td> Tags :  <span class='todoText'>${lista.important}</span></td>
    </tr>
  </table>`;
  return str;
}