$('#cloudness').hide('fast');
$('#pressure').hide('fast');
$('#humidity').hide('fast');
getCurrentWeather();
var elem = document.getElementById('expandAndHide');
elem.onclick = function () {
    $('#cloudness').show('slow');
    $('#pressure').show('slow');
    $('#humidity').show('slow');
}
