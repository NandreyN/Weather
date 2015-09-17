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
        var bimage = 'Background_Pictures/' + object['weather']['0'].icon + ".jpg"
        var elemCollection = document.getElementsByClassName('background-image');
        for (var i = 0; i < elemCollection.length; i++) {
            elemCollection[i].style.backgroundImage = "url('" + bimage + "')";
        }

        var getAdditionalProps = function (mainBlock, propNames) { // block name and dictionary with props
            var string = "";
            for (prop in propNames)
                string += prop + ": " + object[mainBlock.toString()][(prop).toLowerCase()].toString() + propNames[prop] + '\n';
            return string;
        }

        var buildWeatherBody = function () {
            var weatherBody = document.getElementById('weather-body');
            weatherBody.innerText = fromKelvinToFarengeit(object['main']['temp']) + " °C\t\t";
            weatherBody.style.fontStyle = 'italic';
            weatherBody.style.fontSize = '30px';
        }

        buildWeatherBody();
        document.getElementById('weather-picture').src = "Weather_Pictures/" + object['weather']['0'].icon + ".png";
        document.getElementById('wdesc').innerText = object['weather'][0].description;
        document.getElementById('info').innerText = getAdditionalProps("main", { "Pressure": "\thPa", "Humidity": "\t%" });

        $('#panel').show(1000);
    }
    x.onerror = function () {
        console.log("Error" + x.responseText)
        $('#panel').show('slow');
    }
    x.send(null);
}