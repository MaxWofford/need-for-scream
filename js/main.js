var volume, player, recognizing;
var volumeArray = [];
var fb = new Firebase("https://need-for-scream.firebaseio.com/");

var getVolume = function() {
  // Returns a smoothed microphone volum
  if (volumeArray.push(mic.getLevel()) > 120) {
    volumeArray.splice(0, 1);
  }
  var sum = 0;
  for (var i = 0; i < volumeArray.length; i++) {
    sum += volumeArray[i];
  }
  return sum / volumeArray.length;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  playerImage = loadImage("/img/player.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  player = createSprite(50, 50, 10, 5);
  player.addImage(playerImage);
  player.rotateToDirection = true;
  player.maxSpeed = 6;
  player.friction = .98;
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

//---------------------------
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.onend = reset;

recognition.onresult = function (event) {
  var interim_transcript = '';
  var final_transcript = '';

  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  console.log('f',final_transcript);
  console.log('i',interim_transcript);
  results = interim_transcript.split(' ')
  resultDiv = document.querySelector('#recognized-text')
  message = results[results.length - 1]
  if (message != '') {
    resultDiv.textContent = message
    resultDiv.style.fontSize = 200 / message.length + 'vw'
    console.log(resultDiv.style.width)
  }
};

function reset() {
  recognition.start();
}

recognition.start();
// ----------------------------

