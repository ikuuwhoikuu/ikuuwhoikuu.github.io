// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle(sketch) {
  this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
  this.vel = sketch.createVector(0, 0);
  this.acc = sketch.createVector(0, 0);
  this.maxspeed = 4;

  this.prevPos = this.pos.copy();
  this.points = [];
  this.wrapped = false;

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.vel.mult(0.7);
    this.pos.z = this.acc.z * 55;
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    // print(vectors.length, x, y, cols, index, this.pos)
    var x = sketch.floor(this.pos.x / scl);
    var y = sketch.floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[(index+cols*rows)%(cols*rows)];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
    this.acc.z = force.x;
  }

  this.show = function() {
    this.updatePrev();
    // let v = this.points[this.points.length - 1].v;
    // sketch.point(v.x, v.y, v.z);
    for(let i = 0; i < this.points.length - 1; i++) {
      if(this.points[i+1].wrapped == false) {
        let v = this.points[i].v;
        sketch.point(v.x, v.y, v.z);
      }
    }
  }

  this.updatePrev = function(wrapped) {
    this.points = [];
    let n = 32;
    for(let i = 0; i < 32; i++) {
      let point = {
        v: null,
        wrapped: false
      }
      let v = this.pos.copy();
      if(this.wrapped == false) {
        // v.lerp(lastp.v, i / n);
        v.x = v.x * i / n + this.prevPos.x * (n-i) / n;
        v.y = v.y * i / n + this.prevPos.y * (n-i) / n;
      }

      let amp = (1-curP) * .5 + 0.1;
      v.x += sketch.randomGaussian() * amp * this.vel.x;
      v.y += sketch.randomGaussian() * amp * this.vel.y;

      point.v = v;
      this.points.push(point);
    }
    this.prevPos = this.pos.copy();

    while(this.points.length > 1000) {
      this.points.shift();
    }
    if(wrapped)
      this.wrapped = true;
    else
      this.wrapped = false;
  }

  this.edges = function() {
    if (this.pos.x > sketch.width) {
      this.pos.x = 0;
      this.updatePrev(true);
    }
    if (this.pos.x < 0) {
      this.pos.x = sketch.width;
      this.updatePrev(true);
    }
    if (this.pos.y > sketch.height) {
      this.pos.y = 0;
      this.updatePrev(true);
    }
    if (this.pos.y < 0) {
      this.pos.y = sketch.height;
      this.updatePrev(true);
    }

  }

}

// instance mode by Naoto Hieda

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;
var prevP = 0;
var curP = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.colorMode(sketch.RGB, 255);
    cols = sketch.floor(sketch.width / scl);
    rows = sketch.floor(sketch.height / scl);
    // fr = sketch.createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 50; i++) {
      particles[i] = new Particle(sketch);
    }

    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("canvas").animate({opacity: '0.05'}, 2000);
    }, 3000);
    sketch.background(0);
  }

  sketch.draw = function () {
    // sketch.background(0);
    sketch.blendMode(sketch.BLEND);
    // sketch.stroke(255);
    // sketch.fill(0, 100);
    // sketch.rect(0, 0, sketch.width, sketch.height);
    let p = 0;
    if(sketch.millis() * 0.00005 % 1 > 0.5) p = 1;
    if(p != prevP)
      sketch.background(0);
    prevP = p;
    curP = curP * 0.99 + 0.01 * p;

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var n0 = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI * 4;
        var n1 = sketch.atan2(y-rows/2, x-cols/2) - sketch.PI/2 - 0.2;
        var n = n0 * p + n1 * (1-p);
        var angle = n;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        if(flowfield[index] == null)
          flowfield[index] = sketch.createVector(0, 0);
        v.lerp(flowfield[index], 0.9);
        flowfield[index] = v;
        xoff += inc;
        sketch.stroke(0, 50);
      }
      yoff += inc;

      zoff += 0.0003;
    }

    // sketch.rotateX(sketch.PI/6);
    // sketch.translate(sketch.width/2, sketch.height/2);
    // sketch.rotateZ(sketch.millis() * 0.0001);
    // sketch.translate(-sketch.width/2, -sketch.height/2);
    // sketch.stroke(255, 100);
    // sketch.noFill();
    // sketch.strokeWeight(2);
    // for (var y = 0; y < rows-1; y++) {
    //   sketch.beginShape(sketch.TRIANGLE_STRIP);
    //   for (var x = 0; x < cols; x++) {
    //     var index = x + y * cols;
    //     // sketch.stroke(flowfield[index].y * 255)
    //     sketch.vertex(x * cols, y * rows, flowfield[index].x * 55);
        
    //     var index = x + (y+1) * cols;
    //     // sketch.stroke(flowfield[index].y * 255)
    //     sketch.vertex(x * cols, (y+1) * rows, flowfield[index].x * 55);
    //   }
    //   sketch.endShape();
    // }
    for (var i = 0; i < particles.length; i++) {
      sketch.stroke(255, 25);
      sketch.strokeWeight(1);
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  }

};

var myp5 = new p5(s);
