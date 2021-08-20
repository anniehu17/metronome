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
  // get the original tempo they entered
  var otemp = document.getElementById('otemp').value;
  // save the original tempo
  sessionStorage.setItem("tempo", otemp);

  // 60%
  var newtemp = Math.trunc(otemp * 0.6);
  // display 60%
  document.getElementById("60temp").value = newtemp;
  // store 60%
  sessionStorage.setItem("60temp", newtemp);

  // 70%
  var newtemp = Math.trunc(otemp * 0.7);
  // display 70%
  document.getElementById("70temp").value = newtemp;
  // store 70%
  sessionStorage.setItem("70temp", newtemp);

  // 85%
  var newtemp = Math.trunc(otemp * 0.85);
  // display 85%
  document.getElementById("85temp").value = newtemp;
  // store 85%
  sessionStorage.setItem("85temp", newtemp);
}