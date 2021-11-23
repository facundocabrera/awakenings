import { checkDrawable } from "../../qi/interfaces";
import { random_vector, fixed_vector } from "../../math/vector";
import { mult } from "../../geometry/vector";
import { Cluster } from "../../neural/layer";

const DataProvider = (drawable) => {
  checkDrawable(drawable);

  const inputs = 30;
  // Estoy usando los 3 outputs como [x,y,z] en la grafica
  const cloud = Cluster.fromArray([inputs, 6, 3]);

  const draw = (props) => {
    const cloud_vector = cloud.compute(mult(random_vector(inputs), 10));

    drawable.draw({
      ...props,
      cloud_vector,
    });
  };

  return {
    ...drawable,
    draw,
  };
};

export { DataProvider };
