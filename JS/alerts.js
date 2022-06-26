$(document).ready(function () {
  $("#alerts").on("click", ".closebtn", ()=> {
    hideAlert();
  });
});

function fullScreenAlert(alertHtml, contentToBlur) {
  $("#fullScrAlert").css("display", "block");
  $(contentToBlur).toggleClass("blur");
  $("#fullScrAlert").html(alertHtml);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}
function hideFullScrAlert(contentToShow) {
  $("#fullScrAlert").css("display", "none");
  $(contentToShow).toggleClass("blur");
}
function createAlert(alertType, alertText) {
  var alertHeader;
  switch (alertType) {
    case "info": {
      alertHeader = " ";
      break;
    }
    case "warning": {
      alertHeader = "Attention!";
      break;
    }
    case "success": {
      alertHeader = "Success!";
      break;
    }
    default: {
      alertType = "";
      alertHeader = "Error";
      break;
    }
  }
  $("#alerts")
    .html(`<div class='alert ${alertType}'><span class='closebtn' >&times;</span>
  <span class="alertHeader">${alertHeader}</span> ${alertText} </div> `);
  $("#alerts").show();
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  if (alertType != "") {
    // default red error
    setTimeout(function () {
      // alert auto close
      hideAlert();
    }, 3500);
  }
}

function hideAlert() {
  $("#alerts").fadeOut(200, function () {});
}
