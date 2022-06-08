//Skrypt z Fetch API
//sprawdź czy DOM został załadowany:

document.addEventListener("DOMContentLoaded", function() {
    $(".slick-arrow").css("z-index","100");
    $(".slick-prev").css("z-index","100");
    $("#comments").css("width","100%");
    $("#comments").css("z-index","10");
    
	fetch("https://jsonplaceholder.typicode.com/comments/")
    .then(response => response.json())
    .then(json => printData(json));


    $('#loginWithoutAccount').on('click', function(){
       
        location.href("http://localhost/PROJEKT%20KOŃCOWY%20DANIEL%20CHARLAK/HTML/login.html")    
    })
    ;
   
   
});
function printData(json){
    console.log(json);
    var lista = json;
    var el=document.getElementById("comments");
    var str="";
    if (lista===null) el.innerHTML=str+"<tr><td>Brak danych </td></tr>";
    else {
        //lista.lenght - wszystkie komentarze ale jest ich 500 wieć tylko 20 pierwszych
        for(i=0;i<20;i++) {
            str+= "\n<span class='comment'>";

            str+= "<table><tbody><tr><td id='tableTitle' colspan='2'> Numer komentarza   "+ (i+1) +"</td></tr>";
            str+= "<tr><td> Email </td><td>" +lista[i].email +"  "+"</td></tr>";
            str+= "<tr><td> Tytuł </td><td>" +lista[i].name +"</td></tr>";
            str+= "<tr><td colspan='2'>" +lista[i].body +"</td></tr></tbody></table>";
             
            str+= "\n</span>";
           
        }
        $("#comments").slick('slickAdd', str);
       
    } 
 
}