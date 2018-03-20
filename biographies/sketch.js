// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/9r8CmofnbAQ

// instance mode by Naoto Hieda

//var txt = "the theremin is theirs, ok? yes, it is. this is a theremin.";
//var txt = "The unicorn is a legendary creature that has been described since antiquity as a beast with a large, pointed, spiraling horn projecting from its forehead. The unicorn was depicted in ancient seals of the Indus Valley Civilization and was mentioned by the ancient Greeks in accounts of natural history by various writers, including Ctesias, Strabo, Pliny the Younger, and Aelian.[1] The Bible also describes an animal, the re'em, which some translations have erroneously rendered with the word unicorn.[1] In European folklore, the unicorn is often depicted as a white horse-like or goat-like animal with a long horn and cloven hooves (sometimes a goat's beard). In the Middle Ages and Renaissance, it was commonly described as an extremely wild woodland creature, a symbol of purity and grace, which could only be captured by a virgin. In the encyclopedias its horn was said to have the power to render poisoned water potable and to heal sickness. In medieval and Renaissance times, the tusk of the narwhal was sometimes sold as unicorn horn.";
var names;
var order = 2;
var ngrams = {};
var beginnings = [];
var button;
var result = "";
var font;
var currentGram;
var slowdown = false;

var s = function (sketch) {

  sketch.preload = function () {
    names = sketch.loadStrings('names.txt');
  }

  sketch.setup = function () {
    console.log(names);
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    for (var j = 0; j < names.length; j++) {
      var txt = names[j];
      for (var i = 0; i <= txt.length - order; i++) {
        var gram = txt.substring(i, i + order);
        if (i == 0) {
          beginnings.push(gram);
        }

        if (!ngrams[gram]) {
          ngrams[gram] = [];
        }
        ngrams[gram].push(txt.charAt(i + order));
      }
    }
    // button = sketch.createButton("generate");
    // button.mousePressed(sketch.markovIt);
    console.log(ngrams);

    currentGram = sketch.random(beginnings);
    result = currentGram;

    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("canvas").animate({opacity: '0.05'}, 2000);
      slowdown = true;
    }, 3000);
    loading = true;
  }

  sketch.markovIt = function () {


    // sketch.createP(result);

  }

  sketch.draw = function () {
    if (sketch.frameCount % 60 == 0) {
      if(slowdown == false || sketch.frameCount % 320 == 0) {
        currentGram = sketch.random(beginnings);
        result = currentGram;
        }
    }
    else if (sketch.frameCount % 2 == 0) {

      var possibilities = ngrams[currentGram];
      if (possibilities) {
        var next = sketch.random(possibilities);
        result += next;
        var len = result.length;
        currentGram = result.substring(len - order, len);
      }
    }
    sketch.background(255);
    sketch.fill(0);
    // sketch.textFont(font);
    sketch.textSize(30);
    sketch.text(result + '_', 20, 100, 700, 500);
    // if (possibilities) {
    //   sketch.text(possibilities + "  ", 20, 700);
    // }
  }

};

var myp5 = new p5(s);
