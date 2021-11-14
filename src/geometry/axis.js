const screenToAxis = (points, [x, y]) => points.map(([z, t]) => [z - x, y - t]);

export { screenToAxis };
