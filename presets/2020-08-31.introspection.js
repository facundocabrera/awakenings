/**
 * “From experience I have learned that 144 is the highest number of practical value.”
 * 
 * Excerpt From: Ralph Nelson Elliott. “Nature's Law: The Secret of the Universe.” Apple Books. 
 * https://books.apple.com/ar/book/natures-law-the-secret-of-the-universe/id512156268?l=en
 */

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


    {
        disabled: true,
        clock_unit: 1,
        draw: 'bezier',
        waves: [
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / -4,
            radius: 80
        },
        {
            fn: plusplus,
            freq1: 1/2,
            freq2: -1/144,
//             phase: Math.PI / -4,
            radius: 600
        },
        {
            fn: plusplus,
            freq1: 1/2,
            freq2: 1/144,
//             phase: Math.PI / 4,
            radius: 600
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 4,
            radius: 80
        },
        ],
        color: '#F4002011',
        rotate: Math.PI / -2
    },
    {
        disabled: true,
        clock_unit: 1,
        draw: 'bezier',
        waves: [
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / -4,
            radius: 100
        },
        {
            fn: plusplus,
            freq1: 1/4,
            freq2: -1/111,
//             phase: Math.PI / -4,
            radius: 600
        },
        {
            fn: plusplus,
            freq1: 1/4,
            freq2: 1/111,
//             phase: Math.PI / 4,
            radius: 600
        },
        {
            fn: classicFrequencyMapping,
            freq: 1/4,
            phase: Math.PI / 4,
            radius: 100
        },
        ],
        color: '#1DD59011',
        rotate: Math.PI / -2
    },
//     {
//         clock_unit: 1,
//         draw: 'lines',
//         waves: [
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/4,
//             radius: 500
//         },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/4,
//             phase: Math.PI / 2,
//             radius: 500
//         },
//         ],
//         color: '#00EAFF11',
// //         rotate: Math.PI / -2
//     },

//     {
//         clock_unit: 1,
//         draw: 'lines',
//         waves: [
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/4,
//             radius: 100
//         },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/4,
// //             phase: Math.PI / 2,
//             radius: 170
//         },
//         ],
//         color: '#00EAFF11',
// //         rotate: Math.PI / -2
//     },

//     {
//         clock_unit: 1,
//         draw: 'lines',
//         waves: [
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             radius: 100
//         },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             phase: Math.PI / 4,
//             radius: 100
//         },
//         ],
//         color: '#00EAFF11',
// //         rotate: Math.PI / -2
//     },

//     {
//         clock_unit: 1,
//         draw: 'lines',
//         waves: [
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             radius: 100
//         },
//         {
//             fn: classicFrequencyMapping,
//             freq: 1/8,
//             phase: Math.PI,
//             radius: 100
//         },
//         ],
//         color: '#00EAFF11',
// //         rotate: Math.PI / -2
//     },

];

