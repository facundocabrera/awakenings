import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Amount from "./inputs/Amount";
import Range from "./inputs/Range";
import Switch from "./inputs/Switch";

import { getParameter } from "./inputs/selectors";
import { update } from "./inputs/state";

import { Recoder } from "./video-recorder";

export const getFrameRate = getParameter("frameRate", 60);

export const getCanvasWidth = getParameter("canvasWidth", 1080);

export const getCanvasHeight = getParameter("canvasHeight", 1080);

export const getDt = getParameter("deltaTime", 1);

export const getEngineLoop = getParameter("engineLoop", true);

export const getRecording = getParameter("canvasRecording", false);

export const getScreenshot = getParameter("screenshot", false);

const BaseControls = ({ runtime }) => {
  const [recorder] = useState(Recoder());

  const screenshot = useSelector(getScreenshot);
  const engineLoop = useSelector(getEngineLoop);
  const recording = useSelector(getRecording);

  useEffect(() => {
    recorder[recording ? "start" : "stop"]();
  }, [recording]);

  useEffect(() => {
    runtime[engineLoop ? "loop" : "noLoop"]();
  }, [engineLoop]);

  useEffect(() => {
    const now = new Date().toISOString();
    const name = "out" + now;

    screenshot && runtime.saveCanvas(runtime.canvas, name, "png");
  }, [screenshot]);

  return (
    <>
      <h2>Base</h2>
      <Amount
        name="framerate"
        label="Frame Rate"
        min={1}
        max={60}
        selector={getFrameRate}
        {...{ update }}
      />
      <Amount
        name="canvasWidth"
        label="Canvas Width (in px)"
        min={10}
        max={6000}
        selector={getCanvasWidth}
        {...{ update }}
      />
      <Amount
        name="canvasHeight"
        label="Canvas Height (in px)"
        min={10}
        max={6000}
        selector={getCanvasHeight}
        {...{ update }}
      />
      <Range
        name="deltaTime"
        label="Time (dt)"
        min={0}
        max={1}
        step={0.01}
        selector={getDt}
        {...{ update }}
      />
      <Switch
        name="engineLoop"
        label="Engine loop"
        selector={getEngineLoop}
        {...{ update }}
      />
      <Switch
        name="canvasRecording"
        label="Create Video"
        selector={getRecording}
        {...{ update }}
      />
      <Switch
        name="screenshot"
        label="Screenshot"
        selector={getScreenshot}
        {...{ update }}
      />
    </>
  );
};

export default BaseControls;
