var tempo = 60;
sessionStorage.setItem("tempo", tempo);

$(document).ready(function() {
    $("#more").click(function() {
      $('html, body').animate({
        scrollTop: $('#test').offset().top
      },1000); 
    });
  });