// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

// instance mode by Naoto Hieda

function Cell(sketch, pos, vel, r, c) {

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = sketch.createVector(sketch.random(100, sketch.width - 100), sketch.random(100, sketch.height - 100));
  }

  if (vel) {
    this.vel = vel.copy();
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.1);
  }

  this.r = r || 120;
  this.c = c || sketch.color(255, 100);

  this.clicked = function (x, y) {
    var d = sketch.dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.mitosis = function () {
    if (this.r < 5) return [];
    //this.pos.x += random(-this.r, this.r);
    var v = p5.Vector.random2D();
    v.mult(this.r * 0.1);
    var vi = v.copy();
    v.add(this.vel);

    var cell0 = new Cell(sketch, this.pos, v, this.r * 0.8, this.c);
    vi.mult(-1);
    vi.add(this.vel);
    var cell1 = new Cell(sketch, this.pos, vi, this.r * 0.8, this.c);
    return [cell0, cell1];
  }

  this.move = function () {
    var v = p5.Vector.random2D();
    v.mult(0.1 * this.r / 60);
    this.vel.add(v);
    // var vc = sketch.createVector(-this.pos.x + sketch.width / 2, -this.pos.y + sketch.height / 2);
    // vc.mult(0.0001);
    // this.vel.add(vc);
    this.pos.add(this.vel);
    this.vel.mult(0.9);
  }

  this.show = function () {
    sketch.noStroke();
    sketch.fill(this.c);
    sketch.ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }

}

var s = function (sketch) {

  var cells = [];

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    cells.push(new Cell(sketch));
    cells.push(new Cell(sketch));
    setTimeout(function () {
      $("#page").animate({ opacity: '0.95' }, 2000);
      $("canvas").animate({ opacity: '0.05' }, 2000);
    }, 3000);
  }

  sketch.draw = function () {
    sketch.background(0);
    if (cells.length < 500) {
      for (var i = cells.length - 1; i >= 0; i--) {
        if (sketch.random(1) > 0.95) {
          var c = cells[i].mitosis();
          for (var j in c)
            cells.push(c[j]);
          cells.splice(i, 1);
        }
      }
    }

    for (var i = 0; i < cells.length; i++) {
      cells[i].move();
      cells[i].show();
    }
  }
};

var myp5 = new p5(s);
