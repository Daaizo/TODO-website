$(document).ready(function () {

  // zmiana checboxa na zaznaczony wlacza klase
  $("#hamburgerCheckbox").change(function () {
    $(".navBar").toggleClass("showNavigation", this.chacked);
  });

});

const passedParams = (new URL(document.location)).searchParams;
var login = passedParams.get('log');

function addTODO() {


  if( login == null) login = "";
  var item = {};
  item.userLogin = login;
  item.title = document.getElementById("title").value;
  item.description = document.getElementById("description").value;
  // item.color = document.getElementById("color").value;
  // item.quantity = document.getElementById("quantity").value;

  var lista = JSON.parse(localStorage.getItem('temporaryTODO'))
  if (lista === null) lista = [];
  lista.push(item);

  localStorage.setItem('temporaryTODO', JSON.stringify(lista));
  alert("Pomyslnie zapisano nowe TODO ");
  displayTODOs();
}

function displayTODOs() {
  var lista = JSON.parse(localStorage.getItem('temporaryTODO'));
  var el = document.getElementById('tresc');
  var str = "<h2>Twoje listy zadan</h2>";
  if (lista === null) el.innerHTML = str + "<tr><td>Nic tu nie ma .. Dodaj nowe TODO ! </td></tr>";
  else {
    for (i = 0; i < lista.length; i++) {
      if(lista[i].userLogin == login){

      
      str += "<tr><td><h4>TODO nr " + (i + 1) + "   <button onclick='deleteProduct(" + i + ")'> usun TODO</button> "
        + "  <button onclick='editTODO(" + i + ")'> edytuj TODO</button>" +
        "  <button onclick='saveEditedTODO(" + i + ")' id='editButton" + i + "' style='visibility :hidden'> zapisz edytowane todo</button></h4></td></tr>";
      str += "<tr><td> Tytuł :</td><td> " + lista[i].title + "</td></tr>";
      str += "<tr><td> opis  :</td><td>" + lista[i].description + "</td></tr>";
      // str+= "<tr><td> Kolor :</td><td>" +lista[i].color +"</td></tr>";
      // str+= "<tr><td> Ilosc: </td><td>" +lista[i].quantity +"</td></tr>";
      el.innerHTML = str;
      }
    }
  }
  clearFields();
}

function deleteAllTODOs() {
  localStorage.removeItem('temporaryTODO');
  displayTODOs();
}

function deleteProduct(i) {
  var lista = JSON.parse(localStorage.getItem('temporaryTODO'));
  if ((confirm("Usunąć produkt nr" + (i + 1) + " ?"))) {
    if (lista.length != 1) {
      lista.splice(i, 1);
      localStorage.setItem('temporaryTODO', JSON.stringify(lista));
    }
    else deleteAllTODOs();
  }

  displayTODOs();
}


function editTODO(i) {
  if (confirm("Popraw dane i wciśnij przycisk 'zapisz edytowane todo'")) {
    var lista = JSON.parse(localStorage.getItem('temporaryTODO'));
    document.getElementById("title").value = (lista[i].title) + "";
    document.getElementById("description").value = (lista[i].description) + "";
    // document.getElementById("color").value =  (lista[i].color) ;
    // document.getElementById("quantity").value =  (lista[i].quantity) + "";
    document.getElementById('editButton' + i).style.visibility = "visible";
  }
}
function saveEditedTODO(i) {



  if (confirm("Zapisać edytowane dane dotyczące produktu " + (i + 1) + "?")) {
    var lista = JSON.parse(localStorage.getItem('temporaryTODO'));
    lista[i].title = document.getElementById("title").value;
    lista[i].description = document.getElementById("description").value;
    // lista[i].color = document.getElementById("color").value;
    // lista[i].quantity  = document.getElementById("quantity").value;



    localStorage.setItem('temporaryTODO', JSON.stringify(lista));
    displayTODOs();
  }

}
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

}
function searchForTODO() {
  var el = document.getElementById('tresc');
  var lista = JSON.parse(localStorage.getItem('temporaryTODO'));
  if (lista == null) {
    el.innerHTML = "<h2>Dane z localStorage</h2> <tr><td>Pusta lista todo.. </td></tr>";
    return;
  }

  var input = document.getElementById("searchBar").value;
  var str = "";


  const regex = new RegExp(input); // testujemy wyrazenie dla /(to co wpisalismy)/ 
  for (i = 0; i < lista.length; i++) {
    if ((regex.test(lista[i].title)) || (regex.test(lista[i].description))) {

      str += "<tr><td><h4>TODO nr " + (i + 1) + "   <button onclick='deleteProduct(" + i + ")'> usun TODO</button> "
        + "  <button onclick='editTODO(" + i + ")'> edytuj TODO</button>" +
        "  <button onclick='saveEditedTODO(" + i + ")' id='editButton" + i + "' style='visibility :hidden'> zapisz edytowane todo</button></h4></td></tr>";
      str += "<tr><td> Tytuł :</td><td> " + lista[i].title + "</td></tr>";
      str += "<tr><td> opis  :</td><td>" + lista[i].description + "</td></tr>";
      // str+= "<tr><td> Kolor :</td><td>" +lista[i].color +"</td></tr>";
      // str+= "<tr><td> Ilosc: </td><td>" +lista[i].quantity +"</td></tr>";
      el.innerHTML = str;
    }
  }

  if (str.length) el.innerHTML = "<h2>Twoje TODO</h2>" + str;
  else el.innerHTML = "<h3>Nic tu nie ma .. Dodaj nowe TODO !<h3>";
  document.getElementById("searchBar").value = "";
}

