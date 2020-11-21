import asciichart from "asciichart";

const plot = (title, ideal, distribution) => {
  console.log(title);
  console.log(asciichart.white, "PERFECT", asciichart.green, "CURRENT");
  console.log(
    asciichart.plot(
      [ideal.map((v) => v * 100), distribution.map((v) => v * 100)],
      {
        colors: [asciichart.white, asciichart.green],
      }
    )
  );
};

const justPlot = (title, distribution, scale = 100) => {
  console.log(title);
  console.log(
    asciichart.plot([distribution.map((v) => v * scale)], {
      colors: [asciichart.green],
    })
  );
};

export { plot, justPlot };
