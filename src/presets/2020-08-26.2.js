/* SERIE INSECTOS LA REINA */

export default [
    {
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/8,
            radius: 350
        }, {
            fn: classicFrequencyMapping,
            freq: 1/32,
            radius: 350
        }, {
            fn: classicFrequencyMapping,
            freq: 1/64,
            radius: 350
        },{
            fn: classicFrequencyMapping,
            freq: 1/16,
            radius: 350
        },],
        rotate: Math.PI / 2,
        color: '#DCC30A11'
    },
    {
        // serie insectos
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/32,
            radius: 350
        }, {
            fn: classicFrequencyMapping,
            freq: 1/8,
            radius: 350
        }, {
            fn: classicFrequencyMapping,
            freq: 1/64,
            radius: 350
        },{
            fn: classicFrequencyMapping,
            freq: 1/8,
            radius: 350
        },],
        rotate: Math.PI / 2,
        color: '#90BBCD11'
    },
];
