import { checkDrawable } from "../../qi/interfaces";

import { automata } from '../../cellular-automaton/binary/game';

export const DataProvider = (drawable) => {
  checkDrawable(drawable);

  let yin;
  let yan;

  const setup = (props) => {
    const { dimensions: { to: [ width ] }} = props;

    yin = automata( 32 / 2 );
    yan = automata( 32 / 2 );

    drawable.setup(props);
  };

  const draw = (props) => {
    drawable.draw({ ...props, x: yin(), y: yan() });
  };

  return {
    ...drawable,
    setup,
    draw,
  };
};
