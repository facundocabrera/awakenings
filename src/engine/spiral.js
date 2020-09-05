// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

function SpiralV1() {
  let canvas;
  let p1;
  let globalContext;
  let time;
  
  let w = 2;
  let k = 1/8;

  function freq(l) {
    return [ 
      w * Math.exp(k * l) * Math.cos(l),
      w * Math.exp(k * l) * Math.sin(l)
    ];
  }

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

    time = 0;
  }

  function draw() {  
    time += 1;

    if (time > 54) { 
      time = 0;
      w = -w;
      k = k;
    }

    const fragment = 8;
    const l = time * Math.PI / fragment;
    
    // random coloring
    // let c = globalContext.color(getRandomInt(255), getRandomInt(255), getRandomInt(255));
    // c.setAlpha(11);
    canvas.stroke('#5489dd11');

    const p = freq(l);

    if (p1 && time !== 0) {
      canvas.line(
        ...p1,
        ...p
      );
    }

    p1 = p;

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