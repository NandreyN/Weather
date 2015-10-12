// JavaScript source code
$('#alert').hide();
$('#info').hide();
$('#danger').hide();
$('#warning').hide();
if (document.getElementById('expand_button') != null)
    document.getElementById('expand_button').onclick = function () {
        //id = 'info' -> formatted text;
        $('#expand_button').hide();
        $('#info').show('slow');
    }
if ($('#form') != null)
    $('#form').submit(function () {
        var cityName = document.getElementById('city-input').value;
        getWeather(cityName, false);
        return false;
    });
$('#formF').submit(function () {
    var cityName = document.getElementById('city-inputF').value;
    getWeather(cityName, name);
    return false;
});