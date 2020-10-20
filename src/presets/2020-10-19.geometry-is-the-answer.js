// Experimento de flor de la vida con solamente 4 vertices.

const { PI, cos, sqrt, pow, atan, abs, round, asin, sin, floor } = Math;

import { line_points } from "../geometry/line";

const scale = (elements, by) => elements.map(([x, y]) => [x * by, y * by]);

const mapping = [
  '#FFFA12',
  '#57E78C',
  '#FC61DD',
  '#FFFFFF'
];

const unity = 89;

const vertices = [
  // real
  [ unity,  0],
  [ 0,  unity],
  // imaginary (mirror of real)
  [-1 * unity,  0], 
  [ 0, -1 * unity]
];

function pointAtom(t) {
  if (!Number.isFinite(t)) throw "fn.pointAtom / Invalid time parameters";

  // 👁👁👁
  // Circulo inicial, por ahora esta es la solucion mas simple que se me ocurrio
  // pero equivale a la X^0, basicamente el primer paso de la secuencia.
  if (t === 0)
    return [[[0,0]], 0];

  // 👁👁👁
  // el orden de los parametros es importante, ya que si cambiamos la pendiente, los puntos
  // que son calculados en el centro, son diferentes.
  const l1 = scale(line_points(0, t, t,0, sqrt(2)), unity / 2);
  const l2 = scale(line_points(-1 *t, 0, 0, -1 * t, sqrt(2)), unity /2);

  const vertex = [...l1, ...l2];

  return [ vertex, t ];
}

const preset = [
  {
    painter: "XY3",
    fn: pointAtom
  },
];

// General Engine Control Settings
preset.canvasSize = [1080,1080];
preset.fullScreen = false;

preset.frameRate = 1;
preset.background = '#000';
preset.time = 0; // 👁👁👁 time starts from 0

// Axis coordinates
preset.axis = false;
preset.center = (width, height) => {
  return [width / 2, height / 2];
};

preset.setup = (canvas, global) => {
  global.noLoop();
  canvas.rotate(PI / 4);
};

preset.draw = ([ [ vertex, t ] ], canvas, global) => {
  // 👁👁👁 numero de loops que quiero para dibujar inicialmente.
  if (t > 9)
    global.noLoop();

  canvas.noFill();
  canvas.stroke('green');

  vertex.map(v => {
    canvas.ellipse(...v, unity);
  });

  canvas.push();
  canvas.rotate(PI / 2);
  canvas.stroke('white');
  vertex.map(v => {
    canvas.ellipse(...v, unity);
  });
  canvas.pop();
};

export default preset;