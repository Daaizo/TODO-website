$(document).ready(function(){
    //przycisk login
    $("#login" ).click(function() {
            toggleBlurAndDisplayForm("block");
      });
      //klikniecie poza okno z fromularzem zamyka formularz
      $(window).click(function(event) {
       
        var form = document.getElementById("form");// z $ nie działa ?
        if(event.target == form ){
            toggleBlurAndDisplayForm("none");
        }
    });

    $(".close" ).click(function() {
        toggleBlurAndDisplayForm("none");
     });
     $(".cancelButton" ).click(function() {
        toggleBlurAndDisplayForm("none");
     });

  }
);
function toggleBlurAndDisplayForm(display){
    $("#form").css("display",display);
    $(".parallax").toggleClass("blur");

   
}
  

