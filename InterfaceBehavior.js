// JavaScript source code
$(document).ready(function () {
    $('#alert').hide();
    $('#info').hide();
    $('#danger').hide();
    $('#warning').hide();

    if ($("#expand_button") != null) {
        $("#expand_button").click(function () {
            $('#expand_button').hide();
            $('#info').show('slow');
        });
    }

    if ($('#form') != null)
        $('#form').submit(function () {
            var cityName = $("#city-input").val();
            getWeather(cityName, false);
            return false;
        });
    $('#formF').submit(function () {
        var cityName = $("#city-inputF").val();
        getWeather(cityName, name);
        return false;
    });
});