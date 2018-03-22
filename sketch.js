var s = 64;
var ck = 0;
var cn = 0;
var loading = false;
var start = false;

var names = ["Practicing Caring",
  "Chaos",
  "Buffett",
  "History of the Building",
  "Tobacco Plant",
  "Landscape and Environment",
  "General Introduction",
  "Butterflies",
  "Microbiome",
  "History of the Building",
  "Tea Plant",
  "Coffee Plant",
  "Thermal Sounds",
  "QR Code",
  "Open Weather Map",
  "Open Sound Control",
  "Michael Scerbo",
  "Marcel Smit",
  "Jur de Vries",
  "Naoto Hieda"
];

function setup() {
  let canvas = createCanvas(600, 800);
  canvas.parent("container");
  loading = true;
}

function draw() {
  background(255);

  // translate(width/2, height/2);
  textAlign(CENTER);

  if (loading) {
    if(ck < 255) {
      ck += 4;
    }
    else {
      loading = false;
    }
  }
  if (start) {
    if (s < 500) {
      s += 10;
    }
    if (ck > 0) {
      ck -= 20;
    } else if (cn < 255) {
      cn += 2;
    }
  }
  fill(0, ck);
  textSize(s);
  text('KUU', width / 2, height / 2 + s / 2);

  // fill(0, cn);
  // textSize(32);
  // let i = 0;
  // for (let name of names) {
  //   text(name, width / 2, (i + 1) * 32);
  //   i++;
  // }
}

function mousePressed() {
  start = true;
  loading = false;
}