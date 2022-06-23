$(document).ready(function () {
  $("#w").click(() => {
    createAlert("info", "some information");
  });
  $("#inf").click(() => {
    createAlert("success", "some success");
  });
  $("#s").click(() => {
    createAlert("", "some warning");
  });
  $(".jd #closeAll ").click(() => {
    $("#alerts").fadeOut("slow", function () {});
  });
  $("#alerts").on("click", ".closebtn", function () {
    hideAlert();
  });
});

function createAlert(alertType, alertText) {
  var alertHeader;
  switch (alertType) {
    case "info": {
      alertHeader = "Warning!";
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

  setTimeout(function () {
    // alert auto close
    hideAlert();
  }, 3500);
}
function hideAlert() {
  $("#alerts").fadeOut(1000, function () {});
}
