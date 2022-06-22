
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://jsonplaceholder.typicode.com/comments/")
        .then(response => response.json())
        .then(json => printData(json))
        .catch(console.error("Loading comments failed"));
});

function printData(json) {
    var list = json;
    var commenstArea = document.getElementById("comments");
    var str = "";
    if (list === null) commenstArea.innerHTML = str + "<tr><td>There is no comments </td></tr>";
    else {
        //list.lenght - all comments, 20 because there is like 500 of them(that is site with random json data)
        for (i = 0; i < 20; i++) {
            str += "\n<span class='comment'>";
            str += "<table><tbody><tr><td id='tableTitle' colspan='2'>Comment Id  " + (i + 1) + "</td></tr>";
            str += "<tr><td> Email </td><td>" + list[i].email + "  " + "</td></tr>";
            str += "<tr><td> Title </td><td>" + list[i].name + "</td></tr>";
            str += "<tr><td colspan='2' id='largeTd'>" + list[i].body + "</td></tr></tbody></table>";
            str += "\n</span>";
        }
        $("#comments").slick('slickAdd', str);
    }
    return false;
}

