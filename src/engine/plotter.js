import p5 from 'p5';

const PlotterV1 = (global) => {
  let stats = [0,0,0,0,0,0,0,0,0,0];
  let canvas;

  function setup() {
    global.layers = layers.filter(({disabled=false})=>!disabled);
    
    canvas = p5.createGraphics(canvasWidth, canvasHeight);
    
    // si logro hacer que los clocks dependan del frameCount, me olvido de todo
    global.layers.forEach(layer => {
      layer.clock = inc(layer.clock_unit);
    });
  }

  function draw() {   
    global.layers.forEach(context => {
        const {clock, waves, color, width=1, rotate = 0, draw = 'bezier'} = context;

        canvas.push();

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
        });

        canvas.noFill();

        switch(draw) {
          case 'bezier':
          case 'curve': {
            const [one, two, three, four] = points;

            canvas[draw](one.x, one.y, two.x, two.y, three.x, three.y, four.x, four.y);

            const d = dist(one.x, one.y, four.x, four.y);

            stats[(d+'')[0]]++;

            // al incrementar x frame, frameCount representa el total
            // console.log(stats.map(x => Math.round(x / frameCount * 100)));
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
    });

    return canvas;
  }

  return {
    setup,
    draw
  }
};

export {
  PlotterV1
};