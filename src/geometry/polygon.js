import { stops } from "../geometry/circle";
import { fragment } from "../geometry/points";

function polygon(vertex = 3, zoom = 1) {
  // Set of base points
  const base = stops(vertex);

  // Expanded set of points given the zoom
  const expanded = fragment(base, zoom);

  return expanded;
}

export { polygon };
