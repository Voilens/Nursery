// import "./index.scss";
$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
        $('body').toggleClass('lock');
    });
    //$('.header__menu').click(function(){
    //    $('.header__burger,.header__menu').removeClass('active');
    //    $('body').removeleClass('lock');
    //}); 
    
});