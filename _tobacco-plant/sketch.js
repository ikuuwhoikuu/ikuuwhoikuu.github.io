// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

// instance mode by Naoto Hieda


function Branch(sketch, begin, end, level) {
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.level = level;

  this.points = [this.begin];
  this.dir = p5.Vector.sub(this.end, this.begin);
  this.curDir = this.dir.copy();
  this.curDir.mult(30 / 1000);

  this.jitter = function() {
    this.end.x += sketch.random(-1, 1)*5;
    this.end.y += sketch.random(-1, 1)*5;
  }

  this.show = function() {
    sketch.stroke(255);
    var last = this.points[this.points.length - 1];
    if(this.level == curLevel) {
      this.curDir.rotate(sketch.randomGaussian() * 0.1);
      var x = last.x + this.curDir.x;
      var y = last.y + this.curDir.y;
      // var x = sketch.lerp(this.begin.x, this.end.x, curTime) + 5 * sketch.random(-1, 1);
      // var y = sketch.lerp(this.begin.y, this.end.y, curTime) + 5 * sketch.random(-1, 1);
      this.points.push(sketch.createVector(x, y));
      this.end = this.points[this.points.length - 1];
    }
    // else {
    //   sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    // }
    for(var i = 0; i < this.points.length - 1; i++)
    sketch.line(this.points[i].x, this.points[i].y,
      this.points[i+1].x, this.points[i+1].y);
  }

  this.branchA = function() {
    var dir = this.dir.copy();
    dir.rotate(sketch.PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd, this.level+1);
    return b;
  }
  this.branchB = function() {
    var dir = this.dir.copy();
    dir.rotate(-sketch.PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd, this.level+1);
    return b;
  }



}

var tree = [];
var leaves = [];

var count = 0;

var curTime = 0;
var curLevel = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    var a = sketch.createVector(sketch.width / 2, sketch.height);
    var b = sketch.createVector(sketch.width / 2, sketch.height - 200);
    var root = new Branch(sketch, a, b, 0);

    tree[0] = root;

    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("canvas").animate({opacity: '0.05'}, 2000);
    }, 3000);
  }

  sketch.mousePressed = function () {
    for (var i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
      }
      tree[i].finished = true;
    }
  }

  sketch.draw = function () {
    curTime = (sketch.millis() / 1000) % 8;
    var prevLevel = curLevel;
    curLevel = Math.floor(curTime);
    curTime = curTime % 1;
    if(prevLevel >= 7 && curLevel < 1) {
      var a = sketch.createVector(sketch.width / 2, sketch.height);
      var b = sketch.createVector(sketch.width / 2, sketch.height - 200);
      var root = new Branch(sketch, a, b, 0);
      tree = [root];
      count = 0;
    }
    else if (prevLevel < curLevel) {
      sketch.mousePressed();
    }

    sketch.background(0);

    for (var i = 0; i < tree.length; i++) {
      tree[i].show();
      // if(tree[i].finished) 
      // tree[i].jitter();
    }

    for (var i = 0; i < leaves.length; i++) {
      sketch.fill(255, 0, 100, 100);
      sketch.noStroke();
      sketch.ellipse(leaves[i].x, leaves[i].y, 8, 8);
      leaves[i].y += sketch.random(0, 2);
    }

  }

};

var myp5 = new p5(s);
