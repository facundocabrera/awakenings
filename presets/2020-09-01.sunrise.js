const layers = [
    {
        clock_unit: 1,
        draw: 'bezier',
        waves: [
        {
            fn: plusplus,
            freq1: 1/2,
            freq2: 1/8,
            //phase: Math.PI / 5,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 2,
            radius: 200
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: 3 * Math.PI / -2,
            radius: 200
        },
        {
            fn: plusplus,
            freq1: 1/2,
            freq2: 1/8,
            phase: Math.PI,
            radius: 500
        },
        ],
        color: '#F4002011',
//         rotate: Math.PI / -2
    },
];

