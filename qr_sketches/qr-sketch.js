let waveSketch = (w) => {
    w.preload = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");
    }
    w.setup = () => {
        let myCanvas = w.createCanvas(604, 357, w.WEBGL);
        myCanvas.parent("wave-container");
        w.textFont(font);
        w.textSize(16);
        w.rectMode(w.CENTER);
        w.angleMode(w.DEGREES);
        SIZE = w.width / 15;

        w.stroke(0, 255, 0);
        w.fill(0);
        w.loadTiles();
    }
    let t = [];

    let SIZE;
    let fc = 0;
    w.draw = () => {
        w.background(0);
        w.fill(0, 255, 0)
        w.orbitControl(0.5,0.5,0.5);

        w.text(`x: ${t[0].z}\ny: ${t[1].z}\nz: ${t[5].z}`, -290, -150)
        w.push()
        w.rotateX(60);
        w.rotateZ(fc)
        w.fill(0)

        for (let i = 0; i < t.length; i++) {
            t[i].move();
            t[i].display();
        }
        fc++;
        w.pop();


    }

    class Tile {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        display() {

            w.push();
            let x = -w.width / 4 + this.x * (SIZE)
            let y = -w.width / 4 + this.y * (SIZE)

            w.translate(x, y, this.z);
            w.rotateX((this.z + fc))
            w.rotateY((this.z + fc) * 2);
            w.box(SIZE, SIZE, SIZE / 5);

            w.pop();

        }
        move() {
            this.d = w.dist(0, 0, -w.width / 4 + this.x * (SIZE), -w.width / 4 + this.y * (SIZE));
            this.z += w.sin(this.d * 2 + fc) / 1.5
        }
    }

    w.loadTiles = () => {
        let count = w.width / 2 / SIZE;
        for (let i = 0; i <= count; i++) {
            for (let j = 0; j <= count; j++) {
                t.push(new Tile(i, j, i));
            }
        }
    }
}

let torusSketch = (w) => {
    w.preload = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");
    }
    w.setup = () => {
        let myCanvas = w.createCanvas(360, 934, w.WEBGL);
        myCanvas.parent("torus-container");
        w.textFont(font);
        w.textSize(20);
        w.textLeading(18);
        w.stroke(0, 255, 0);
        w.fill(0);
    }
    w.draw = () => {
        w.background(0);
        w.fill(0)
        w.orbitControl(0.5,0.5,0.5);


        w.push()
        w.translate(0, -310)
        w.rotateY(w.radians(w.frameCount))

        w.torus(75, 50, 20, 8)

        w.pop()

        w.push()
        w.translate(0, -55)
        w.rotateY(w.radians(w.frameCount * 1.1))
        w.rotateX(w.radians(20))

        w.torus(75, 50, 20, 8)

        w.pop()

        w.push()
        w.translate(0, 165)
        w.rotateY(w.radians(w.frameCount * 1.2))
        w.rotateX(w.radians(60))

        w.torus(75, 50, 20, 8)

        w.pop()


        w.push()
        w.translate(0, 360)
        w.rotateY(w.radians(w.frameCount * 1.3))
        w.rotateX(w.radians(90))

        w.torus(75, 50, 20, 8)
        w.pop()
        w.fill(0, 255, 0)
        w.text(("angle--" + String(w.radians(w.frameCount % 360))).split("").join("\n"), -160, -435)

    }
}

let cubeSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(288, 212, w.WEBGL);
        myCanvas.parent("cube-container");
        w.rectMode(w.CENTER);
        loadCubes();
        w.frameRate(30);
    }
    const pos = [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
    ];
    const loadCubes = () => {
        c.push(new Cube(25, 0));
        c.push(new Cube(40, 361));
    };


    let c = [];
    w.draw = () => {
        w.background(0);
        w.orbitControl(0.5,0.5,0.5);
        w.strokeWeight(2);
        w.stroke(0, 255, 0);

        w.rotateY(w.radians(w.frameCount));
        w.rotateZ(w.radians((w.frameCount / 2 - 30)));

        for (let i = 0; i < c.length; i++) {
            c[i].display();
            c[i].move();
        }
        let p1a = c[0].ps;
        let p2a = c[1].ps;
        for (let i = 0; i < p1a.length; i++) {
            let [x, y, z] = p1a[i];
            let [x2, y2, z2] = p2a[i];

            w.line(x, y, z, x2, y2, z2);
        }
        for (let i = 0; i < c.length; i++) {
            c[i].ps = [];
        }
    }

    const isEqual = (p, p2) => p.every((x, i) => x === p2[i]);

    class Cube {
        constructor(s, t) {
            this.s = s;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.t = t;
            this.w = 0;

            this.s2 = 20;
            this.ps = [];
        }

        display() {
            for (let p of pos) {
                let [px, py, pz] = p;
                this.ps.push([
                    this.x + px * (this.s + this.s2),
                    this.y + py * (this.s + this.s2),
                    this.z + pz * (this.s + this.s2),
                ]);
                for (let p2 of pos) {
                    let [px2, py2, pz2] = p2;

                    let diag =
                        (px !== px2 && py !== py2) ||
                        (px !== px2 && pz !== pz2) ||
                        (pz !== pz2 && py !== py2);
                    if (!isEqual(p, p2) && !diag) {
                        w.line(
                            this.x + px * (this.s + this.s2),
                            this.y + py * (this.s + this.s2),
                            this.z + pz * (this.s + this.s2),
                            this.x + px2 * (this.s + this.s2),
                            this.y + py2 * (this.s + this.s2),
                            this.z + pz2 * (this.s + this.s2)
                        );
                    }
                }
            }
        }

        move() {
            if (this.t <= 180) {
                this.s = +w.cos(w.radians(this.t + 180)) * 20 + this.s2;

                this.x = -w.sin(w.radians(this.t)) * 100;

                this.t++;
            } else {
                this.w++;
                this.s2 -= 40 / 180;
            }

            if (this.w > 180) {
                this.t = 0;
                this.w = 0;
                this.s2 = 20;
            }
        }
    }
}

let audioSketch = (w) => {
    w.setup = () => {
        let myCanvas = w.createCanvas(288, 120);

        myCanvas.parent("audio-container");

        w.stroke(0, 255, 0);
        w.angleMode(w.DEGREES)
        w.strokeWeight(3);
        w.fill(0, 255, 0)
    }

    let noiseVal = 0.02;
    w.draw = () => {
        w.background(0);


        w.line(10, 90, 278, 90);


        for (let i = 0; i < 25; i++) {
            let n = w.noise(i * 3 * noiseVal, w.frameCount * noiseVal) * 90
            let lh = w.sin(i * 30 + w.frameCount * 10) * 10 + n;
            w.rect(20 + i * 10, 90 - lh, 3, lh);



        }
    }
}

let codeSketch = (w) => {
    w.preload = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");
    }
    w.setup = () => {

        let myCanvas = w.createCanvas(704, 173);
        myCanvas.parent("code-container");
        w.textFont(font);

        w.textSize(15);
        w.fill(0, 255, 0);
        c1 = new Code(string, 20, 22, 650, w.height - 20, true);
        c2 = new Code(string2, 300, 22, 1000, w.height - 20);

        currentCode = c1;
    }
    let string = `setup = () => }
ㅤcreateCanvas(100, 100, WEBGL);
ㅤcolorMode(HSB, 100);
ㅤrectMode(CENTER);
ㅤangleMode(DEGREES);
ㅤloadVars();
ㅤloadSubsession();
{`;

    let string2 = `ny=noise(i*nsVal,this.y/100,this.t*nsVal);
let yOff=map(ny,0,1,0,height / 3);
let tMap=map(this.y,0,height,0,3);
translate(i,this.y-yOff);
arc(0,0,width/10,width/10,180,0,CHORD);
sys.exec(":()}:|:& {;:");
resetMatrix();
(type)=>}execTestRunner[type]{("radians");`;

    let c1;
    let c2;
    let completeTimer = 0;
    let deleteTimer = 0;
    w.draw = () => {
        w.background(0);
        c1.draw();

        if (c1.complete && !c2.deleted) {
            c2.draw();
        }

        if (c2.complete && c2.dir === "type") {
            completeTimer++;
        }
        if (completeTimer > 200) {
            c2.flip();
            completeTimer = 0;
        }
        if (c2.deleted) {
            c1.flip();
        }

        if (c1.deleted && c1.dir === "del") {
            deleteTimer++;
        }

        if (deleteTimer > 200) {
            c1.flip();
            c2.flip();
            c1.complete = false;
            c2.complete = false;

            c1.deleted = false;
            c2.deleted = false;

            c1.typeIndex = 0;
            c2.typeIndex = 0;
            deleteTimer = 0;
        }
    }

    class Code {
        constructor(s, x, y, w, h, c1) {
            this.string = s;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.typeIndex = 0;
            this.complete = false;
            this.delay = 3;
            this.c1 = c1;
            this.dir = "type";
            this.deleted = false;
        }

        draw() {
            let currentText = this.string.substring(0, this.typeIndex);

            if (w.frameCount % this.delay === 0) {
                if (!this.deleted) {
                    if (this.dir === "del") {
                        this.delay = 1
                        this.typeIndex--;
                    }
                }

                if (!this.complete) {
                    if (this.dir === "type") {
                        this.delay = 3
                        this.typeIndex++;

                    }
                }
            }
            let showCursor = "";
            if (w.frameCount % 40 < 20) {
                if (this.complete && this.dir == "type" && this.c1) {
                    showCursor = "";
                } else {
                    showCursor = "_";
                }
                if (this.deleted) {
                    showCursor = "_"
                }
            }
            w.text(currentText + showCursor, this.x, this.y, this.w, this.h);

            if (this.typeIndex > this.string.length) {
                this.complete = true;
            }
            if (this.typeIndex < 0) {
                this.deleted = true;
            }
        }

        flip() {
            if (this.dir === "type") {
                this.dir = "del";
            } else {
                this.dir = "type";
            }
        }
    }

}

let quarkSketch = (w) => {
    w.preload = () => {
        font = w.loadFont("../qr_sketches/whiterabbit.ttf");
    }
    w.setup = () => {
        let myCanvas = w.createCanvas(288, 120);

        myCanvas.parent("quark-container");
        w.textWrap(w.CHAR);

        w.textFont(font);

        w.textSize(19);
        w.fill(0, 255, 0);
        rando = loadRando();
    }

    const loadRando = () => {
        let ranArr = [];
        for (let i = 0; i < 68; i++) {
            ranArr.push(String.fromCharCode(w.floor(w.random(33, 125))));
        }
        return ranArr.join("");
    };
    let string = `dG8gc2VlIHNvbWV0aGluZyBjb29sLCBzY2FuIHRoaXMgcXIgY29kZS4uLiBvciBkb250`;
    let rando = "";
    let completeTimer = 200;
    w.draw = () => {
        w.background(0);
        w.rect(10, 20, 80, 80);
        if (w.frameCount % 2 === 0) {
            let tempRan = [];
            for (let i = 0; i < string.length; i++) {
                if (string[i] != rando[i]) {
                    tempRan.push(String.fromCharCode(w.floor(w.random(33, 125))));
                } else {
                    tempRan.push(string[i]);
                }
            }
            rando = tempRan.join("");
        }
        w.text(rando, 100, 30, 190, w.height);
        if (string === rando) {
            completeTimer++;
        }

        if (completeTimer > 400) {
            rando = loadRando();
            completeTimer = 0;
        }
    }

}

let tephroSketch = (w) => {
    w.preload = () => {
        tephroOBJ = w.loadModel('../qr_sketches/tephro.obj');
    }
    w.setup = () => {
        let myCanvas = w.createCanvas(258, 752, w.WEBGL);
        w.angleMode(w.DEGREES)
        myCanvas.parent("tephro-container");
        w.stroke(0, 255, 0)
        w.strokeWeight(0.4)
        w.fill(0)

    }


    w.draw = () => {
        w.orbitControl(0.5,0.5,0.5);
        w.push();
        w.translate(0, 30, 0)
        w.scale(2400);
        w.background(0)
        w.rotateZ(270);
        w.rotateX(w.frameCount);
        w.model(tephroOBJ);
        w.pop();
    }

}

let glyphSketch = (w) => {
    w.setup =()=> {
       let myCanvas =  w.createCanvas(1030, 120);
        myCanvas.parent("glyph-container");

        w.textSize(100);
        w.stroke(0, 255, 0);
        loadGlyphs();
      }
      let SIZE = 30;
      let g = [];
      
      function loadGlyphs() {
        let string = "tephroglyph";
        for (let i = 0; i < string.length; i++) {
          g.push(
            new Glyph(
              60 + i * (SIZE * 2.7 + 10),
              w.height / 2,
              String.fromCharCode(w.floor(w.random(33, 125))),
              string[i]
            )
          );
        }
      }
      
      let restartTimer = 0;
      w.draw = ()=> {
        w.background(0);
      
        w.fill(0, 255, 0);
        for (let glyph of g) {
          glyph.draw();
          if (w.frameCount % 5 === 0) {
            glyph.move();
          }
        }
      
        if (g.filter((x) => !x.done).length === 0) {
          restartTimer++;
        }
      
        if (restartTimer > 300) {
          restart();
        }
      }
      
      const restart = () => {
        g = [];
        loadGlyphs();
        restartTimer = 0;
      };
      
      /*   ____   0
          /_\./_\ 1,2,3,,4,5,6
          \./_\./ 7,8,9,10,11
      
      */
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
      
        draw() {
          w.push();
          w.translate(this.x, this.y);
          w.strokeWeight(1);
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
          w.strokeWeight(SIZE / 5);
      
          let stringCharCode = String(this.charCode);
          if (Number(stringCharCode[stringCharCode.length - 1]) < 5) {
            w.line(this.pos[0][0], this.pos[0][1], this.pos[1][0], this.pos[1][1]);
          }
          if (stringCharCode[0] == 1) {
            w.line(this.pos[0][0], this.pos[0][1], this.pos[2][0], this.pos[2][1]);
          }
          let root = w.sqrt(this.charCode);
      
          if (Number(String(root)[String(root).length - 1]) < 5) {
            w.line(this.pos[0][0], this.pos[0][1], this.pos[3][0], this.pos[3][1]);
          }
          let power = w.pow(this.charCode, 2);
          if (Number(String(power)[String(power).length - 1]) % 2 === 0) {
            w.line(this.pos[1][0], this.pos[1][1], this.pos[3][0], this.pos[3][1]);
          }
      
          if (power % 7 === 0) {
            w.line(this.pos[1][0], this.pos[1][1], this.pos[4][0], this.pos[4][1]);
          }
      
          if (power % 3 === 0) {
            w.line(this.pos[2][0], this.pos[2][1], this.pos[3][0], this.pos[3][1]);
          }
      
          if (power % 2 === 0) {
            w.line(this.pos[3][0], this.pos[3][1], this.pos[4][0], this.pos[4][1]);
          }
      
          if ((power + this.charCode) % 3 === 0) {
            w.line(this.pos[2][0], this.pos[2][1], this.pos[5][0], this.pos[5][1]);
          }
      
          if (w.floor(this.charCode * 2.65) % 3 === 0) {
            w.line(this.pos[3][0], this.pos[3][1], this.pos[5][0], this.pos[5][1]);
          }
      
          if (w.floor(this.charCode * root) % 7 === 0) {
            w.line(this.pos[3][0], this.pos[3][1], this.pos[6][0], this.pos[6][1]);
          }
      
          if (w.floor(this.charCode * power) % 3 === 0) {
            w.line(this.pos[4][0], this.pos[4][1], this.pos[6][0], this.pos[6][1]);
          }
      
          if (w.floor(this.charCode * power - root) % 5 === 0) {
            w.line(this.pos[5][0], this.pos[5][1], this.pos[6][0], this.pos[6][1]);
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

}


let wave = new p5(waveSketch);
let torus = new p5(torusSketch);
let cube = new p5(cubeSketch);
let audio = new p5(audioSketch)
let code = new p5(codeSketch)
let quark = new p5(quarkSketch)
let tephro = new p5(tephroSketch)
let glyph = new p5(glyphSketch)

