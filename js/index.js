let teph = (w) => {
  w.preload = () => {
    tephroOBJ = w.loadModel("./qr_sketches/tephro.obj");
  };
  w.setup = () => {
    let myCanvas = w.createCanvas(700, 150, w.WEBGL);
    w.angleMode(w.DEGREES);
    myCanvas.parent("tephro");
    w.stroke(0, 255, 0);
    w.strokeWeight(0.4);
    w.fill(0);
  };

  w.draw = () => {
    w.push();
    w.translate(-25, 0, -w.cos(w.frameCount) * 50 - 50);
    w.scale(1100);
    w.background(0);
    w.rotateX(270);
    w.rotateZ(w.cos(w.frameCount / 2) * 80);
    w.model(tephroOBJ);
    w.pop();
  };
};

let glyphSketch = (w) => {
  w.preload = () => {
    font = w.loadFont("css/white-rabbit.woff");
  };

  w.setup = () => {
    let myCanvas = w.createCanvas(800, 250);
    w.background(0);
    myCanvas.parent("glyph");
    w.textFont(font);
    w.textSize(60);
    w.fill(0, 255, 0);
    loadGlyphs();
  };

  let string = "enter tephroglyph";
  let typeIndex = 0;
  let SIZE = 14;
  let g = [];
  let del = false;
  let deleteTimer = 0;
  let restartTimer = 0;
  const restart = () => {
    g = [];
    loadGlyphs();
    del = false;
  };
  w.draw = () => {
    const { width, height, frameCount } = w;
    if (frameCount % 10 === 0 && typeIndex <= string.length) {
      if (del) {
        if (typeIndex >= 0) {
          typeIndex--;
        }
      } else {
        typeIndex++;
      }
    }

    w.background(0);
    let tempString = "> " + string.substring(0, typeIndex);
    if (frameCount % 50 < 25) {
      tempString += "_";
    }
    w.text(tempString, 45, height / 2 - 50);
    for (let i = 0; i < g.length; i++) {
      if (i < typeIndex) {
        g[i].display();
        if (w.frameCount % 5 === 0) {
          g[i].move();
        }
      }
    }
    if (g.filter((x) => !x.done).length === 1 && !del) {
      deleteTimer++;
    }

    if (deleteTimer > 300) {
      typeIndex -= 1;
      del = true;
      deleteTimer = 0;
    }
    if (typeIndex === -1) {
      restartTimer++;
    }

    if (restartTimer > 300) {
      restartTimer = 0;
      restart();
    }
  };

  const loadGlyphs = () => {
    let string = "enter tephroglyph";
    for (let i = 0; i < string.length; i++) {
      g.push(
        new Glyph(
          120 + i * (SIZE * 2.55),
          w.height / 2,
          String.fromCharCode(w.floor(w.random(33, 125))),
          string[i]
        )
      );
    }
  };

  class Glyph {
    constructor(x, y, char, goalChar) {
      this.x = x;
      this.y = y;
      this.char = char;
      this.goalChar = goalChar;
      this.pos = [
        [-SIZE / 2, -getHeight(SIZE)],
        [SIZE / 2, -getHeight(SIZE)],
        /**/
        [-SIZE, 0],
        [0, 0],
        [SIZE, 0],
        /**/
        [-SIZE / 2, getHeight(SIZE)],
        [SIZE / 2, getHeight(SIZE)],
      ];
      this.charCode = this.char.charCodeAt(0);
      this.done = false;
    }

    display() {
      w.stroke(0, 255, 0);

      if (this.goalChar !== " ") {
        w.push();
        w.translate(this.x, this.y);
        w.strokeWeight(0.5);
        w.line(this.pos[0][0], this.pos[0][1], this.pos[1][0], this.pos[1][1]);
        w.line(this.pos[0][0], this.pos[0][1], this.pos[3][0], this.pos[3][1]);
        w.line(this.pos[1][0], this.pos[1][1], this.pos[3][0], this.pos[3][1]);
        w.line(this.pos[1][0], this.pos[1][1], this.pos[4][0], this.pos[4][1]);
        w.line(this.pos[2][0], this.pos[2][1], this.pos[3][0], this.pos[3][1]);
        w.line(this.pos[3][0], this.pos[3][1], this.pos[4][0], this.pos[4][1]);
        w.line(this.pos[2][0], this.pos[2][1], this.pos[5][0], this.pos[5][1]);
        w.line(this.pos[3][0], this.pos[3][1], this.pos[5][0], this.pos[5][1]);
        w.line(this.pos[3][0], this.pos[3][1], this.pos[6][0], this.pos[6][1]);
        w.line(this.pos[4][0], this.pos[4][1], this.pos[6][0], this.pos[6][1]);
        w.line(this.pos[5][0], this.pos[5][1], this.pos[6][0], this.pos[6][1]);
        w.fill(0);
        w.strokeWeight(SIZE / 5.5);

        let stringCharCode = String(this.charCode);
        if (Number(stringCharCode[stringCharCode.length - 1]) < 5) {
          w.line(
            this.pos[0][0],
            this.pos[0][1],
            this.pos[1][0],
            this.pos[1][1]
          );
        }
        if (stringCharCode[0] == 1) {
          w.line(
            this.pos[0][0],
            this.pos[0][1],
            this.pos[2][0],
            this.pos[2][1]
          );
        }
        let root = w.sqrt(this.charCode);

        if (Number(String(root)[String(root).length - 1]) < 5) {
          w.line(
            this.pos[0][0],
            this.pos[0][1],
            this.pos[3][0],
            this.pos[3][1]
          );
        }
        let power = w.pow(this.charCode, 2);
        if (Number(String(power)[String(power).length - 1]) % 2 === 0) {
          w.line(
            this.pos[1][0],
            this.pos[1][1],
            this.pos[3][0],
            this.pos[3][1]
          );
        }

        if (power % 7 === 0) {
          w.line(
            this.pos[1][0],
            this.pos[1][1],
            this.pos[4][0],
            this.pos[4][1]
          );
        }

        if (power % 3 === 0) {
          w.line(
            this.pos[2][0],
            this.pos[2][1],
            this.pos[3][0],
            this.pos[3][1]
          );
        }

        if (power % 2 === 0) {
          w.line(
            this.pos[3][0],
            this.pos[3][1],
            this.pos[4][0],
            this.pos[4][1]
          );
        }

        if ((power + this.charCode) % 3 === 0) {
          w.line(
            this.pos[2][0],
            this.pos[2][1],
            this.pos[5][0],
            this.pos[5][1]
          );
        }

        if (w.floor(this.charCode * 2.65) % 3 === 0) {
          w.line(
            this.pos[3][0],
            this.pos[3][1],
            this.pos[5][0],
            this.pos[5][1]
          );
        }

        if (w.floor(this.charCode * root) % 7 === 0) {
          w.line(
            this.pos[3][0],
            this.pos[3][1],
            this.pos[6][0],
            this.pos[6][1]
          );
        }

        if (w.floor(this.charCode * power) % 3 === 0) {
          w.line(
            this.pos[4][0],
            this.pos[4][1],
            this.pos[6][0],
            this.pos[6][1]
          );
        }

        if (w.floor(this.charCode * power - root) % 5 === 0) {
          w.line(
            this.pos[5][0],
            this.pos[5][1],
            this.pos[6][0],
            this.pos[6][1]
          );
        }

        if (w.floor(this.charCode * power - this.charCode) % 8 === 0) {
          w.ellipse(this.pos[0][0], this.pos[0][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor(this.charCode * power - this.charCode) % 9 === 0) {
          w.ellipse(this.pos[1][0], this.pos[1][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor(this.charCode * power - this.charCode) % 7 === 0) {
          w.ellipse(this.pos[2][0], this.pos[2][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor((this.charCode / power) * root - this.charCode) % 7 === 0) {
          w.ellipse(this.pos[3][0], this.pos[3][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor(root * 1234) % 3 === 0) {
          w.ellipse(this.pos[4][0], this.pos[4][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor(root * 5412) % 3 === 0) {
          w.ellipse(this.pos[5][0], this.pos[5][1], SIZE * 0.4, SIZE * 0.4);
        }

        if (w.floor(root * power * 10000) % 3 === 0) {
          w.ellipse(this.pos[6][0], this.pos[6][1], SIZE * 0.4, SIZE * 0.4);
        }
        w.pop();
      }
    }

    move() {
      if (this.char !== this.goalChar) {
        this.char = String.fromCharCode(w.floor(w.random(33, 125)));
        this.charCode = this.char.charCodeAt(0);
      } else {
        this.done = true;
      }
    }
  }

  const getHeight = (side) => {
    return w.sqrt(side * side + ((side / 2) * side) / 2);
  };
};
let torusSketch = (w) => {
  w.preload = () => {
    font = w.loadFont("css/white-rabbit.woff");
  };
  w.setup = () => {
    let myCanvas = w.createCanvas(720, 720, w.WEBGL);
    w.textFont(font);
    w.textSize(35);
    w.angleMode(w.DEGREES);
    w.rectMode(w.CENTER);
    myCanvas.parent("torus");
  };

  const drawTab = (displayIcons) => {
    w.fill(0);
    w.stroke(0, 255, 0);
    w.line(-w.width / 2, -w.height / 2, w.width / 2, -w.height / 2);
    w.line(w.width / 2, -w.height / 2, w.width / 2, w.height / 2);
    w.line(w.width / 2, w.height / 2, w.width / 2 - 15, w.height / 2);

    w.beginShape();
    w.vertex(-w.width / 2, -w.height / 2);
    w.vertex(-w.width / 2, -w.height / 2 - 50);
    w.vertex(-w.width / 2 + 125, -w.height / 2 - 50);
    w.vertex(-w.width / 2 + 160, -w.height / 2);
    w.endShape(w.CLOSE);
    if (displayIcons) {
      w.line(
        -w.width / 2 + 10,
        -w.height / 2 - 40,
        -w.width / 2 + 40,
        -w.height / 2 - 10
      );
      w.line(
        -w.width / 2 + 10,
        -w.height / 2 - 10,
        -w.width / 2 + 40,
        -w.height / 2 - 40
      );

      w.ellipse(-w.width / 2 + 65, -w.height / 2 - 25, 30, 30);
      w.triangle(
        -w.width / 2 + 90,
        -w.height / 2 - 10,
        -w.width / 2 + 110,
        -w.height / 2 - 40,
        -w.width / 2 + 130,
        -w.height / 2 - 10
      );
    }
  };

  w.draw = () => {
    w.push();
    w.translate(0, 0, -200);
    w.noStroke();
    w.fill(0);
    w.rect(w.width / 2 + 50, 0, 100, w.height);
    w.rect(-w.width / 2 - 50, 0, 100, w.height);
    w.rect(0, -w.height / 2 - 50, w.width, 100);
    w.rect(0, w.height / 2 + 50, w.width, 100);
    w.strokeWeight(5);

    for (let i = 3; i >= 0; i--) {
      w.push();
      w.translate(i * 15, i * -15);
      drawTab(i === 0);
      w.pop();
    }
    w.fill(0, 0, 0, 30);
    w.stroke(0, 255, 0);
    w.rect(0, 0, w.width, w.height);
    w.line(-w.width / 2, -w.height / 2 + 75, w.width / 2, -w.height / 2 + 75);
    w.line(-w.width / 2, w.height / 2 - 25, w.width / 2, w.height / 2 - 25);
    w.fill(0, 255, 0);
    w.rect(0, -w.height / 2 + 25, w.width, 50);
    w.fill(0);
    w.text(
      "/DEV/TTY/TORUS_RUNNER_V3.EXE",
      -w.width / 2 + 10,
      -w.height / 2 + 35
    );
    w.noStroke();
    w.rect(w.width / 2 - 15, -w.height / 2 + 25, 12, 40);
    w.rect(w.width / 2 - 35, -w.height / 2 + 25, 12, 40);

    w.pop();
    w.push();
    w.stroke(0, 255, 0);
    w.strokeWeight(1);
    w.translate(0, 0, -w.cos(w.frameCount) * 150 - 150);
    w.rotateX(30);
    w.rotateY(w.frameCount);
    w.fill(0);

    w.torus(200, 100, 24, 16);

    w.pop();
  };
};

let tephro = new p5(teph);
let glp;
let torus;
if (window.location.href.includes("index")) {
  glp = new p5(glyphSketch);
  torus = new p5(torusSketch);
}

if (!window.location.href.endsWith("index.html")) {
  window.top.location = "/index.html";
}
