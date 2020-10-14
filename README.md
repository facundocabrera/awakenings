## Awakenings 👁

- yarn start
- yarn build

### WebWorkers

No tenemos acceso a las APIs desde el scope global. Bardo para integrar paralelismo.

=> https://gafferongames.com/post/fix_your_timestep/ usar timestamps y requestAnimationFrame, parece que es lo que
mejor tenemos disponible.

### Time

El tiempo es constante, 1,2,3,4,5,6,7,8..., cuando quieras aumentar la precisión,
aumenta la freq de las funciones. 🤓

Los ciclos son vueltas a un circulo, N ciclos serian N _ 2 _ π en radianes. Tener en
cuenta que se dibuja con coordenadas polares, es por eso la aclaración de los ciclos.

Hay posibilidades de utilizar bezier para armar la progresion de valores, cosa que
haria la construcción del dibujo, algo mas armonico para la vista.

=> react-springs => usar resortes para darle armonia a los movimientos 🤩

### Escalas / Zoom

No tiene sentido intentar manejar la escala a nivel canvas pensando en un zoom. Es mejor aplicar la escala como factor que multiplica cada valor que quiero dibujar.

( x, y ) => ( x * 1 / 2, y * 1 / 2 ) <=> Zoom in
( x, y ) => ( x * 2, y * 2 ) <=> Zoom out

