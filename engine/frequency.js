function harmonic({freq, phase=0, radius}) {
    const fnId = _.uniqueId();

    function fn(time) {
        // const arc = 2 * PI * (1 / freq) * time + phase;
        const arc = 2 * PI * freq * time + phase;
        const x = radius * cos(arc)/* * 1 / (time % freq)*/
        ;
        const y = radius * sin(arc)/* * 1 / (time % freq) */
        ;

        fn.history = {
            arc,
            x,
            y
        };

        return {
            arc,
            x,
            y
        };
    }

    fn.freq = freq;
    fn.radius = radius;
    fn.history = null;

    fn.toString = ()=>fnId;
    fn.valueOf = ()=>freq;

    return fn;
}

function polar(arc, radius) {
    const x = radius * cos(arc);
    const y = radius * sin(arc);

    return {
        arc,
        x,
        y
    };
}

function classicFrequencyMapping(time) {
    const {freq, phase=0, radius=0} = this;

    // La idea de la definicion de la freq de esta forma, es para simplemente
    // definir un numero entero, me parece mas simple.
    const arc = 2 * PI * freq * time + phase;
    const { x, y } = polar(arc,radius);

    return {
        arc,
        x,
        y
    };
}

// https://en.wikipedia.org/wiki/Hooke%27s_law
// Harmonic oscillator
function hookeLawHarmonicOscillator(time) {
    const {freq, radius=0} = this;

    // Adapte el movimiento armonico de un oscilador
    const arc = 1 / (2 * PI) * Math.sqrt(freq) * time;
    const { x, y } = polar(arc,radius);

    return {
        arc,
        x,
        y
    };
}

function unstablePhase(time) {
    const {freq, phase=0, radius=0} = this;

    const arc = 2 * PI * freq * time + Math.sqrt(phase * time);
    const { x, y } = polar(arc,radius);

    return {
        arc,
        x,
        y
    };
}

function elliptic(time) {
    const {freq, phase=0, radius=0} = this;

    const arc = 2 * PI * (1 / freq) * time + phase;
    const y = radius * Math.cosh(0.5) * cos(arc);
    const x = radius * Math.sinh(0.3) * sin(arc);

    return {
        arc,
        x,
        y
    };
}

function kepler(time) {
    const {freq, phase=0, radius=0, e = 0.707} = this;

    const arc = 2 * PI * freq * time + phase;
    const y = radius * cos(arc);
    const x = radius *  Math.sqrt(1 - Math.pow(e, 2)) * sin(arc);

    return {
        arc,
        x,
        y
    };
}

// experimento que aun no le encontre la vuelta. 👁
function kepler2(time) {
    const {freq, phase=0, radius=0, e = 0.707} = this;

    const w = 6 / (2 * Math.PI);

    const arc = 2 * PI * freq * time + phase;
    const y = radius * cos(arc) * Math.sin( w ) / w;
    const x = radius * Math.sqrt(1 - Math.pow(e, 2)) * sin(arc);

    return {
        arc,
        x,
        y
    };
}
