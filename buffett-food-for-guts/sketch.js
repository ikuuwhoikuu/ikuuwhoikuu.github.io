// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

// instance mode by Naoto Hieda

var yoff = 0;
var sc = 64;
var ck = 0;
var cn = 0;
var loading = false;
var start = false;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(0);

    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("canvas").animate({opacity: '0.05'}, 2000);
    }, 3000);
    loading = true;
  }

  sketch.draw = function () {
    sketch.background(255);

    // translate(width/2, height/2);
    sketch.textAlign(sketch.CENTER);
  
    if (loading) {
      if(ck < 255) {
        ck += 4;
      }
      else {
        loading = false;
        start = true;
      }
    }
    if (start) {
      if (sc < 500) {
        sc += 10;
      }
      if (ck > 0) {
        ck -= 20;
      } else if (cn < 255) {
        cn += 2;
      }
    }
    sketch.fill(0, ck);
    sketch.textSize(sc);
    sketch.text('BUFFET', sketch.width / 2, sketch.height / 2 + sc / 2);  
  }

};

var myp5 = new p5(s);