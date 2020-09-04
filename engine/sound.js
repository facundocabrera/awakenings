const SoundV1 = ((global) => {
  let mic;
  let fft; 
  let canvas;

  function init(canvas) {
    canvas.mousePressed(userStartAudio);
  }

  function setup() {
    fft = new p5.FFT();
    
    mic = new p5.AudioIn();
    mic.start();

    fft.setInput(mic);

    canvas = createGraphics(canvasWidth, canvasHeight);
  }

  function memo(fn, limit) {
    let calls = 0;
    let ret;

    return (...args) => {
      calls++;

      if (calls > limit) {
        ret = null;
        calls = 0;
      }

      if (!ret)
        ret = fn(...args);
  
      return ret;
    };
  }

  function draw() {  
    canvas.clear();
    canvas.push();

    canvas.translate(canvasWidth / 2, canvasHeight / 2);
    canvas.rotate(PI / 4);
    
    fft.analyze();

    let freqs = [
      [60, 250], [250, 500], [500, 2000], [2000, 4000], [4000,6000], [6000, 20000]
    ].map(f => fft.getEnergy(...f));

    freqs = freqs.filter(v => v > 0);

    if (freqs.length === 6) {
      let c = color((freqs[0] + freqs[1]) / 2, (freqs[2] + freqs[3]) / 2, (freqs[4] + freqs[5]) / 2);
      
      const points = freqs.map((f, index) => ({
        x: 500 * Math.cos(Math.PI / f * frameCount + Math.PI / 3 * index),
        y: 500 * Math.sin(Math.PI / f * frameCount + Math.PI / 3 * index)
      }));

      c.setAlpha((freqs[0] + freqs[1]) / 64);
      
      canvas.fill(c);
      canvas.stroke(c);
      canvas.strokeWeight(2);
      canvas.circle(0, 0, 1000);

      c.setAlpha(10);
      canvas.fill(c);

      c.setAlpha(221);
      canvas.stroke(c);

      canvas.bezier(...points.slice(0, 4).map(({x, y}) => [x, y]).flat());
      canvas.bezier(
        ...points.slice(0, 4).map(({x, y}) => [x, y]).flat().reverse()
      );
      canvas.bezier(...points.slice(2).map(({x, y}) => [x, y]).flat());
      canvas.bezier(...points.slice(2).map(({x, y}) => [x, y]).flat().reverse());
    }
    
    canvas.pop();

    return canvas;
  }

  return {
    init,
    setup,
//     draw: memo(draw, 5)
    draw
  };

})(this);
