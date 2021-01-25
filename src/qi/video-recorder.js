function createStreamFromCanvas() {
  const canvas = document.querySelector("canvas");
  const stream = canvas.captureStream(25); // video frame rate

  return stream;
}

function wait(delayInMS) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function startRecording(stream /*, lengthInMS = 1000 * 60*/) {
  const recorder = new MediaRecorder(stream);
  const data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

  // const recorded = wait(lengthInMS).then(
  //   () => recorder.state == "recording" && recorder.stop()
  // );

  return stopped.then(() => data);
}

function stop(stream) {
  stream.getTracks().forEach((track) => track.stop());
}

async function recordVideo(stream) {
  const recordedChunks = await startRecording(stream);
  const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(recordedBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "RecordedVideo.webm";
  link.click();
}

export const Recoder = () => {
  let stream;

  return {
    start() {
      document.title = "Recording ...";
      stream = createStreamFromCanvas();
      recordVideo(stream);
    },
    stop() {
      document.title = "Drawing...";
      stop(stream);
    },
  };
};
