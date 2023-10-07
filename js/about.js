const displayGlyph = (c, obj, size) => {
  const { pos, charCode, goalChar, x, y } = obj;
  c.stroke(0, 255, 0);

  if (goalChar !== " ") {
    c.push();
    c.translate(x, y);
    c.strokeWeight(0.5);
    c.line(pos[0][0], pos[0][1], pos[1][0], pos[1][1]);
    c.line(pos[0][0], pos[0][1], pos[3][0], pos[3][1]);
    c.line(pos[1][0], pos[1][1], pos[3][0], pos[3][1]);
    c.line(pos[1][0], pos[1][1], pos[4][0], pos[4][1]);
    c.line(pos[2][0], pos[2][1], pos[3][0], pos[3][1]);
    c.line(pos[3][0], pos[3][1], pos[4][0], pos[4][1]);
    c.line(pos[2][0], pos[2][1], pos[5][0], pos[5][1]);
    c.line(pos[3][0], pos[3][1], pos[5][0], pos[5][1]);
    c.line(pos[3][0], pos[3][1], pos[6][0], pos[6][1]);
    c.line(pos[4][0], pos[4][1], pos[6][0], pos[6][1]);
    c.line(pos[5][0], pos[5][1], pos[6][0], pos[6][1]);
    c.fill(0);
    c.strokeWeight(size / 5.5);

    let stringCharCode = String(charCode);
    if (Number(stringCharCode[stringCharCode.length - 1]) < 5) {
      c.line(pos[0][0], pos[0][1], pos[1][0], pos[1][1]);
    }
    if (stringCharCode[0] == 1) {
      c.line(pos[0][0], pos[0][1], pos[2][0], pos[2][1]);
    }
    let root = c.sqrt(charCode);

    if (Number(String(root)[String(root).length - 1]) < 5) {
      c.line(pos[0][0], pos[0][1], pos[3][0], pos[3][1]);
    }
    let power = c.pow(charCode, 2);
    if (Number(String(power)[String(power).length - 1]) % 2 === 0) {
      c.line(pos[1][0], pos[1][1], pos[3][0], pos[3][1]);
    }

    if (power % 7 === 0) {
      c.line(pos[1][0], pos[1][1], pos[4][0], pos[4][1]);
    }

    if (power % 3 === 0) {
      c.line(pos[2][0], pos[2][1], pos[3][0], pos[3][1]);
    }

    if (power % 2 === 0) {
      c.line(pos[3][0], pos[3][1], pos[4][0], pos[4][1]);
    }

    if ((power + charCode) % 3 === 0) {
      c.line(pos[2][0], pos[2][1], pos[5][0], pos[5][1]);
    }

    if (c.floor(charCode * 2.65) % 3 === 0) {
      c.line(pos[3][0], pos[3][1], pos[5][0], pos[5][1]);
    }

    if (c.floor(charCode * root) % 7 === 0) {
      c.line(pos[3][0], pos[3][1], pos[6][0], pos[6][1]);
    }

    if (c.floor(charCode * power) % 3 === 0) {
      c.line(pos[4][0], pos[4][1], pos[6][0], pos[6][1]);
    }

    if (c.floor(charCode * power - root) % 5 === 0) {
      c.line(pos[5][0], pos[5][1], pos[6][0], pos[6][1]);
    }

    if (c.floor(charCode * power - charCode) % 8 === 0) {
      c.ellipse(pos[0][0], pos[0][1], size * 0.4, size * 0.4);
    }

    if (c.floor(charCode * power - charCode) % 9 === 0) {
      c.ellipse(pos[1][0], pos[1][1], size * 0.4, size * 0.4);
    }

    if (c.floor(charCode * power - charCode) % 7 === 0) {
      c.ellipse(pos[2][0], pos[2][1], size * 0.4, size * 0.4);
    }

    if (c.floor((charCode / power) * root - charCode) % 7 === 0) {
      c.ellipse(pos[3][0], pos[3][1], size * 0.4, size * 0.4);
    }

    if (c.floor(root * 1234) % 3 === 0) {
      c.ellipse(pos[4][0], pos[4][1], size * 0.4, size * 0.4);
    }

    if (c.floor(root * 5412) % 3 === 0) {
      c.ellipse(pos[5][0], pos[5][1], size * 0.4, size * 0.4);
    }

    if (c.floor(root * power * 10000) % 3 === 0) {
      c.ellipse(pos[6][0], pos[6][1], size * 0.4, size * 0.4);
    }
    c.pop();
  }
};
let titleGlyphSketch = (w) => {
  w.setup = () => {
    let myCanvas = w.createCanvas(800, 100);
    w.background(0);
    myCanvas.parent("title-glyphs");
    w.textSize(60);
    w.fill(0, 255, 0);
    loadGlyphs();
  };

  let string = "what is tephroglyph?";
  let SIZE = 15.5;
  let g = [];

  w.draw = () => {
    w.background(0);
    for (let i = 0; i < g.length; i++) {
      g[i].display();
      if (w.frameCount % 5 === 0) {
        g[i].move();
      }
    }
    if (g.filter((x) => !x.done).length === 2) {
      w.noLoop();
    }
  };

  const loadGlyphs = () => {
    for (let i = 0; i < string.length; i++) {
      g.push(
        new Glyph(
          20 + i * (SIZE * 2.55),
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
      displayGlyph(w, this, SIZE);
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

let contentGlyphSketch = (w) => {
  w.setup = () => {
    let myCanvas = w.createCanvas(800, 300);
    w.background(0);
    myCanvas.parent("content-glyphs");
    w.textSize(60);
    w.fill(0, 255, 0);
    loadGlyphs();
  };

  let strings = [
    `tephroglyph is a mixed media generative art`,
    `project created by joey aronson`,
    ``,
    `using p5.js WEBGL sketchbook adobe`,
    `illustrator and blender tephroglyph combines`,
    `traditional hand drawn illustrations and the`,
    `latest web technologies to provide a unique`,
    `interactive experience`,
  ];
  let SIZE = 7;
  let g = [];
  w.draw = () => {
    w.background(0);
    for (let i = 0; i < g.length; i++) {
      g[i].display();
    }
    [
      document.getElementById("tephro-about"),
      document.getElementById("tephro-title"),
    ].forEach((x) => {
      x.style.color = "#00ff00";
    });

    w.noLoop();
  };

  const loadGlyphs = () => {
    for (let j = 0; j < strings.length; j++) {
      let string = strings[j];
      for (let i = 0; i < string.length; i++) {
        g.push(
          new Glyph(
            10 + i * (SIZE * 2.55),
            10 + SIZE + SIZE * 4 * j,
            string[i],
            string[i]
          )
        );
      }
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
      displayGlyph(w, this, SIZE);
    }
  }

  const getHeight = (side) => {
    return w.sqrt(side * side + ((side / 2) * side) / 2);
  };
};

let titleGlyph = new p5(titleGlyphSketch);
let contentGlyph = new p5(contentGlyphSketch);
