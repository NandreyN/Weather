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

        var getForecast = function ()
        {
            var req = new XMLHttpRequest();
            req.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Minsk", true);
            req.onload = function () {
                var forecast = JSON.parse(req.responseText);
                console.log(forecast);
            }
            req.onerror = function () {
                alert("error");
            }
            req.send(null);
        }

        var getBackgroundID = function () {
            var bimage = 'Background_Pictures/' + object['weather']['0'].icon + ".jpg"
            var elemCollection = document.getElementsByClassName('background-image');
            for (var i = 0; i < elemCollection.length; i++) {
                elemCollection[i].style.backgroundImage = "url('" + bimage + "')";
            }
            getForecast();
        }
        var currentWeatherScenario = function () {
            getBackgroundID();
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
            document.getElementById('info').innerText += "Wind speed: " + object['wind']['speed'] + "\tm/s\n";
            document.getElementById('info').innerText += "Cloudness: " + object['clouds']['all'] + "\t%\n";
            // do not forget += operator while getting properties from another @block@

            $('#panel').show(1000);
        }

        var page = window.location.toString().toLowerCase();
        var funcsList = { "bootstrapsite": currentWeatherScenario, "forecast": getBackgroundID };
        for (name in funcsList)
            if (page.indexOf(name) != -1) {
                funcsList[name]();
                return;
            }
    }
    x.onerror = function () {
        console.log("Error" + x.responseText)
        if (document.getElementById('panel') != null)
            $('#panel').show('slow');
    }
    x.send(null);
}