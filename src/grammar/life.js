// Rules expansion
// 
// Un alfabeto.
// Tengo un punto de partida de ese alfabeto.
// Axiomas. 

// Axiomas.
//
//   A -> BA
//   BA -> A
//
// Si tomo este ejemplo, lo complicado del modelo va a ser buscar el proximo axioma. Pues:
// 1. A
// 2. BA
// 3. Tengo que buscar si tengo reglas para B unicamente o para A unicamente, o para ambas juntas.
// 4. La pregunta acá seria, que veo que en la naturaleza? como sucede en la "realidad"?
// 
// Que pasa si en lugar de letras, son numeros que respeten cierta aritmetica?
//
// A === mod 1
// AB === mod 2
// ABC === mod 3
//
// AA === mod 2?
// AB === mod 2?
// 
// El alfabeto me define el universo. Esto seria algo asi como todas las secuencias posibles de 
// infinita logitud de esos N valores.
// 
// Si supongo un Alfabeto de 1 elemento, supongamos A.
// A
// AA
// AAA
// AAAA
// 
// A
// A -> A 
// AAA -> AA
//
// A
// AA
// AAA
// AA
// AAA
// 
// Mentalmente lo que estoy haciendo es buscar el axioma que mas covertura tiene sobre la estructura
// que estoy procesando.
// 
// Indirectamente estoy pensando en que aumenta la "complejidad", por eso busco la regla que mas abarca.
// 
// Hay un detalle, hay nodos terminales y no terminales.
// A
// A -> aA
// 
// De esta forma puedo generar la cadena infinita que estaba buscando antes:
// A
// aA
// aaA
// aaaA
// ....
//
// Asi que a nivel de strings, lo mas simple para la implementacion seria que siempre el NO terminal me quede del lado 
// derecho.
// 
// Ahora vamos a transforma en alfabeto en un circulo. A ese circulo lo vamos a dividir en tantas partes como letras del
// alfabeto tengo. Como puedo modelar la expansion como rotaciones dentro de ese circulo?
// 

function search_axiom(char) {
  return axioms[char];
}

function sequencer (start) {
  let sequence = start;
  let active_axiom = search_axiom(start);

  while (active_axiom) {
    sequence = active_axiom(sequence);
    yield sequence;

    active_axiom = search_axiom(start);
  }

  return ax(start);
}

// El axioma reemplaza una cadena por otra.
function axiom (input) {
  return output;
}