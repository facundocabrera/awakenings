import MersenneTwister from "mersenne-twister";

//
// Le doy la distribución de probabilidad acumulada que quiero usar para los 
// outputs que deseo generar.
// 
// const probabilities = [ 0.5, 1 ]; // sistema binario
// const outputs = [ 1 , 2 ];
// 
// const walker = Monte(probabilities, outputs);
// console.log(walker)
//
function MonteCarlo(probabilities, outputs) {
  const generator = new MersenneTwister();

  return () => {
    // Genero un número aleatorio que va entre [0, 1]
    const rand = generator.random();
    
    // Arranco comparando
    let index = 0;
    while(rand > probabilities[index]) {
      index++;
    }

    return outputs[index];
  };
}

export { MonteCarlo };
