// JavaScript source code
document.body.onload = function () {
    var name = document.getElementById('city-input').value;
    if (name == "")
        name = "Minsk";
    getWeather(name, true);
}