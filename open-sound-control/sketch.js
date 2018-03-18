class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
  }
  
  show () {
    this.x = (this.x + this.vx + width) % width;
    this.y = (this.y + this.vy + height) % height;
  	noStroke();
	  fill(0);
    ellipse(this.x, this.y, 10);
    
    for(let p of particles) {
			if(this == p) continue;
      let dx = this.x - p.x;
      let dy = this.y - p.y;
      let d = dx * dx + dy * dy;
      let dt = 400;
      if(d < dt*dt) {
			  stroke(0, 255-sqrt(d)/dt*255);
	      line(this.x, this.y, p.x, p.y);
      }
    }
  }
}

var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < 10; i++) {
    particles.push(new Particle());
  }

  setTimeout(function() {
    $("#page").animate({opacity: '0.95'}, 2000);
    $("canvas").animate({opacity: '0.05'}, 2000);
  }, 3000);
}

function draw() {
  background(255);
  for(let p of particles) {
    p.show();
  }
}
