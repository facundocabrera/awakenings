// Experimento de flor de la vida con solamente 4 vertices.

const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

import { stops } from "../geometry/circle";
import { line_points } from "../geometry/line";

const scale = (elements, by) => elements.map(([x, y]) => [x * by, y * by]);

const mapping = ["#FFFA12", "#57E78C", "#FC61DD", "#FFFFFF"];

const unity = 70;

const vertices = stops(12);

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  // 👁👁👁
  // Circulo inicial, por ahora esta es la solucion mas simple que se me ocurrio
  // pero equivale a la X^0, basicamente el primer paso de la secuencia.
  if (t === 0) return [[[0, 0]], 0];

  let vertex = [];

  for (let i = 0; i < vertices.length - 1; i++) {
    let points = line_points(
      ...vertices[i].map((v) => v * t),
      ...vertices[i + 1].map((v) => v * t)
    );

    if (i > 0) {
      points = points.slice(1);
    }

    vertex = [...vertex, ...points];
  }

  // 👁👁👁 Conectamos el ultimo punto con el primero
  vertex = [
    ...vertex,
    ...line_points(
      ...vertices[vertices.length - 1].map((v) => v * t),
      ...vertices[0].map((v) => v * t)
    ).slice(1),
  ];

  // console.log('vertices', vertices);
  // console.log('puntos', vertex);

  return [scale(vertex, unity / 2), t];
}

const preset = [
  {
    painter: "XY3",
    fn: pointAtom,
  },
];

// General Engine Control Settings
preset.canvasSize = [1080, 1080];
preset.fullScreen = false;

preset.frameRate = 1;
preset.background = "#000";
preset.time = 0; // 👁👁👁 time starts from 0

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {};

preset.draw = ([[vertex, t]], canvas, global) => {
  // 👁👁👁 numero de loops que quiero para dibujar inicialmente.
  if (t > 5) global.noLoop();

  canvas.noFill();
  canvas.stroke("green");

  vertex.map((v) => {
    canvas.ellipse(...v, unity);
  });
};

export default preset;
