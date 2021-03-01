import { BaseLayer } from "../../qi/base-layer";
import { Environment } from "../../qi/sketch";
import { Painter, Canvas, ComposePainter } from "../../qi/interfaces";

import { sum } from "../../geometry/vector";

const { PI, cos, sin } = Math;
const DPI = 2 * PI;

const polar = (arc, r) => [r * cos(arc), r * sin(arc)];

const circlePoint = ({freq, radius, center, time}) => {
  // ΛΘ / Λt => variacion del angulo con respecto al tiempo.
  const arc = (DPI / freq) * time;

  // con el angulo, calculo donde esta el punto
  const point = polar(arc, radius);

  // muevo el centro de al definido como parametro
  const recentered = sum(center, point);

  return recentered;
}

export const GenericPainter = (circles, color) => {
  let ui;
  let w, h;
  let last;

  const loop = time => {
    let center = [0, 0];
    const points = [];

    circles.forEach(circleProps => {
      const currentPoint = circlePoint({ ...circleProps, center, time });
      
      points.push(currentPoint);

      center = currentPoint;
    });

    return points;
  };


  function setup({ ctx, dimensions: { to: [ canvasWidth, canvasHeight ] } }) {
    ui = ctx;
    w = canvasWidth;
    h = canvasHeight;
  }

  function draw({ time }) {
    const points = loop(time);
    const current = points.slice(-1)[0];

    if (!last) {
      last = current;
      return;
    }   

    ui.push();
    ui.translate(w/2, h/2);

    ui.noFill();
    ui.stroke(color);
    ui.strokeWeight(4);

    ui.line(...last, ...current);
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
const FRAME_RATE = 60;

// subir o bajar la calidad del dibujo.
const hq = 20;

const c1 = [
  { freq: 10 * hq, radius: 100 },
  { freq: -30 * hq, radius: 150 },
  { freq: 30 * hq, radius: 100 },
  { freq: -30 * hq, radius: 150 }
];

const c2 = [
  { freq: -10 * hq, radius: 100 },
  { freq: -30 * hq, radius: 150 },
  { freq: 30 * hq, radius: 100 },
  { freq: -30 * hq, radius: 150 }
];

export const skeleton = ComposePainter([
  GenericPainter(c1, "#F500F577"),
  GenericPainter(c2, "#7500F577"),
]);

export const sketch = Environment(
  BaseLayer({
    ...Canvas(skeleton),
    frameRate: FRAME_RATE,
  })
);