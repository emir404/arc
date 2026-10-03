/*
  Agentation (agentation.com): click anything on the page and leave a note for a coding agent.
  Layout.astro loads this file in development only.

  Agentation is a React component and the site has no React of its own, so it gets a small root here.
  The endpoint is the agentation-mcp server, which passes each note to the agent as it is made.
  Without that server running, the toolbar still works for copying notes by hand.
*/
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { Agentation } from "agentation";

const host = document.createElement("div");
document.body.appendChild(host);
createRoot(host).render(createElement(Agentation, { endpoint: "http://localhost:4747" }));
