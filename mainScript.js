// JavaScript source code
$(document).ready(function () {
    var page = window.location.toString().toLowerCase();
    if (page.indexOf('index') != -1) {
        var name = $("#city-input").val();
        if (name == "")
            name = "Minsk";
        getWeather(name, true);
    }
    if (page.indexOf('forecast') != -1) {
        var name = $("#city-inputF").val();
        if (name == "")
            name = "Minsk";
        getWeather(name, false);
    }
});