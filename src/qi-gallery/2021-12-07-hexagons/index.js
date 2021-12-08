import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Canvas, ComposePainter } from "../../qi/interfaces";
import { XY } from "../../qi-axis";

import { DataProvider } from "./data";

const { PI, pow } = Math;

const mapping = [
  "#7FFF00",
  "#FF149355",
  "#8A2BE2",
  "#C0C0C0",
  "#FFD70055",
  "#C42035",
];

const View = () => {
  let ui;
  let origin;

  const setup = ({ ctx, dimensions: { center } }) => {
    ui = ctx;
    // ui.rotate(PI / 6);

    origin = center;
  };

  const draw = ({
    points,
    center,
    middles,
    internal,
    lines,
    axis,
    crystals,
    heart,
    hexagons,
    time,
  }) => {
    // if (time > pow(3, 3)) ui.noLoop();

    ui.translate(...origin);
    ui.rotate(PI / 6);

    ui.noFill();

    ui.stroke("#FF149311");
    ui.strokeWeight(1);
    hexagons.forEach((hexa) => {
      ui.beginShape();
      hexa.forEach((p) => ui.vertex(...p));
      ui.endShape(ui.CLOSE);
    });

    ui.stroke("#FF149399");
    ui.strokeWeight(3);
    lines.forEach((line) => {
      ui.beginShape();
      line.forEach((p) => ui.vertex(...p));
      ui.endShape(ui.CLOSE);
    });

    //     ui.noFill();
    //     axis.forEach((line) => {
    //       ui.beginShape();
    //       line.forEach((p) => ui.vertex(...p));
    //       ui.endShape();
    //     });

    //     crystals.forEach((p) => {
    //       ui.fill(mapping[3]);
    //       ui.stroke(mapping[3]);
    //       ui.ellipse(...p, 10);
    //     });

    //     ui.noFill();
    //     ui.beginShape();
    //     crystals.forEach((p) => ui.vertex(...p));
    //     ui.endShape(ui.CLOSE);

    //     ui.stroke(mapping[0]);
    //     ui.ellipse(...heart, 20);

    // los puntos van al final para debugging
    // ui.fill("white");
    // ui.stroke("white");
    // ui.ellipse(...center, 10);

    // points.forEach((p, i) => {
    //   ui.fill(mapping[i]);
    //   ui.stroke(mapping[i]);
    //   ui.ellipse(...p, 10);
    // });
    // middles.forEach((p, i) => {
    //   ui.fill(mapping[i]);
    //   ui.stroke(mapping[i]);
    //   ui.ellipse(...p, 10);
    // });
    // internal.forEach((p, i) => {
    //   ui.fill(mapping[i]);
    //   ui.stroke(mapping[i]);
    //   ui.ellipse(...p, 10);
    // });
  };

  return {
    name: "View",
    setup,
    draw,
  };
};

const frameRate = 15;
const canvasSize = [1080, 1080];

export const skeleton = ComposePainter([DataProvider(View())]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate,
    canvasSize,
  })
);
