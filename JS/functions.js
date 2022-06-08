$(document).ready(function(){

    // zmiana checboxa na zaznaczony wlacza klase
    $("#hamburgerCheckbox").change(function() {
      $(".navBar").toggleClass("showNavigation", this.chacked);
    
    });

  });

 