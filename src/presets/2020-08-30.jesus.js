/**
 * https://sites.google.com/site/mathematicalmonotheism/geometric-signature-of-jesus-christ 
 * FIRST 144 Pi DIGITS (after decimal point) WITH INDEXED PRIME NUMBERS:
 */

export default [
    {
        clock_unit: 1,
        draw: 'curve',
        waves: [
        {
            fn: classicFrequencyMapping,
            freq: 1/23,
            radius: 500
        },
        {
            fn: plusplus,
            freq1: 1/7,
            freq2: 1/11,
            radius: 500
        },
        {
            fn: plusplus,
            freq1: 1/11,
            freq2: 1/7,
            radius: 500        
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/17,
            radius: 300
        },
        ],
        color: '#AAFAAA11'
    },
    // {
    //     clock_unit: .1,
    //     draw: 'curve',
    //     waves: [
    //     {
    //         fn: unstablePhase,
    //         freq: 1/8,
    //         phase: Math.PI / 8,
    //         radius: 500
    //     },
    //     {
    //         fn: plusplus,
    //         freq1: 1/7,
    //         freq2: 1/11,
    //         radius: 500
    //     },
    //     {
    //         fn: plusplus,
    //         freq1: 1/11,
    //         freq2: 1/7,
    //         radius: 500        
    //     },
    //     {
    //         fn: unstablePhase,
    //         freq: 1/-8,
    //         phase: Math.PI / 8,
    //         radius: 250
    //     },
    //     ],
    //     color: '#AAFAAA11'
    // },
];
