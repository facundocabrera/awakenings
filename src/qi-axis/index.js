import { checkDrawable } from "../qi/interfaces";

const XY = (drawable) => {
  checkDrawable(drawable);

  function setup(args) {
    const { ctx, dimensions: { from, to, center }} = args;
    
    // color de las lineas
    ctx.stroke("#FFFFFF55");
    ctx.strokeWeight(1);
    
    // vertical
    ctx.line(
      center[0], from[1], 
      center[0], to[1]
    );

    // horizontal
    ctx.line(
      from[0], center[1], to[0], center[1]
    );

    drawable.setup(args);
  }

  return {
    ...drawable,
    setup,
  };
};

export { XY };
