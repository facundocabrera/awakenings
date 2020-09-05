/* 45 */

export default [
    {
        clock_unit: .1,
        draw: 'bezier',
        waves: [
        {
            fn: kepler,
            freq: 1/8,
            radius: 500
        }, {
            fn: kepler,
            freq: 1/32,
            radius: 500
        },
        {
            fn: kepler,
            freq: 1/64,
            radius: 500
        },
        {
            fn: kepler,
            freq: 1/8,
            radius: 250
        },
        ],
        rotate: Math.PI / -2,
        color: '#AAFAAA11'
    },
    {
        clock_unit: .1,
        draw: 'lines',
        waves: [
        {
            fn: kepler,
            freq: 1/8,
            radius: 500
        }, {
            fn: kepler,
            freq: 1/16,
            radius: 500
        },
        {
            fn: kepler,
            freq: 1/34,
            radius: 450
        },
        {
            fn: kepler,
            freq: 1/34,
            radius: 250
        },
        ],
        rotate: Math.PI / -2,
        color: '#66009911'
    },
].reverse();
