/* TIME IS NOW */

const layers = [1, 2, 3, 4, 5, 6].map(rotation => ({
    waves: [{
        fn: unstablePhase,
        freq: 1/53,
        phase: Math.PI * 0.6180469715698392,
        radius: 450
    }, {
        fn: unstablePhase,
        freq: 1/57,
        phase: Math.PI * 0.6180469715698392,
        radius: 500
    }, {
        fn: unstablePhase,
        freq: 1/7,
        phase: Math.PI * 0.6180469715698392,
        radius: 450
    },{
        fn: unstablePhase,
        freq: 1/10,
        phase: Math.PI * 0.6180469715698392,
        radius: 500
    },],
    rotate:  (2 * Math.PI / 6) * rotation,
    color: '#BC8CF277',
    width: 2,
    }));