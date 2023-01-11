/* TIME IS NOW */

const layers = [1, 2, 3, 4, 5, 6].map(rotation => ({
    waves: [{
        fn: unstablePhase,
        freq: 1/8,
        phase: Math.PI * 0.121,
        radius: 450
    }, {
        fn: unstablePhase,
        freq: 1/13,
        phase: Math.PI * 0.121,
        radius: 500
    }, {
        fn: unstablePhase,
        freq: 1/24,
        phase: Math.PI * 0.121,
        radius: 450
    },{
        fn: unstablePhase,
        freq: 1/24,
        phase: Math.PI * 0.121,
        radius: 500
    },],
    rotate:  (2 * Math.PI / 6) * rotation,
    color: '#C0C0BDAA',
    width: 4,
    }));