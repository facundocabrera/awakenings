function regularnit({
  global,
  canvas,
  vertex,
}) {
  canvas.beginShape();
  vertex.map(v => {
    canvas.vertex(...v);
  });
  canvas.endShape(global.CLOSE);
}

export {
  regularnit
};
