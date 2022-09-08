function createStreamFromCanvas() {
  const canvas = document.querySelector("canvas");
  const stream = canvas.captureStream(25); // video frame rate

  return stream;
}

function startRecording(stream) {
  const recorder = new MediaRecorder(stream);
  const data = [];

  recorder.ondataavailable = (event) => data.push(event.data);
  recorder.start();

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = (event) => reject(event.name);
  });

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
  let started = false;

  return {
    start() {
      document.title = "Recording ...";
      stream = createStreamFromCanvas();
      recordVideo(stream);
      started = true;
    },
    stop() {
      if (started) {
        document.title = "Drawing...";
        stop(stream);
        started = false;
      }
    },
  };
};
