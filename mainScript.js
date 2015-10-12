// JavaScript source code
document.body.onload = function () {
    var page = window.location.toString().toLowerCase();
    if (page.indexOf('index') != -1) {
        var name = document.getElementById('city-input').value;
        if (name == "")
            name = "Minsk";
        getWeather(name, true);
    }
    if (page.indexOf('forecast') != -1) {
        var name = document.getElementById('city-inputF').value;
        if (name == "")
            name = "Minsk";
        getWeather(name, false);
    }
}