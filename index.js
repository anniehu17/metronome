$(document).ready(function () {
  $("#more").click(function () {
    $('html, body').animate({
      scrollTop: $('#test').offset().top
    }, 1000);
  });
});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function calcTempos() {
  var otemp = document.getElementById('otemp').value;
  var newtemp = Math.trunc(otemp * 0.6);
  document.getElementById("60temp").value = newtemp;
  newtemp = Math.trunc(otemp * 0.7);
  document.getElementById("70temp").value = newtemp;
  newtemp = Math.trunc(otemp * 0.85);
  document.getElementById("85temp").value = newtemp;
  sessionStorage.setItem("tempo", otemp);
}