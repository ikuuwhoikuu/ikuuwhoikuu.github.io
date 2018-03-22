circleCount = 100
diameter = 300
radius = diameter / 2
angleOffset = 400
rotSpeed = 0.0001
phase = 0
depth = 300
freq = 0.01

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  stroke(255)
  noFill()
  textAlign(CENTER)
  textSize(16)

  setTimeout(function() {
    $("#page").animate({opacity: '0.95'}, 2000);
    $("canvas").animate({opacity: '0.05'}, 2000);
  }, 3000);
}

function draw() {
  background(255, 255, 255)
  fill(0, random(100)+155, 0)

  mouseX = 100;
  mouseY = 240;
  
  depth = map(mouseX, 0, width, -300, 300)
  diameter = map(mouseX, 0, width, 20, 300)
  radius = diameter / 2

  colorHi = map(mouseY, 0, height, 255, 50)
  colorLo = map(mouseY, 0, height, 100, 0)

  if (abs(mouseX - (width / 2)) < 100 && abs(mouseY - (height / 2)) < 100) {
    colorHi = 255
    colorLo = 200
  }

  push()
  translate((width / 2) + (random(0) - 5), (height / 2) + (random(0) - 5))

  for (i = 0; i < circleCount; i++) {
    //push()
    //rotate((TWO_PI / circleCount) * i + angleOffset)
    rotate((TWO_PI / circleCount) + angleOffset)

    modulation = sin(TWO_PI * ((1 / circleCount) * i + phase))

    lineColor = map(pow(abs(modulation), 8), 0, 1, colorLo, colorHi)
    stroke(lineColor/2, lineColor, 255)

    //strokeWeight(random(0.1))
    strokeWeight(0.1)

    radOffset = modulation * depth

    ellipse(0, radius + radOffset, 4, 4)
    line(0, radius + radOffset, 0, width)
    //pop()
  }
  pop()

  angleOffset += rotSpeed
  phase = phase + freq
}