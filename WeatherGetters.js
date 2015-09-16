function fromKelvinToFarengeit(temperature) {
    return Math.round(temperature - 273);
}

function getCurrentWeather() {
    $('#panel').hide('fast');
    var x = new XMLHttpRequest();
    x.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Minsk", true);
    x.onload = function () {
        var object = JSON.parse(x.responseText);
        console.log(object);
        //document.getElementById('weather-heading').innerText = "Weather in " + object['name'].toString() + ":";
        // weather.o.icon
        document.getElementById('weather-picture').src = "Weather_Pictures/" + object['weather']['0'].icon + ".png";
        var weatherBody = document.getElementById('weather-body');
        weatherBody.innerText = fromKelvinToFarengeit(object['main']['temp']) + " °C\t\t";
        document.getElementById('wdesc').innerText = object['weather'][0].description;
        weatherBody.style.fontStyle = 'italic';
        weatherBody.style.fontSize = '30px';

        $('#panel').show(1000);
    }
    x.onerror = function () {
        console.log("Error" + x.responseText)
        $('#panel').show('slow');
    }
    x.send(null);
}