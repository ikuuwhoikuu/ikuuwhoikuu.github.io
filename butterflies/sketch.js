// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

// instance mode by Naoto Hieda

var yoff = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(0);

    setTimeout(function() {
      $("iframe").animate({opacity: '0.95'}, 2000);
    }, 3000);
  }

  sketch.draw = function () {
    sketch.background(255, 5);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    //rotate(PI / 2);

    sketch.stroke(0);
    sketch.fill(0, 50);
    sketch.strokeWeight(1);

    var da = sketch.PI / 100;
    var dx = 0.05;

    var xoff = 0;
    for (let i = 0; i < 1; i++) {
      sketch.push();
      let l = sketch.width>sketch.height?sketch.height:sketch.width;
      let sc = l * sketch.map(i, 0, 2, 0.5, 1);
      sketch.scale(sc, sc);
      sketch.noStroke();
      sketch.beginShape();
      for (var a = 0; a <= sketch.TWO_PI; a += da) {
        let angle = a;
        var n = sketch.noise(xoff, yoff);
        var r = sketch.sin(2 * a) * sketch.map(n, 0, 1, 0.25, 1);
        if (0 <= a && a < sketch.PI / 2) angle += 0.2;
        else if (sketch.PI / 2 * 3 <= a && a < sketch.PI * 2) angle -= 0.2;
        else if (sketch.PI / 2 <= a && a < sketch.PI) { angle += 0.4; r *= 0.8; }
        else { angle -= 0.4; r *= 0.8; }
        var x = r * sketch.cos(angle);
        var y = r * sketch.sin(angle);
        if (a < sketch.PI) {
          xoff += dx;
        } else {
          xoff -= dx;
        }
        //point(x, y);
        sketch.vertex(x, y);
      }
      sketch.endShape();
      sketch.pop();
      yoff+=0.01;
    }
    yoff += 0.02;
  }

};

var myp5 = new p5(s);