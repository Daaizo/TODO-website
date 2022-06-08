// function saveUser(){
//     var item = {};
//     item.name = document.getElementById("name").value;
//     item.price = document.getElementById("price").value;
//     item.color = document.getElementById("color").value;
//     item.quantity = document.getElementById("quantity").value;
    
//     var lista = JSON.parse(localStorage.getItem('listaUzytkownikow'))
//     if (lista===null) lista=[]; 
//     lista.push(item); 

//     localStorage.setItem('listaProdutkow', JSON.stringify(lista));
//     alert("pomyslnie zapisano produkt");
//     displayProducts();
// }

// function displayProducts(){
//     var lista = JSON.parse(localStorage.getItem('listaProdutkow'));
//     var el=document.getElementById('tresc');
//     var str="<h2>Dane z localStorage - wszystkie produkty</h2>";
//     if (lista===null) el.innerHTML=str+"<tr><td>Pusta lista produktów </td></tr>";
//     else {
//         for(i=0;i<lista.length;i++) {
//             str+= "<tr><td><h4>Produkt nr "+ (i+1) + "   <button onclick='deleteProduct("+i+")'> usun produkt</button> "
//             + "  <button onclick='editProduct("+i+")'> edytuj produkt</button>" + 
//              "  <button onclick='saveEditedProduct("+i+")' id='editButton"+i+"' style='visibility :hidden'> zapisz edytowane dane</button></h4></td></tr>" ;
//             str+= "<tr><td> Nazwa produktu :</td><td> "+ lista[i].name +"</td></tr>";
//             str+= "<tr><td> Cena  :</td><td>" +lista[i].price + "</td></tr>";
//             str+= "<tr><td> Kolor :</td><td>" +lista[i].color +"</td></tr>";
//             str+= "<tr><td> Ilosc: </td><td>" +lista[i].quantity +"</td></tr>";
//             el.innerHTML=str;
//         }
//     }  
//     clearFields();
// }

// function deleteProducts(){
//     localStorage.removeItem('listaProdutkow');
//     displayProducts();
// }

// function deleteProduct(i){
//     var lista = JSON.parse(localStorage.getItem('listaProdutkow'));
//     if( (confirm("Usunąć produkt nr" + (i+1)+" ?")) ){
//         if (lista.length != 1){
//             lista.splice(i,1);
//             localStorage.setItem('listaProdutkow', JSON.stringify(lista));
//         } 
//         else deleteProducts();
//     }
    
//     displayProducts();
// }


// function editProduct(i){
//     if( confirm("Popraw dane i wciśnij przycisk 'zapisz edytowane dane'")){
//         var lista = JSON.parse(localStorage.getItem('listaProdutkow'));
//         document.getElementById("name").value =  (lista[i].name) + "";
//         document.getElementById("price").value =  (lista[i].price) + "";
//         document.getElementById("color").value =  (lista[i].color) ;
//         document.getElementById("quantity").value =  (lista[i].quantity) + "";
//         document.getElementById('editButton'+i).style.visibility= "visible";
//     }
// }
// function saveEditedProduct(i){
    


//     if(  confirm("Zapisać edytowane dane dotyczące produktu "+ (i+1) +"?")){
//         var lista = JSON.parse(localStorage.getItem('listaProdutkow'));
//         lista[i].name = document.getElementById("name").value;     
//         lista[i].price = document.getElementById("price").value;
//         lista[i].color = document.getElementById("color").value;
//         lista[i].quantity  = document.getElementById("quantity").value;
       
        
       
//         localStorage.setItem('listaProdutkow', JSON.stringify(lista));
//         displayProducts();
//     }
  
// }
// function clearFields(){
//     document.getElementById("name").value = "";
//     document.getElementById("price").value = "";
//     document.getElementById("color").value = "";
//     document.getElementById("quantity").val= "";
// }
// function searchForProduct(){
//     var el=document.getElementById('tresc');
//     var lista = JSON.parse(localStorage.getItem('listaProdutkow'));
//     if (lista==null) {
//         el.innerHTML="<h2>Dane z localStorage</h2> <tr><td>Pusta lista produktów </td></tr>";
//         return;
//     }
    
//     var input =  document.getElementById("searchBar").value;
//     var str="";
    

//     const regex = new RegExp(input); // testujemy wyrazenie dla /(to co wpisalismy)/ 
//     for(i=0;i<lista.length;i++) {
//         if(  (regex.test(lista[i].name)) || (regex.test(lista[i].price)) || (regex.test(lista[i].color)) || (regex.test(lista[i].color)) ){
                
//                     str+= "<tr><td><h4>Produkt nr "+ (i+1) + "   <button onclick='deleteProduct("+i+")'> usun produkt</button> "
//                     + "  <button onclick='editProduct("+i+")'> edytuj produkt</button>" + 
//                      "  <button onclick='saveEditedProduct("+i+")' id='editButton"+i+"' style='visibility :hidden'> zapisz edytowane dane</button></h4></td></tr>" ;
//                     str+= "<tr><td> Nazwa produktu :</td><td> "+ lista[i].name +"</td></tr>";
//                     str+= "<tr><td> Cena  :</td><td>" +lista[i].price + "</td></tr>";
//                     str+= "<tr><td> Kolor :</td><td>" +lista[i].color +"</td></tr>";
//                     str+= "<tr><td> Ilosc: </td><td>" +lista[i].quantity +"</td></tr>";
//             } 
//         }
        
//         if(str.length) el.innerHTML="<h2>Dane z localStorage</h2>" + str;
//         else el.innerHTML = "<h3>nie znaleziono żadnych produktów<h3>" ;
//         document.getElementById("searchBar").value = "";
//     }


 
window.addEventListener('load' , () => {
    //search params - funkcja ktora pozwala na pobranie parametrow wysłanych przez GET
    //new URL(document.location) - lokacja dokumentu, nie trzeba wpisywac recznie https://localhost/ itd.
    const passedParams = (new URL(document.location)).searchParams;
    const login = passedParams.get('login');  // nazwy musza sie zgadzac z tymi, ktore sa w formularzy wysylajacym dane
    const password = passedParams.get('password'); 
    const rember = passedParams.get("remember");
    console.log("rember" + rember);
    document.getElementById('login').innerHTML = login;
    document.getElementById('password').innerHTML = password;
})

