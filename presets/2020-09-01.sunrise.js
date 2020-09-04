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
                freq: 1/4,
                // phase: 3 * Math.PI / -2,
                radius: 500
            },
            {
                fn: classicFrequencyMapping,
                freq: 1/8,
                // phase: Math.PI / 2,
                radius: 500
            },
            {
                fn: classicFrequencyMapping,
                freq: 1/16,
                // phase: 3 * Math.PI / -2,
                radius: 500
            },
        ],
        color: '#FFFFFF',
        rotate: Math.PI / -2
    },
];

