window.AudioContext = window.AudioContext || window.webkitAudioContext;
var globalCtx;
var globalData;
var globalBuffer;
var timer, noteCount, counting, accentPitch = 380, offBeatPitch = 200;
var delta = 0;
var tempo = localStorage.getItem("tempo");

// Load up dots on pageload
$("document").ready(function() {
  getData();
  setTempos();
$(".ts-top").trigger("change");
});

function setTempos() {
  var otemp = localStorage.getItem("tempo");
  if (otemp) {
    document.getElementById("calc_vals".innerHTML) = "Original Tempo: <span id='otemp'> 60%: <span id='60temp'></span>, 70%: <span id='70temp'></span>, 85%: <span id='85temp'></span>";
    document.getElementById("otemp").innerHTML = otemp;
    document.getElementById("inputbpm").value = otemp;
    var temp60 = localStorage.getItem("60temp");
    document.getElementById("60temp").innerHTML = temp60;
    var temp70 = localStorage.getItem("70temp");
    document.getElementById("70temp").innerHTML = temp70;
    var temp85 = localStorage.getItem("85temp");
    document.getElementById("85temp").innerHTML = temp85;
  } else {
    document.getElementById("inputbpm").value = "60";
    var user_temp = localStorage.getItem("user_set_bpm");
    if (user_temp) {
      document.getElementById("inputbpm").value = user_temp;
    }
  }
}

/*
Scheduling Help by: https://www.html5rocks.com/en/tutorials/audio/scheduling/
*/
function schedule() {
  playSound();
timer = window.setTimeout(schedule, 1000 * 60.0 / parseInt($(".bpm-input").val(), 10));
localStorage.setItem("user_set_bpm", parseInt($(".bpm-input")));
}

function playSound() {
  if (!globalBuffer) {
    globalCtx = new AudioContext();
    globalCtx.decodeAudioData(globalData, function(buffer) {
      globalBuffer = buffer;
      playNote(globalCtx);
    }, onerror);
  } else {
    playNote(globalCtx);
  }
}

function getData() {
  var request = new XMLHttpRequest();
  request.open('GET', 'block.wav', true);
  request.responseType = 'arraybuffer';

  request.onerror = function() {
    alert("error loading :(");
  };

  // Decode asynchronously
  request.onload = function() {
    globalData = request.response;
  }
  request.send();
}

/* Play note on a delayed interval of t ! */
function playNote(context) {
  note = context.createBufferSource();
  note.buffer = globalBuffer;

  if(noteCount >= parseInt($(".ts-top").val(), 10) )
    noteCount = 0;

  note.connect(context.destination);
  note.start(0,0,0.05);

  $(".counter .dot").attr("style", "");

  $(".counter .dot").eq(noteCount).css({
    transform: "translateY(-10px)",
    background: "#F75454"
  });
  noteCount++;
}

function countDown() {
  var t = $(".timer");

  if( parseInt(t.val(), 10) > 0 && counting === true)
  {
      t.val( parseInt(t.val(), 10) - 1 );
      window.setTimeout(countDown, 1000);
  }
  else
  {
    t.val(60);
  }
}

/* Tap tempo */
$(".tap-btn").click(function() {
  var d = new Date();
  var temp = parseInt(d.getTime(), 10);

  $(".bpm-input").val( Math.ceil(60000 / (temp - delta)) );
  delta = temp;
});

/* Add or subtract bpm */
$(".bpm-minus, .bpm-plus").click(function() {
if($(this).hasClass("bpm-minus"))
  $(".bpm-input").val(parseInt($(".bpm-input").val(), 10) - 1 );
else
  $(".bpm-input").val(parseInt($(".bpm-input").val(), 10) + 1 );
});

/* Change pitches for tones in options */
$(".beat-range, .accent-range").change(function() {
  if($(this).hasClass("beat-range"))
    offBeatPitch = $(this).val();
  else
     accentPitch = $(this).val();
});

/* Activate dots for accents */
$(document).on("click", ".counter .dot", function() {
  $(this).toggleClass("active");
});

$(".options-btn").click(function() {
$(".options").toggleClass("options-active");
});

/* Add dots when time signature is changed */
$(".ts-top, .ts-bottom").on("change", function() {
  var _counter = $(".counter");
  _counter.html("");

  for(var i = 0; i < parseInt($(".ts-top").val(), 10); i++)
  {
    var temp = document.createElement("div");
    temp.className = "dot";

    if(i === 0)
      temp.className += " active";

    _counter.append( temp );
  }
});

/* Play and stop button */
$(".play-btn").click(function() {
if($(this).data("what") === "pause")
{
  // ====== Pause ====== //
  counting = false;
  window.clearInterval(timer);
  $(".counter .dot").attr("style", "");
  $(this).data("what", "play").attr("style","").text("Play");
}
else {
  // ====== Play ====== //
  
if( $("#timer-check").is(":checked") )
 {
   counting = true;
   countDown();
 }

  noteCount = parseInt($(".ts-top").val(), 10);
  schedule();

  $(this).data("what", "pause").css({
    background: "#F75454",
    color: "#FFF"
  }).text("Stop");
}
});