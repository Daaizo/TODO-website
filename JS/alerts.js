function displayWarningAlert(alertText) {
  var div = document.getElementById("alerts");
  div.style.opacity = "0";
  var hmtlPosition = document.getElementById("alerts");
  var html =
    "<div class='alert success'><span class='closebtn' onclick='closeAlert()'>&times;</span> " +
    "<strong>Warning!</strong> " +
    alertText +
    "</div>";
  hmtlPosition.innerHTML = html;
}
function displayErrorAlert(alertText) {
  var div = document.getElementById("alerts");
  div.style.opacity = "0";
  var hmtlPosition = document.getElementById("alerts");
  var html =
    "<div class='alert success'><span class='closebtn' onclick='closeAlert()'>&times;</span> " +
    "<strong>Attention!</strong>" +
    alertText +
    "</div>";
  hmtlPosition.innerHTML = html;
}
function displaySuccessAlert(alertText) {
  var div = document.getElementById("alerts");
  div.style.opacity = "1";
  var hmtlPosition = document.getElementById("alerts");
  var html =
    "<div class='alert success'><span class='closebtn' onclick='closeAlert()'>&times;</span> " +
    "<strong>Success!</strong> " +
    alertText +
    "</div>";
  hmtlPosition.innerHTML = html;
}

function closeAlert() {
  var close = document.getElementsByClassName("closebtn");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = document.getElementById("alerts");
      div.style.opacity = "0";
      setTimeout(function () {
        div.style.display = "none";
      }, 600);
    };
  }
}
