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
    const x = radius * Math.cos(arc);
    const y = radius * Math.sin(arc);

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

function plusplus(time) {
    const {
        freq1,
        freq2,
        phase,
        radius
    } = this;

    const f1 = classicFrequencyMapping.apply({
        freq: freq1,
        phase,
        radius
    }, [time]);
    const f2 = classicFrequencyMapping.apply({
        freq: freq2,
        phase,
        radius
    }, [time]);

    return {
        arc: f1.arc + f2.arc,
        x: (f1.x + f2.x) / 2,
        y: (f1.y + f2.y) / 2,
    };
}

function ln(l) {
    // BE SMART
    // 👁 w es un NUMERO ENTERO que lo podemos ver como el radio.
    // 👁 k es una FRACCION que controla el desarrollo del espiral.
    const {
      w, k
    } = this;

    const { x, y } = polar(l, w * Math.exp(k * l));
    
    return [
        x, y
    ];
}

export {
    harmonic,
    polar,
    classicFrequencyMapping,
    hookeLawHarmonicOscillator,
    unstablePhase,
    elliptic,
    kepler,
    plusplus,
    ln
};