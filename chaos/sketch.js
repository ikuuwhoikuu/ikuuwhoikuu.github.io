var s = function (sketch) {
  sketch.setup = function () {
    sketch.noCanvas();
    setTimeout(function() {
      $("#page").animate({opacity: '0.95'}, 2000);
      $("video").animate({opacity: '0.05'}, 2000);
    }, 3000);
  }

};

var myp5 = new p5(s);
