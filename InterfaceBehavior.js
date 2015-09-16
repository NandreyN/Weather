// JavaScript source code
$('#alert').hide();
$('#info').hide();
$('#danger').hide();
$('#warning').hide();
document.getElementById('expand_button').onclick = function () {
    //id = 'info' -> formatted text;
    $('#expand_button').hide();
    $('#info').show('slow');
}