/**
 * Stringify settings to reproduce the graphic you are capturing.
 */

function snapshot(layers = []) {
  // por el momento, con estas estamos
  const snapshotLayerSettings = ({
    clock_unit,
    draw,
    waves,
    rotate,
    color
  }) => ({ clock_unit, draw, waves, rotate, color });

  // agregar soporte para que use el nombre de las funciones cuando
  // convertimos a JSON.
  const replacer = (key, value) => {
    if (typeof value === 'function') {
      return value.name;
    }

    return value;
  }

  const data = layers.filter(({ disabled }) => !disabled).map(snapshotLayerSettings);

  return JSON.stringify(data, replacer, 2);
}
