import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Painter, Canvas, ComposePainter } from "../../qi/interfaces";

import { SplitLayout } from "../../qi-horizontal-split/layout";

import { sum, centroid } from "../../geometry/vector";

const { PI, cos, sin } = Math;
const DPI = 2 * PI;

const polar = (arc, r) => [r * cos(arc), r * sin(arc)];

const circlePoint = ({ freq, radius, center, time }) => {
  // ΛΘ / Λt => variacion del angulo con respecto al tiempo.
  const arc = (DPI / freq) * time;

  // con el angulo, calculo donde esta el punto
  const point = polar(arc, radius);

  // muevo el centro de al definido como parametro
  const recentered = sum(center, point);

  return recentered;
};

export const GenericPainter = (circles, color, strokeWeight = 4) => {
  let ui;
  let w, h;
  let last;
  const oids = [];

  const loop = (time) => {
    let center = [0, 0];
    const points = [];

    circles.forEach((circleProps) => {
      const currentPoint = circlePoint({ ...circleProps, center, time });

      points.push(currentPoint);

      center = currentPoint;
    });

    return points;
  };

  function setup({
    ctx,
    dimensions: {
      to: [canvasWidth, canvasHeight],
    },
  }) {
    ui = ctx;
    w = canvasWidth;
    h = canvasHeight;
  }

  function draw({ time }) {
    const points = loop(time);
    const current = points.slice(-1)[0];

    // calculo el centro de todos los puntos que se estan teniendo en cuenta para calcular current.
    const oid = centroid(points);
    oids.push(oid);

    // calculo el centro de los centros acumulados
    const c = centroid(oids);

    if (!last) {
      last = current;
      return;
    }

    ui.push();

    ui.stroke(color);
    ui.strokeWeight(strokeWeight);

    ui.line(...last, ...current);

    ui.noFill();
    ui.stroke("white");
    ui.strokeWeight(1);
    ui.ellipse(...oid, 2);

    ui.stroke("red");
    ui.strokeWeight(1);
    ui.ellipse(...c, 2);

    console.log(c);

    ui.pop();

    last = current;
  }

  return Painter({
    setup,
    draw,
  });
};

//
// Reglas generales.
//
// 1. Circulos grandes al principio para darle altura al dibujo.
// 2. Ademas, giran lentamente para darle tiempo a los demas para que dibujen
//    tranquilos.
// 3. A medida que voy agregando mas, disminuyo el radio y aumento la
//    frecuencia.
// 4. Utilizando el concepto de engranajes, los giros deben ser alternados.
//
// Me falta pensar un poco:
//     Disminuyo el radio y aumento la frecuencia.
//
const FRAME_RATE = 10;

// subir o bajar la calidad del dibujo.
const hq = 100;

const c1 = [
  { freq: 2 * hq, radius: 150 },
  { freq: 3 * hq, radius: 150 },
];

export const skeleton = ComposePainter([
  SplitLayout(GenericPainter(c1, "#F500F577"), 0),
  SplitLayout(GenericPainter(c1, "#F5000077"), 1),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: FRAME_RATE,
    canvasSize: [2 * 1080, 1080],
  })
);
