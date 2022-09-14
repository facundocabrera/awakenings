import { compose, branch } from "../";
import { createTestableDrawables } from "./utils";

describe("branch", () => {
  it("should allow branching the data flow", () => {
    // Spec:
    //   A -> 10
    //     10 -> B -> 10 * 2 -> D -> expect(20)
    //     10 -> C -> 10 * 3 -> E -> expect(30)

    const [, , Input] = createTestableDrawables(() => ({ x: 10 }));

    const [, , B] = createTestableDrawables((props) => {
      expect(props).toEqual(expect.objectContaining({ x: 10 }));

      return { x: props.x * 2 };
    });
    const [, , C] = createTestableDrawables((props) => {
      expect(props).toEqual(expect.objectContaining({ x: 10 }));

      return { x: props.x * 3 };
    });

    const [, , D] = createTestableDrawables((props) =>
      expect(props).toEqual(expect.objectContaining({ x: 20 }))
    );
    const [, , E] = createTestableDrawables((props) =>
      expect(props).toEqual(expect.objectContaining({ x: 30 }))
    );

    const branchBD = compose([B, D]);
    const branchCE = compose([C, E]);

    const exec = branch(Input, branchBD, branchCE);

    exec.setup();
  });
});
