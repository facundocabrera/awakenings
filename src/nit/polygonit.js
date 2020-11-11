function polygonit({ global, canvas, vertex, unity }) {
  canvas.beginShape();
  vertex.map((v) => {
    canvas.ellipse(...v, unity);
    canvas.vertex(...v);
  });
  canvas.vertex(...vertex[0]);
  canvas.endShape(global.CLOSE);
}

export { polygonit };
