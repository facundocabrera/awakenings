/* 144 */

const r = 500;

export default [
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/6,
//             phase: Math.PI / 5,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/10,
//             phase: Math.PI / 7,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/36,
//             phase: Math.PI / 9,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/12,
//             phase: Math.PI / 144,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
//         rotate: Math.PI / 2,
        color: '#FFFFFF11'
    },
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/54,
            phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/144,
            phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/251,
            phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/521,
            phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / 6,
        color: '#AA00FF11'
    },


// serie 2
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/3,
//             phase: Math.PI / 5,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/9,
//             phase: Math.PI / 7,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/10,
//             phase: Math.PI / 9,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/16,
//             phase: Math.PI / 144,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / 2,
        color: '#E4DDE911'
    },
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/144,
//             phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/-144,
//             phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/2,
//             phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / 2,
        color: '#FFFFFF11'
    },


   // serie 3
    {
//         disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/144,
//             phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/-144,
//             phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/2,
//             phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / 2,
        color: '#FFFFFF11'
    },
    {
//         disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/144,
//             phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/-144,
//             phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/2,
//             phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / -2,
        color: '#FFFFFF11'
    },
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/144,
//             phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/20,
//             phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
//             phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/2,
//             phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / 2,
        color: '#AA00FF11'
    },
    {
        disabled: true,
        draw: 'bezier',
        waves: [{
            fn: classicFrequencyMapping,
            freq: 1/144,
//             phase: Math.PI / -4,
            radius: 500
        }, {
            fn: classicFrequencyMapping,
            freq: 1/20,
//             phase: Math.PI / 2,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
//             phase: Math.PI / -4,
            radius: 500
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/2,
//             phase: Math.PI / 2,
            radius: 500
        },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/16,
// //             phase: Math.PI / 2,
//             radius: 500
//         },{
//             fn: classicFrequencyMapping,
//             freq: 1/96,
// //             phase: Math.PI / 2,
//             radius: 500
//         },
        ],
        rotate: Math.PI / -2,
        color: '#AA00FF11'
    },
];
