import { Benford } from './benford';

const SoundV1 = (global) => {
  let globalContext;
  let canvas, width, height;

  let mic;
  let fft;

  const metric = Benford();

  const colors = [
    '#DE0004',
    '#ECF20E',
    "#63FF07",
    '#AB27EF',
    '#149EEF'
  ].reverse();
  
  // Imaginate que me armo un rando de 16 opciones.
  // Es el minimo que me permite la libreria.
  // Esto tiene impacto directo en las muestras que estoy tomando
  // pero para hacer graficos, no hace falta usar tanta informacion
  const bins = 256;

  function setup({ ctx, canvasWidth, canvasHeight }) {
    globalContext = ctx;
    width = canvasWidth;
    height = canvasHeight;

    fft = new p5.FFT(0.618, bins);

    mic = new p5.AudioIn();
    mic.start();

    fft.setInput(mic);

    canvas = globalContext.createGraphics(width, height);
    canvas.translate(width / 2, height / 2);
    canvas.noFill();
    canvas.strokeWeight(2);
  }

  function draw() {
    if (globalContext.frameCount % 60 * 7) {
      canvas.background(0);
      canvas.rotate(Math.PI / 7);
    }

    fft.analyze().filter(v => v > 0).forEach(element => {
      metric.add(element);
    });

    const energy = ["bass", "lowMid", "mid", "highMid", "treble"]
      .map(v => 4 * Math.round(fft.getEnergy(v)));

    canvas.stroke(colors[globalContext.frameCount % 5]);
    canvas.quad(
      0, 0, 
      energy[0], 0, 
      energy[0], energy[4], 
      0, energy[4]
    );
    canvas.quad(
      0, 0, 
      -1 * energy[0], 0, 
      -1 * energy[0], -1 * energy[4], 
      0, -1 * energy[4]
    );

    energy.forEach((amplitude, index) => {
      canvas.stroke(colors[index]);
      canvas.ellipse(0,0, amplitude, amplitude);
    });

    return canvas;
  }

  return {
    setup,
    draw,
  };
};

export { SoundV1 };
