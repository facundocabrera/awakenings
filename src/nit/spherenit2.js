const { PI, sqrt, pow } = Math;

import { angle_between, distance, middle_vector } from '../geometry/vector';

function spherenit({
  context,
  canvas,
  vertex
}) {  
  // la energia fluye de derecha a izquierda
  // los angulos se miden comenzando desde el punto (1, 0)
  // 🧠⚡️❤️ esto es un estandar en la construccion de las figuras y puntos
  for(let i=0; i < vertex.length; i++) {
    const v1 = vertex[i];
    const v2 = vertex[(i+1) % vertex.length];

    const m = middle_vector(...v1, ...v2);
    const d = distance(...m, ...v1);

    // const angle = angle_between(...v1, ...v2);

    canvas.stroke(context.color);

    // canvas.push();
    // canvas.noFill();
    // canvas.translate(...m);
    // canvas.rotate(angle);
    canvas.ellipse(...m, 6 * d);
    // canvas.arc(0, 0, 2 * d, 2 * d, angle, angle + PI);
    // canvas.pop();
    
    // canvas.fill(context.color);
    // canvas.ellipse(...v1, 10);
    // canvas.ellipse(...v2, 10);

    // canvas.stroke('red');
    // canvas.fill('red');
    // canvas.ellipse(...m, 10);

  }


}

export {
  spherenit
};
