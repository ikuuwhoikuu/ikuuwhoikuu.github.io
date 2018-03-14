var weather;
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var api = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
var input;
var apiKey = '&appid=ad6e239ec0ac58d0a9836e942aac97eb';
var units = '&cnt=16&units=metric';
var canvas;
var minY = [];
var maxY = [];
var evenY = [];
var drop = [];
var buttons = [];
var cities = ["Amsterdam", "Montreal", "Tokyo"];
var cells = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  let side = 64;
  for (let i = 0; i < width / side; i++) {
    for (let j = 0; j < height / side; j++) {
      cells.push(new Cell(i * side - width / 2, j * side - height / 2, side - 6));
    }
  }

  for (let city of cities) {
    let button = createButton(city);
    button.parent("container");
    button.size(windowWidth / cities.length, 100);
    button.style('font-size', '30px');
    button.mousePressed(weatherAsk.bind(null, button.html()));
    buttons.push(button);
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
  if (city === undefined) city = cities[0];
  var url = api + city + apiKey + units;
  console.log(url);
  loadJSON(url, gotData);
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
    phase = (millis() * 0.00005 * weather.wind.speed) % 1;
    t = map(phase, 0, 1, -half - proxTh, half + proxTh);
    dir.rotate(weather.wind.deg / 180 * PI);
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
    fill(255);
    noStroke();
    let ws = weather.wind.speed + " m/s";
    // ws += " " + weather.wind.deg + "degrees";
    text(ws, 100, height - 50);
  }
}