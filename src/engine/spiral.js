// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

const { pink } = require("color-name");

function SpiralV1(presets) {
  let canvas;
  let p1;
  let globalContext;
  let time;
  
  let stop1, stop2;

  function setup({
    ctx, canvasWidth, canvasHeight
  }) {
    globalContext = ctx;

    canvas = globalContext.createGraphics(canvasWidth, canvasHeight);
    canvas.translate(canvasWidth / 2, canvasHeight / 2);
    //canvas.rotate(Math.PI / 2);

    time = 0;

    // pongo stops en los estremos del canvas
    // (-w/4, 0) (+w/4, 0)
    stop1 = [-400, -400];
    stop2 = [400, 400];
  }

  function draw() {  
    time += 0.1;

    // if (time > 35) {
    //   time = 0;
    // }

    if (canvas.frameCount % 7 === 0)
      canvas.clear();

    presets.forEach(context => {
      // 👁 pending rotate support
      const {waves, color, width = 1, rotate = 0, draw = 'bezier'} = context;
      
      const points = waves.map(waveContext => {
        const { fn, freq, phase = 0 } = waveContext;

        return fn.apply(waveContext, [time * Math.PI * freq + phase]);
      });

      if (rotate !== 0) {
        canvas.push();
        canvas.rotate(rotate);
      }

      canvas.noFill();
      canvas.stroke(color);
      canvas.strokeWeight(width);

      switch(draw) {
        case 'bezier':
        case 'curve': {
          canvas[draw](...stop1, ...points[0], ...points[1], ...stop2);
          break;
        }
        case 'lines': {
          canvas.line(...points[0], ...points[1]);
          break;
        }       
      }

      if (rotate !== 0) {
        canvas.pop();
      }

    });

    return canvas;
  }

  return {
    setup,
    draw
  };
};

export {
  SpiralV1
};