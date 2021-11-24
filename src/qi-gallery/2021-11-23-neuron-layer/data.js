import { checkDrawable } from "../../qi/interfaces";
import { random_vector, fixed_vector } from "../../math/vector";
import { mult } from "../../geometry/vector";
import { Cluster } from "../../neural/layer";

import { min_max } from "../../vector/min-max";

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const inputs = 300;

  // Estoy usando los 3 outputs como [x,y,z] en la grafica
  const cloud = Cluster.fromArray([inputs, 6, 6, 3]);

  // min/max del output del compute
  const boxes = min_max(3);

  const draw = (props) => {
    const cloud_vector = cloud.compute(mult(random_vector(inputs), 100000));
    const cloud_boxes = boxes(cloud_vector);

    drawable.draw({
      ...props,
      cloud_vector,
      cloud_boxes,
    });
  };

  return {
    ...drawable,
    draw,
  };
};

export { DataProvider };
