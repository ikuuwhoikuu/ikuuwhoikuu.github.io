var weather;
var input;
var canvas;
var minY = [];
var maxY = [];
var evenY = [];
var drop = [];
var buttons = [];
var cells = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  let side = 64;
  for (let i = 0; i < width / side; i++) {
    for (let j = 0; j < height / side; j++) {
      cells.push(new Cell(i * side - width / 2, j * side - height / 2, side - 6));
    }
  }

  weatherAsk();
}

function windowResized() {
  for (let button of buttons) {
    button.size(windowWidth / cities.length, 100);
  }
  resizeCanvas(windowWidth, windowHeight);
}

function weatherAsk(city) {
  loadJSON('https://weatherveem.thecodingartist.com/api/v1/weather?format=json', gotData);
}

function gotData(data) {
  weather = data;
  console.log(weather);
}

var proxTh = 200;

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);

  let phase = 0;
  let dir = createVector(0, 1);
  let t = 0;

  let half = height / 2 * sqrt(2);

  if (weather) {
    phase = (millis() * 0.00005 * weather.current.wind_kph) % 1;
    t = map(phase, 0, 1, -half - proxTh, half + proxTh);
    dir.rotate(weather.current.wind_degree / 180 * PI);
  }

  noStroke();
  for (let cell of cells) {
    if (weather) {
      let dot = dir.dot(cell.pos);
      let prox = abs(dot - t);
      cell.brightness = constrain(
        map(prox, 0, proxTh, 255, 80), 80, 255);
    }
    cell.draw();
  }
  pop();

  if (weather) {
    // fill(255);
    // noStroke();
    // let ws = weather.current.wind_kph + " m/s";
    // text(ws, 100, height - 50);
  }
}