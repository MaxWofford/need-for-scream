var volume, player;
var volumeArray = [];
var fb = new Firebase("https://need-for-scream.firebaseio.com/");

var getVolume = function() {
  // Returns a smoothed microphone volume
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
