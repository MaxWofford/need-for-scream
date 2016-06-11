var volumeArray = [];
var fb = new Firebase("https://need-for-scream.firebaseio.com/");

var vol = function() {
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

function setup() {
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

}
