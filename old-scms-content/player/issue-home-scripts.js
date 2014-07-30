/*
* The Player issue homepage scripts
* By Quarkz (http://www.smogon.com/forums/members/quarkz.206020/) and Quinella (http://www.smogon.com/forums/members/quinella.195572/)
* Last update by Quarkz (30/07/2014)
*/

$(document).ready(function(){
var desktopClient = true;
$('#toggle').click(function(){
if(desktopClient){
$('<link>')
.attr('id', 'mobile')
.attr('rel', 'stylesheet')
.attr('type', 'text/css')
.attr('href', '/player/issue-home-mob.css')
.insertAfter($('#scripts'));
$('#desktop').remove();
$('.leftcolumn').css({position:"inherit", margin: "0px"});
desktopClient = false;
$('#toggle').text('Activate Desktop Client');
} else {
$('<link>')
.attr('id', 'desktop')
.attr('rel', 'stylesheet')
.attr('type', 'text/css')
.attr('href', '/player/issue-home.css')
.insertAfter($('#scripts'));
$('#mobile').remove();
desktopClient = true;
$('#toggle').text('Activate Mobile Client');
}
});
if(navigator.userAgent.match(/iPad|iPhone|iPod|Android|BlackBerry|webOS/i)){
$('#toggle').trigger('click');
$('.leftcolumn').css({position:"inherit", margin: "0px"});
} else {
$('#mobile').remove();
var $leftcolumn = $(".leftcolumn");
var $issuebacking = $("#issuebacking");
var spacing = $leftcolumn.offset().top - $issuebacking.offset().top;
var top = $leftcolumn.offset().top;
$(window).scroll(function(){
if ($(window).scrollTop() > $issuebacking.offset().top && desktopClient){
$leftcolumn.css({position:"fixed", top: spacing});
} else {
$leftcolumn.css({position:"inherit", margin: "0px"});
}
});
$('#toggle').text('Activate Mobile Client');
}
});