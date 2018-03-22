var s = 64;
var ck = 0;
var loading = false;
var start = false;

var names = ["Ana Vujanovic",
"Andreas Chanis",
"Antonia Steffens",
"Caligo Eurilochus",
"Camellia Sinensis",
"Charlie Laban Trier",
"Charlot Van Der Meer",
"Christopher Kinsey",
"Coffea",
"Elisa Zuppini",
"Ficus Lyrata Bambino (Tabaksplant)",
"Frits and co.",
"Francesco Zatelli",
"Fungi",
"Het Veem",
"Jur de Vries",
"Laima Jaunzema",
"Led Par",
"Marcel Smit",
"Martin Kaffarnik",
"Mehraneh Atashi",
"Mesh",
"Michael Scerbo",
"Microbiome",
"Mist Foggers",
"Morpho Polyphemus",
"Naoto Hiéda",
"Nele",
"Paul Jongerius",
"Renée Copraij",
"Sharyselle Kock",
"Soil",
"Sound Boxes",
"Stephanie Lühn",
"Vincent Romijn",
"4DSOUND"
];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  // canvas.parent("container");
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
    }
  }
  fill(0, ck);
  textSize(s);
  text('KUU', width / 2, height / 2 + s / 2);
}

function mousePressed() {
  start = true;
  loading = false;

  $("#page").animate({opacity: '1'}, 2000);
  $("canvas").animate({opacity: '0'}, 2000);
  slowdown = true;
}
