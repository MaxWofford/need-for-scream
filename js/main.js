var volume, player;
var volumeArray = [];
var fb = new Firebase("https://need-for-scream.firebaseio.com/");

var getVolume = function() {
  // Returns a smoothed microphone volum
  if (volumeArray.push(mic.getLevel()) > 20) {
    volumeArray.splice(0, 1);
  }
  var sum = 0;
  for (var i = 0; i < volumeArray.length; i++) {
    sum += volumeArray[i];
  }
  return sum / volumeArray.length;
}

function preload() {
  playerImage = loadImage("/img/player.png");
}

function setup() {
  createCanvas(500, 300);
  mic = new p5.AudioIn();
  mic.start();
  player = createSprite(width - 50, height - 50, 10, 5);
  player.addImage(playerImage);
  player.rotateToDirection = true;
  player.maxSpeed = 6;
  player.friction = .98;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.move = {
    forward: function(v) {
      player.addSpeed(v * player.maxSpeed, player.rotation);
    },
    left: function(v) {
      player.rotation -= v * 100;
    },
    right: function(v) {
      player.rotation += v * 100;
    }
  };
}

function draw() {
  background(0, 0, 100);
  drawSprites();
}

showInfo('info_start');



var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };
}



var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;




function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
}

function moveLeft() {
  if (final_span.innerHTML = 'left') {

  }
}

function moveForward() {
  if (final_span.innerHTML = 'forward') {

  }

}

function moveRight() {
  if (final_span.innerHTML = 'right') {

  }
}
