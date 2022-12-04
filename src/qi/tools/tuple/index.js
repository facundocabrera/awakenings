/**
 * Experiment with tagged templates to create a better API for indexes.
 *
 * Ideas:
 * 1. Abstract from the storage implementation.
 * 2. Limit checks before access to the storage to prevent out of range.
 * 3. Using [] operator doesn't provides enough flexibility and abstraction.
 * 4. opcodes are custom operations we could call just from the definition of the indexes.
 */

const tuple = (dimensions, limit) => {
  const [density, width, height] = dimensions;
  const l = dimensions.length;

  let compute;

  switch (l) {
    case 1:
      compute = (x) => x * density;
      break;
    case 2:
      compute = (x, y) => y * width * density + x * density;
      break;
    case 3:
      compute = (x, y, z) =>
        z * height * width * density + y * width * density + x * density;
      break;
    default:
      throw Error("Generalize the algoritm");
  }

  /**
   * opcode:
   * 1. An easy way to change the compute op by another implementation.
   * 2. Also looks promising for hints while doing the maths.
   * 3. We could disable behaviors on production easily.
   */
  const template = (opcode, ...args) => {
    const index = compute(...args);

    // This satify check could be disable on production adding __DEV__ variable.
    if (index > limit)
      throw Error(
        `out of range, provided: (${args.join(",")}) => ${index}, limit: ${
          limit - 1
        }`
      );

    return index;
  };

  return {
    t: template,
    c: compute,
  };
};

export default tuple;
