function vertexnit({
  canvas,
  vertex,
  unity
}) {
  canvas.push();
  vertex.map(v => {
    canvas.ellipse(...v, unity);
  });
  canvas.pop();
}

export {
  vertexnit
};
