let time;

// const f = 6;

// const layers = [
// //     {
// //         disabled: true,
// //         waves: [{
// //             fn: kepler,
// //             freq: 1/7,
// //             phase: Math.PI / 5,
// //             radius: 300,
// //         }, {
// //             fn: unstablePhase,
// //             freq: 11/27,
// //             phase: Math.PI / 7,
// //             radius: 600,
// //         }, ],
// //         rotate: Math.PI / 2,
// //         color: '#00DD5511'
// //     },
//         {
//         disabled: true,
//         waves: [{
//             fn: classicFrequencyMapping,
//             freq: 1/f,
//             //phase: Math.PI / 2,
//             radius: 150
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/(f * f),
//             //phase: Math.PI / -2,
//             radius: 300
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/(f * f * f),
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/(f * f * f * f),
// //             phase: Math.PI / 2,
//             radius: 500
//         },],
//         rotate: Math.PI / -2,
//         color: '#55FF5511'
//     },
//         {
//         disabled: true,
//         waves: [{
//             fn: classicFrequencyMapping,
//             freq: 1/4,
//             //phase: Math.PI / 2,
//             radius: 500
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             //phase: Math.PI / -2,
//             radius: 500
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/32,
// //             phase: Math.PI / 2,
//             radius: 500
//         },],
//         rotate: Math.PI / -2,
//         color: '#FFDD5511'
//     },
//     {
//         disabled: true,
//         waves: [{
//             fn: classicFrequencyMapping,
//             freq: 1/2,
//             //phase: Math.PI / 2,
//             radius: 400
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/4,
//             //phase: Math.PI / -2,
//             radius: 400
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },],
//         rotate: Math.PI / -2,
//         color: '#00DD5511'
//     },
//     {
//         disabled: true,
//         waves: [{
//             fn: kepler,
//             freq: 1/2,
//             //phase: Math.PI / 2,
//             radius: 500
//         }, {
//             fn: kepler,
//             freq: 1/4,
//             //phase: Math.PI / -2,
//             radius: 500
//         }, {
//             fn: kepler,
//             freq: 1/64,
//             //phase: Math.PI / -2,
//             radius: 500
//         },{
//             fn: kepler,
//             freq: 1/128,
//             //phase: Math.PI / -2,
//             radius: 500
//         },],
//         //rotate: Math.PI / -2,
//         color: '#FF555511'
//     },
//     {
//         // serie insectos
//         // rey
//         //disabled: true,
//         waves: [{
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             //phase: Math.PI / 2,
//             radius: 500
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/32,
// //             phase: Math.PI / -2,
//             radius: 500
//         }, {
//             fn: classicFrequencyMapping,
//             freq: 1/54,
//             //phase: Math.PI / -2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / -2,
//             radius: 500
//         },],
//         rotate: Math.PI / +2,
//         color: '#FF550011'
//     },
// ];

let canvasWidth = 1080;
let canvasHeight = 1080;

let mainCanvas;
let stats = [0,0,0,0,0,0,0,0,0,0];

function setup() {
    // override manual screen size
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;

    mainCanvas = createCanvas(canvasWidth, canvasHeight);

    background(0);

    frameRate(54);

    time = inc(1);

    layers.forEach(layer => {
      layer.clock = inc(layer.clock_unit);
      layer.canvas = createGraphics(canvasWidth, canvasHeight);
    });
}

function draw() {
    const enabled = layers.filter(({disabled=false})=>!disabled);

    enabled.forEach(context=>{
        const {clock, canvas, waves, color, width=1, rotate = 0, draw = 'bezier'} = context;

        canvas.push();

        if (frameCount % 7 === 0)
            canvas.clear();

        canvas.stroke(color);
        canvas.strokeWeight(width);
        canvas.translate(canvasWidth / 2, canvasHeight / 2);
        canvas.rotate(rotate);

        const tValue = clock.next().value;

        const points = waves.map(waveContext=>{
            const {fn} = waveContext;

            let point;

            // nueva version que soporta redefinir la function
            if (fn)
                point = fn.apply(waveContext, [tValue]);
            else
                point = harmonic(waveContext)(tValue);

            return point;
        }
        );

        canvas.noFill();

        switch(draw) {
          case 'bezier':
          case 'curve': {
            const [one, two, three, four] = points;

            canvas[draw](one.x, one.y, two.x, two.y, three.x, three.y, four.x, four.y);

            const d = dist(one.x, one.y, four.x, four.y);

            stats[(d+'')[0]]++;

            // al incrementar x frame, frameCount representa el total
            console.log(stats.map(x => Math.round(x / frameCount * 100)));
            break;
          }
          case 'lines': {
            canvas.beginShape(LINES);
            points.map(({ x, y }) => canvas.vertex(x, y));
            canvas.endShape();
            break;
          }
        }

        canvas.pop();
    }
    );

    enabled.forEach(({canvas})=>{
        image(canvas, 0, 0);
    }
    );
}

function mousePressed() {
  const now = new Date().toISOString();
  const name = 'out' + now;

  saveCanvas(mainCanvas, name, 'png');
  downloadFile(new Blob([snapshot(layers)], {type : 'application/json'}), name, 'json');
}
