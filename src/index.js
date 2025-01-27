import { createRoot } from "react-dom/client";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App.js";
import React from "react";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
