const layers = [
    {
        clock_unit: 1,
        draw: 'bezier',
        waves: [
            {
                fn: classicFrequencyMapping,
                freq: 1/2,
                // phase: Math.PI / 2,
                radius: 500
            },
            {
                fn: classicFrequencyMapping,
                freq: 1/7,
                // phase: 3 * Math.PI / -2,
                radius: 500
            },
            {
                fn: classicFrequencyMapping,
                freq: 1/7,
                phase: 3 * Math.PI / 2,
                radius: 500
            },
            {
                fn: classicFrequencyMapping,
                freq: 1/2,
                phase: 3 * Math.PI / 2,
                radius: 500
            },
        ],
        color: '#FFFFFF11',
        rotate: Math.PI / -2
    },
];

