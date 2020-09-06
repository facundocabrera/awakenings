// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

function SpiralV1(presets) {
  let canvas;
  let globalContext;
  let time;

  function setup({
    ctx, canvasWidth, canvasHeight
  }) {
    globalContext = ctx;

    canvas = globalContext.createGraphics(canvasWidth, canvasHeight);
    canvas.translate(canvasWidth / 2, canvasHeight / 2);
    //canvas.rotate(Math.PI / 2);

    time = 0;
  }

  function draw() {  
    time += 0.1;

    if (time > 128) {
      time = 0;
    }

    if (canvas.frameCount % 7 === 0)
      canvas.clear();

    presets.forEach(context => {
      const {waves, color, width = 1, rotate = 0, draw = 'bezier', stop1, stop2} = context;
      
      const points = waves.map(({fn, ...context}) => fn.apply(context, [time]));

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