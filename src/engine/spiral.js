// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

function SpiralV1() {
  let canvas;
  let p1;
  let globalContext;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function setup({
    ctx, canvasWidth, canvasHeight
  }) {
    globalContext = ctx;

    canvas = globalContext.createGraphics(canvasWidth, canvasHeight);
    canvas.translate(canvasWidth / 2, canvasHeight / 2);
    canvas.rotate(2 * Math.PI / 3)
  }

  function draw() {  
    const fragment = 33;

    const step = globalContext.frameCount % (fragment * 5);

    const l = step * Math.PI / fragment;

//     if (frameCount % 11)
//       canvas.clear();

    if (step % 12 === 0) {
      canvas.rotate(Math.PI / 12);
      
      let c = globalContext.color(getRandomInt(255), getRandomInt(255), getRandomInt(255));
      c.setAlpha(11);
      canvas.stroke(c);
    }
      

    canvas.push();
    
    //canvas.rotate(Math.PI / 32);

    const w = getRandomInt(32);
    const k = 1/Math.PI;
    const p = [
      w * Math.exp(k * l) * Math.cos(l), 
      w * Math.exp(k * l) * Math.sin(l)
    ];

    
    canvas.strokeWeight(1);
//     canvas.strokeJoin(ROUND);

    if (p1) {
      canvas.line(
        ...p1,
        ...p
      );
    }

    p1 = p;

    canvas.pop();

    return canvas;
  }

  return {
    setup,
    draw
  };
};

export {
  SpiralV1
};