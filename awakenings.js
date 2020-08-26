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

    frameRate(30);

    time = inc(1);

    layers.forEach(layer => layer.canvas = createGraphics(canvasWidth, canvasHeight));
}

function draw() {
    const tValue = time.next().value;

    const enabled = layers.filter(({disabled=false})=>!disabled);

    enabled.forEach(context=>{
        const {canvas, waves, color, width=1, closed, rotate = 0} = context;

        canvas.push();

        if (frameCount % 7 === 0)
            canvas.clear();

        canvas.stroke(color);
        canvas.strokeWeight(width);
        canvas.translate(canvasWidth / 2, canvasHeight / 2);
        canvas.rotate(rotate);

        //canvas.beginShape(LINES);
        const points = waves.map(waveContext=>{
            const {fn} = waveContext;

            let point;

            // nueva version que soporta redefinir la function
            if (fn)
                point = fn.apply(waveContext, [tValue]);
            else
                point = harmonic(waveContext)(tValue);

            //canvas.vertex(point.x, point.y);

            return point;
        }
        );

        //canvas.endShape();

        const [one, two, three, four] = points;

        canvas.noFill();
//         canvas.bezier(one.x, one.y, one.x + two.x, one.y, two.x, two.y, two.x - one.x, two.y);
        //canvas.bezier(one.x, one.y, 0,0, two.x, two.y, 0,0);
        canvas.bezier(one.x, one.y, two.x, two.y, four.x, four.y, three.x, three.y);

        const d = Math.sqrt(Math.pow(one.x - two.x, 2) + Math.pow(one.y - two.y, 2));

        stats[(d+'')[0]]++;

        // al incrementar x frame, frameCount representa el total
        console.log(stats.map(x => Math.round(x / (frameCount * enabled.length) * 100)));

        canvas.pop();
    }
    );

    enabled.forEach(({canvas})=>{
        image(canvas, 0, 0);
    }
    );
}

function mousePressed() {
    // document.body.appendChild(new Image).src = mainCanvas.elt.toDataURL('image/webp', 1.0);
    saveCanvas(mainCanvas, 'out', 'png');
}
