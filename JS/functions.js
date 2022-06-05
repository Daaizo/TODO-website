$(document).ready(function(){

    $("#hamburgerCheckbox").change(function() {
      $(".navBar").toggleClass("showNavigation", this.checked)
    }).change();
  });

 