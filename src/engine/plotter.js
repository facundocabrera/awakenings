import { inc } from './clock';

const PlotterV1 = (preset) => {
  let stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let canvas;
  let globalContext;

  let width, height;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    globalContext = ctx;
    width = canvasWidth;
    height = canvasHeight;

    canvas = globalContext.createGraphics(width, height);

    preset.forEach((p) => {
      p.clock = inc(p.clock_unit);
    });
  }

  function draw() {
    preset.forEach((context) => {
      const {
        clock,
        waves,
        color,
        draw = "bezier",
      } = context;

      canvas.push();

      canvas.stroke(color);
      canvas.translate(width / 2, height / 2);

      const tValue = clock.next().value;

      const points = waves.map((waveContext) => {
        const { fn } = waveContext;

        let point;

        // nueva version que soporta redefinir la function
        if (fn) point = fn.apply(waveContext, [tValue]);
        else point = harmonic(waveContext)(tValue);

        return point;
      });

      // console.log(points);
        
      canvas.noFill();

      // points.map(p => globalContext.ellipse(p.x, p.y, 10, 10));

      switch (draw) {
        case "bezier":
        case "curve": {
          const [one, two, three, four] = points;

          canvas[draw](
            one.x,
            one.y,
            two.x,
            two.y,
            three.x,
            three.y,
            four.x,
            four.y
          );

          const d = globalContext.dist(one.x, one.y, four.x, four.y);

          stats[(d + "")[0]]++;

          // al incrementar x frame, frameCount representa el total
          // console.log(stats.map(x => Math.round(x / frameCount * 100)));
          break;
        }
        case "lines": {
          canvas.beginShape(globalContext.LINES);
          points.map(({ x, y }) => canvas.vertex(x, y));
          canvas.endShape();
          break;
        }
        case 'points': {
          points.map(({ x, y }) => canvas.ellipse(x, y, 10, 10));
        }
      }

      canvas.pop();
    });

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { PlotterV1 };
