$(document).ready(function(){
    //przycisk login
    $("#login" ).click(function() {
           toggleBlurAndDisplayForm("block");
           $("#form").css("display","block");
      });
      //klikniecie poza okno z fromularzem zamyka formularz
      $(window).click(function(event) {closeFormIfClickedOutsideIt(event)});

    $(".close" ).click(function() {
        toggleBlurAndDisplayForm("none");
     });
     $(".cancelButton" ).click(function() {
        toggleBlurAndDisplayForm("none");
     });



     $("#loginWithoutAccount" ).click(function() {
        
        
   });







  }
);
function toggleBlurAndDisplayForm(display){
    $("#form").css("display",display);
    $(".parallax").toggleClass("blur");
}
  
function closeFormIfClickedOutsideIt(event){
    var form = document.getElementById("form");// z $ nie działa ?
    if(event.target == form ){
        toggleBlurAndDisplayForm("none");
    }
}

