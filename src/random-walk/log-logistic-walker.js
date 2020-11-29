import { GenericWalker } from "./walker";
import { logLogistic } from "../math/log-logistic";
import { segments } from "../math/sampling";

const LogLogisticWalker = (α, β, base) => {
  const cumulative = segments(logLogistic(α, β, 0.01, 2, 1 / 100), base);

  return GenericWalker(cumulative);
};

export { LogLogisticWalker };
