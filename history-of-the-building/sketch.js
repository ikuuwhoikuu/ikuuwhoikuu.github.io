// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

// instance mode by Naoto Hieda

var angle = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("canvas").animate({opacity: '0.05'}, 2000);
    }, 3000);
  }

  sketch.draw = function () {
    sketch.background(0);
    angle = sketch.map(sketch.millis(), 0, 10000, sketch.TWO_PI*2, 0);
    sketch.noStroke();
    sketch.fill(255, 100);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.scale(4, 4);
    var len = 40;
    sketch.branch(40);
  }

  sketch.branch = function (len) {
    if (len > 10) {
      sketch.push();
      let a = angle * (1 - len / 400) * (1 - len / 400) * (1 - len / 400);
      a = sketch.floor(a / sketch.TWO_PI * 20) / 20 * sketch.TWO_PI;
      sketch.rotate(a);
      sketch.quad(0, 0, -3, -len/2, 0, -len, 3, -len/2);
      sketch.translate(0, -len);
      sketch.branch(len - 10);
      sketch.pop();

      if(len == 40) return;
      sketch.push();
      sketch.rotate(-a);
      sketch.quad(0, 0, -3, -len/2, 0, -len, 3, -len/2);
      sketch.translate(0, -len);
      sketch.branch(len - 10);
      sketch.pop();
    }
  }
};

var myp5 = new p5(s);
