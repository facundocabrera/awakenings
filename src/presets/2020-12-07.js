import { defaults } from "./defaults";

import { pick } from "../utils/array";
import { sin, cos, sqrt, tan } from "mathjs";
import { camelCase, range } from "lodash";

import { stops } from "../geometry/circle";
import { multiByScalar } from "../geometry/scale";
import { centroid, middle_vector } from "../geometry/vector";

const { PI } = Math;

const mapping = ["#7FFF00", "#FF1493", "#8A2BE2", "#C0C0C0", "#FFD700", "#C42035"];

function* recursion(seed, width) {
  let points = multiByScalar(seed, width);
  let g = [gmetry(points)];
  let countG = 0;

  while (true) {
    yield g[countG];

    // calculo los gmetry en base a todos los hexagonos
    g[countG].hexagons.forEach(h => {
      g.push(gmetry(h));
    });

    countG++;
  }
};

const gmetry = (points) => {
  const center = centroid(points);

  const middles = [
    middle_vector(...points[0], ...points[1]),
    middle_vector(...points[1], ...points[2]),
    middle_vector(...points[2], ...points[3]),
    middle_vector(...points[3], ...points[4]),
    middle_vector(...points[4], ...points[5]),
    middle_vector(...points[5], ...points[0]),
  ];

  const internal = points.map(p => middle_vector(...center, ...p));

  const lines = [
    [ middles[2], internal[3], middles[3], points[3] ],
    [ middles[4], internal[5], middles[5], points[5] ],
    [ middles[0], internal[1], middles[1], points[1] ],
  ];

  const axis = [
    [ center, internal[0], points[0] ],
    [ center, internal[2], points[2] ],
    [ center, internal[4], points[4] ],
  ];

  const faceCentroids = lines.map(l => centroid(l)); 
  const crystals = [
    faceCentroids[1],
    faceCentroids[2],
    faceCentroids[0],
    middles[3], 
    points[4], 
    middles[4]
  ];

  const heart = centroid(crystals);

  const hexagons = [
    [points[4], middles[4], internal[5], center, internal[3], middles[3]],
    [internal[5], middles[5], points[0], middles[0], internal[1], center],
    [center, internal[1], middles[1], points[2], middles[2], internal[3]]
  ];

  return {
    points,
    center,
    middles,
    internal,
    lines, 
    axis,
    crystals,
    heart,
    hexagons
  };
}


const preset = defaults([{
  painter: "XY4",
  next: ((iterator) => (time) => iterator.next(time).value)(recursion(stops(6), 500))
}]);

preset.background = "#000";
preset.frameRate = 1;

preset.setup = (canvas, global) => {
  canvas.rotate(PI / 6);
};

preset.draw = (context, time, canvas, global) => {
  // global.clear();
  canvas.clear();

  context.forEach(local => {
    const { lines, hexagons, points, middles, internal } = local.next(time);
  
    // if (time > 5) global.noLoop();

    canvas.noFill();

    canvas.stroke(pick(mapping, time));
    canvas.strokeWeight(2);
    lines.forEach(line => { 
      canvas.beginShape();
      line.forEach(p => canvas.vertex(...p));
      canvas.endShape(global.CLOSE);
    });
    
    // canvas.noFill();
    // axis.forEach(line => { 
    //   canvas.beginShape();
    //   line.forEach(p => canvas.vertex(...p));
    //   canvas.endShape();
    // });

    // crystals.forEach(p => {
    //   canvas.fill(mapping[3]);
    //   canvas.stroke(mapping[3]);
    //   canvas.ellipse(...p, 10);
    // });
    
    // canvas.noFill();
    // canvas.beginShape();
    // crystals.forEach(p => canvas.vertex(...p));
    // canvas.endShape(global.CLOSE);

    // canvas.stroke(mapping[0]);
    // canvas.ellipse(...heart, 20);
    
    canvas.noFill();
    canvas.stroke('#FFD70077');
    canvas.strokeWeight(2);
    hexagons.forEach(hexa => { 
      canvas.beginShape();
      hexa.forEach(p => canvas.vertex(...p));
      canvas.endShape(global.CLOSE);
    });

    // // los puntos van al final para debugging
    // canvas.fill('white');
    // canvas.stroke('white');
    // canvas.ellipse(...center, 10);

    // points.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // })
    // middles.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // });
    // internal.forEach((p, i) => {
    //   canvas.fill(mapping[i]);
    //   canvas.stroke(mapping[i]);
    //   canvas.ellipse(...p, 10);
    // });
  });

};

export default preset;
