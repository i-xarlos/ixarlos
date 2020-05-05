/*
let ds;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  ds = new PenroseLSystem();
  //please, play around with the following line
  ds.simulate(5);
}

function draw() {
  background(255);
  frameRate(150);
  ds.render();
}

function PenroseLSystem() {
  this.steps = 0;

  //these are axiom and rules for the penrose rhombus l-system
  //a reference would be cool, but I couldn't find a good one
  this.axiom = "[X]++[X]++[X]++[X]++[X]";
  this.ruleW = "YF++ZF----XF[-YF----WF]++";
  this.ruleX = "+YF--ZF[---WF--XF]+";
  this.ruleY = "-WF++XF[+++YF++ZF]-";
  this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

  //please play around with the following two lines
  this.startLength = 1860.0;
  this.theta = TWO_PI / 10.0; //36 degrees, try TWO_PI / 6.0, ...
  this.reset();
}

PenroseLSystem.prototype.simulate = function (gen) {
  while (this.getAge() < gen) {
    this.iterate(this.production);
  }
};

PenroseLSystem.prototype.reset = function () {
  this.production = this.axiom;
  this.drawLength = this.startLength;
  this.generations = 0;
};

PenroseLSystem.prototype.getAge = function () {
  return this.generations;
};

//apply substitution rules to create new iteration of production string
PenroseLSystem.prototype.iterate = function () {
  let newProduction = "";

  for (let i = 0; i < this.production.length; ++i) {
    let step = this.production.charAt(i);
    //if current character is 'W', replace current character
    //by corresponding rule
    if (step == "W") {
      newProduction = newProduction + this.ruleW;
    } else if (step == "X") {
      newProduction = newProduction + this.ruleX;
    } else if (step == "Y") {
      newProduction = newProduction + this.ruleY;
    } else if (step == "Z") {
      newProduction = newProduction + this.ruleZ;
    } else {
      //drop all 'F' characters, don't touch other
      //characters (i.e. '+', '-', '[', ']'
      if (step != "F") {
        newProduction = newProduction + step;
      }
    }
  }

  this.drawLength = this.drawLength * 0.5;
  this.generations++;
  this.production = newProduction;
};

//convert production string to a turtle graphic
PenroseLSystem.prototype.render = function () {
  translate(width / 2, height / 2);

  this.steps += 40;
  if (this.steps > this.production.length) {
    this.steps = this.production.length;
  }

  for (let i = 0; i < this.steps; ++i) {
    let step = this.production.charAt(i);

    //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
    if (step == "F") {
      stroke(230, 60);
      for (let j = 0; j < this.repeats; j++) {
        line(0, 0, 0, -this.drawLength);
        noFill();
        translate(0, -this.drawLength);
      }
      this.repeats = 1;
    } else if (step == "+") {
      rotate(this.theta);
    } else if (step == "-") {
      rotate(-this.theta);
    } else if (step == "[") {
      push();
    } else if (step == "]") {
      pop();
    }
  }
};
*/

// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(1, 8);
    this.xSpeed = random(-2, 4);
    this.ySpeed = random(-1, 3);
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    //stroke(200);
    fill("rgba(200,169,169,0.5)");
    circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if (this.x < 0 || this.x > width) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(paraticles) {
    particles.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 85) {
        stroke("rgba(0,0,0,.03)");
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];

let isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

function setup() {
  !isMobile && createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < width / 10; i++) {
    !isMobile && particles.push(new Particle());
  }
}

function draw() {
  !isMobile && background("#f5f5f5");

  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}
