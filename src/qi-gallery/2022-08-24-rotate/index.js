import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";
import { freqMapping } from "../../utils/waves";
import { DataProvider } from "./data";

const View = () => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    origin = center;

    ui.background(0);
  };

  const draw = ({ square, line, time }) => {
    const [x, y, arc] = freqMapping({
      time,
      freq: 1 / 16,
      radius: 200,
      phase: 0,
    });

    ui.noFill();
    ui.translate(...origin);

    // origen
    ui.strokeWeight(10);
    ui.stroke("white");
    ui.point(0, 0);

    // centro que rota
    ui.strokeWeight(10);
    ui.stroke("yellow");
    ui.point(x, y);

    // muevo el centro y roto el canvas
    ui.translate(x, y);
    ui.rotate(arc);

    // linea
    ui.strokeWeight(4);
    ui.stroke("green");
    ui.beginShape(ui.LINES);
    line.map((v) => {
      ui.vertex(...v);
    });
    ui.endShape();

    // cuadrado
    ui.beginShape();
    square.map((v) => {
      ui.vertex(...v);
    });
    ui.endShape(ui.CLOSE);
  };

  return {
    name: "View",
    setup,
    draw,
  };
};

const frameRate = 10;
const canvasSize = [1080, 1080];

export const skeleton = ComposePainter([DataProvider(View())]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
