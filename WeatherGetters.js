function fromKelvinToFarengeit(temperature) {
    return Math.round(temperature - 273);
}

function getWeather(city) {
    $('#panel').hide('fast');
    var x = new XMLHttpRequest();
    x.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city, true);
    x.onload = function () {
        var object = JSON.parse(x.responseText);
        console.log(object);
        var getBackgroundID = function () {
            var bimage = 'Background_Pictures/' + object['weather']['0'].icon + ".jpg"
            var elemCollection = document.getElementsByClassName('background-image');
            for (var i = 0; i < elemCollection.length; i++) {
                elemCollection[i].style.backgroundImage = "url('" + bimage + "')";
            }
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
        var funcsList = { "bootstrapsite": [currentWeatherScenario], "forecast": [getBackgroundID, getForecast], "about": [getBackgroundID] };
        for (name in funcsList)
            if (page.indexOf(name) != -1) {
                for (var i = 0; i < funcsList[name].length; i++) {
                    funcsList[name][i]();
                }
            }
    }
    x.onerror = function () {
        console.log("Error" + x.responseText)
        if (document.getElementById('panel') != null)
            $('#panel').show('slow');
    }
    x.send(null);
}
function getForecast() {
    function devideForecast(forecastObject) {
        var lst = [];
        for (var i = 0; i < forecastObject["cnt"]; i += 8)
            lst.push(forecastObject['list'][i]);
        return lst;
    }
    function getDayName(day) {
        return { '0': "Sunday", '1': "Monday", "2": 'Tuesday', '3': "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" }[day];
    }
    function transformDateTimeString(str) {
        var d = new Date(str);
        return d.getDate().toString() + "." + d.getMonth() + "." + d.getFullYear() + " ( " + getDayName(d.getDay().toString()) + " ) ";
    }

    function constructBlocks(list) {
        function constructOneBlock(objectSample) {
            var panel = $('<div/>', { class: "panel panel-default", style: "width:40%; height:50%; margin-left:30%; margin-top:1%;" }).appendTo($('.forecast-container'));
            var panelBody = $('<div/>', { class: "panel-body" }).appendTo(panel);
            var media = $('<div/>', { class: "media" }).appendTo(panelBody);

            var mediaLeft = $('<div/>', { class: "media-left" }).appendTo(media);
            var path = 'Weather_Pictures/' + objectSample["weather"][0].icon + ".png";
            var img = $('<img/>', { class: "media-object", alt: "", src: path }).appendTo(mediaLeft);

            var mediaBody = $('<div/>', { class: "media-body" }).appendTo(media);
            var date = $('<h4/>', { class: "media-heading" }).html("\t " + "Date: " + transformDateTimeString(objectSample["dt_txt"])).appendTo(mediaBody);
            var wName = objectSample["weather"][0].description;
            var descStr = wName.charAt(0).toUpperCase() + wName.slice(1) + " ; " +
                fromKelvinToFarengeit(objectSample["main"]["temp"]) + " °C ; " +
                objectSample["main"]['pressure'] + " hPa ; " +
                objectSample['main']['humidity'] + " % humidity ; " +
                objectSample['clouds']['all'] + " % clouds ";
            var description = $('<p/>').html(descStr).appendTo(mediaBody);
        }
        for (var i = 0; i < list.length; i++)
            constructOneBlock(list[i]);
    }

    var req = new XMLHttpRequest();
    req.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Minsk", true);
    req.onload = function () {
        var forecast = JSON.parse(req.responseText);
        console.log(forecast);
        var list = devideForecast(forecast);
        constructBlocks(list);
    }
    req.onerror = function () {
        alert("error");
    }
    req.send(null);
}

