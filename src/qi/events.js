import { Recoder } from "./video-recorder";

let recorder;

function events(runtime) {
  window.onkeypress = ({ key }) => {
    switch (key) {
      case "k": {
        recorder = recorder || Recoder();
        recorder.start();
        break;
      }
      case "l": {
        recorder.stop();
        break;
      }

      case "a": {
        runtime.userStartAudio();
        break;
      }
      case "h": {
        const help = runtime.select("#help").elt;
        help.style.display = help.style.display === "" ? "block" : "";
        break;
      }
      case "s": {
        runtime[runtime.isLooping() ? "noLoop" : "loop"]();
        break;
      }
      case "r": {
        window.location.reload();
        break;
      }
      default: {
        const now = new Date().toISOString();
        const name = "out" + now;

        runtime.saveCanvas(runtime.canvas, name, "png");
      }
    }
  };
}

export { events };
