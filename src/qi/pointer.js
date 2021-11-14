const pool = [];

function pointer() {
  window.addEventListener("pointerdown", (event) => {
    const { altKey, clientX: x, clientY: y } = event;

    if (altKey) {
      pool.push([x, y]);
    }
  });
}

export { pointer, pool };
