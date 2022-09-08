import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from 'react-redux';

import BaseControls from './qi/BaseControls';

// import { sketch } from "./qi-gallery/2021-03-12-fft";
// import { sketch } from "./qi-gallery/2022-08-23-rebuilding";
// import { sketch } from "./qi-gallery/2022-08-24-rotate";
// import { sketch } from "./qi-gallery/2022-08-26-electricity";
// import { sketch } from "./qi-gallery/2022-08-28-chroma-colors";
// import { sketch } from "./qi-gallery/2022-08-28-chroma2";
import { sketch, store, Controls } from "./qi-gallery/2022-09-05-chroma3";

const runtime = new p5(sketch);

const rootElement = document.getElementById("react");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
        <BaseControls {...{ runtime }} />
        <Controls />
    </Provider>
  </StrictMode>
);
