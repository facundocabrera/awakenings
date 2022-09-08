export const getParameter = (name, dflt) => (state) => {
    if (!state) throw Error('Empty state?');

    // console.log('reading', state);

    return state.parameters[name] ?? dflt;
};
