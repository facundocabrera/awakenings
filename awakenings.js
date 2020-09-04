let canvasWidth = 1080;
let canvasHeight = 1080;

let soundQueue = FIFO(5);
let frequencyQueue = FIFO(5);

let mainCanvas;
let stats = [0,0,0,0,0,0,0,0,0,0];

function setup() {
    // override manual screen size
    canvasWidth = windowWidth < canvasWidth ? windowWidth : canvasWidth;
    canvasHeight = windowHeight < canvasHeight ? windowHeight : canvasHeight;

    mainCanvas = createCanvas(canvasWidth, canvasHeight);
    SoundV1.init(mainCanvas);

    background(0);

    frameRate(30);

    PlotterV1.setup();
    SoundV1.setup();
}

function draw() {
    if (frameCount % 11) {
        mainCanvas.background(0);
        soundQueue.push(SoundV1.draw());
        frequencyQueue.push(PlotterV1.draw());
    }

    [...soundQueue.get(), ...frequencyQueue.get()].map(canvas => {
        if (canvas) {
            image(canvas, 0, 0);
        }
    });
}

// function keyPressed() {
//   const now = new Date().toISOString();
//   const name = 'out' + now;

//   saveCanvas(mainCanvas, name, 'png');
//   downloadFile(new Blob([snapshot(layers)], {type : 'application/json'}), name, 'json');
// }
