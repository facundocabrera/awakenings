/* TIME IS NOW */

const layers = [
    {
        disabled: true,
        waves: [{
            fn: unstablePhase,
            freq: 1/8,
            phase: Math.PI / 3,
            radius: 500
        }, {
            fn: unstablePhase,
            freq: 1/16,
            phase: Math.PI / 3,
            radius: 500
        }, {
            fn: unstablePhase,
            freq: 1/2,
            phase: Math.PI / 3,
            radius: 500
        },{
            fn: unstablePhase,
            freq: 1/8,
            phase: Math.PI / 3,
            radius: 500
        },],
//         rotate: Math.PI / 2,
        color: '#DDBBEE11'
    },
    {
        waves: [{
            fn: unstablePhase,
            freq: 1/8,
            phase: Math.PI * 0.6180469715698392,
            radius: 300
        }, {
            fn: unstablePhase,
            freq: 1/16,
            phase: Math.PI * 0.6180469715698392,
            radius: 500
        }, {
            fn: unstablePhase,
            freq: 1/2,
            phase: Math.PI * 0.6180469715698392,
            radius: 300
        },{
            fn: unstablePhase,
            freq: 1/32,
            phase: Math.PI * 0.6180469715698392,
            radius: 500
        },],
        rotate: Math.PI / 3,
        color: '#DDFFFF11'
    },
        {
        disabled: true,
        waves: [{
            fn: unstablePhase,
            freq: 1/8,
            phase: Math.PI * Math.E,
            radius: 150
        }, {
            fn: unstablePhase,
            freq: 1/16,
            phase: Math.PI * Math.E,
            radius: 500
        }, {
            fn: unstablePhase,
            freq: 1/2,
            phase: Math.PI * Math.E,
            radius: 150
        },{
            fn: unstablePhase,
            freq: 1/32,
            phase: Math.PI * Math.E,
            radius: 450
        },],
        rotate: Math.PI / 3,
        color: '#00AAFF11'
    }


];
