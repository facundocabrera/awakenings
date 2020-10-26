import { angle_between, distance, middle_vector } from '../geometry/vector';

function spherenit({
  context,
  canvas,
  vertex
}) {  
  let last = 0;

  console.log(vertex);

  // la energia fluye de derecha a izquierda
  // los angulos se miden comenzando desde el punto (1, 0)
  // 🧠⚡️❤️ esto es un estandar en la construccion de las figuras y puntos
  for(let i=0; i < vertex.length; i++) {   
    const v1 = vertex[i];
    const v2 = vertex[(i+1) % vertex.length];
    const m = middle_vector(...v1, ...v2);
    const d = distance(...m, ...v1);

    const angle = angle_between(...v1, ...v2);
    const elgna = angle_between(...m, ...v2) / 2;

    canvas.fill(context.color);
    canvas.stroke(context.color);
    // canvas.ellipse(...v1, 10);
    // canvas.ellipse(...v2, 10);
    // canvas.line(0,0, ...v1);
    // canvas.line(0,0, ...v2);

    // canvas.fill(context.centroid);
    // canvas.stroke(context.centroid);
    // canvas.ellipse(...m, 10);
    
    // canvas.stroke('yellow');
    canvas.arc( ...m, 2 * d, 2 * d, last - elgna, angle + last + elgna);

    last = angle + last;
  }


}

export {
  spherenit
};
