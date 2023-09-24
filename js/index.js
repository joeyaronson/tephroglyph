let teph = (w) => {
    w.preload = () => {
        tephroOBJ = w.loadModel('./qr_sketches/tephro.obj');
    }
    w.setup = () => {
        let myCanvas = w.createCanvas(650, 150, w.WEBGL);
        w.angleMode(w.DEGREES)
        myCanvas.parent("tephro");
        w.stroke(0, 255, 0)
        w.strokeWeight(0.4)
        w.fill(0)

    }


    w.draw = () => {
        w.push();
        w.translate(-25,0, -w.cos(w.frameCount)*50-50);
        w.scale(1100);
        w.background(0)
        // w.rotateZ(270);
        w.rotateX(270);
        w.rotateZ(w.cos(w.frameCount/2)*80);
        w.model(tephroOBJ);
        w.pop();
    }

}

let tephro = new p5(teph)
