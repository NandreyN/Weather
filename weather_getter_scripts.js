function displayTemperature(temp) {
    var elem = document.getElementById('big_temperature');
    elem.textContent = temp;
}

function fromKelvinToFarengeit(temperature) {
    return Math.round(temperature - 273);
}

function getStringDay() {
    var dayNumber = new Date().getDay();
    var weekdays = new Array(7);
    weekdays[0] = "sunday";
    weekdays[1] = "monday";
    weekdays[2] = "tuesday";
    weekdays[3] = "wednesday";
    weekdays[4] = "thursday";
    weekdays[5] = "friday";
    weekdays[6] = "saturday";
    return weekdays[dayNumber];
}

function getCurrentWeather() {
    var x = new XMLHttpRequest();
    x.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Minsk", true);
    x.onload = function () {
        var object = JSON.parse(x.responseText);
        console.log(object);

        document.getElementById('city_name').textContent = object['name'];
        document.getElementById('weather_description').textContent = object['weather']['0'].description;
        document.getElementById('day').textContent = getStringDay();
        document.getElementById('humidity').textContent = 'humidity: ' + object['main']['humidity'] +  ' %';
        document.getElementById('pressure').textContent = 'pressure: ' + object['main']['pressure'] + ' hPa';
        document.getElementById('cloudness').textContent = 'cloudness: ' + object['clouds']['all'] + ' %';

        displayTemperature(fromKelvinToFarengeit(object['main']['temp']) + " °C");
        var img = new Image(80, 80);
        img.src = "Weather_Pictures/" + object['weather']['0'].icon + ".png";
        img.alt = "";
        img.align = 'left';
        document.getElementById('big_temperature').appendChild(img);
    }
    x.onerror = function () {
        console.log("Error" + x.responseText)
    }
    x.send(null);
}