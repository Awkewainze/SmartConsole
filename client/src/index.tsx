import "bootswatch/dist/darkly/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import "bootstrap/dist/js/bootstrap";
import { render } from "react-dom";
import * as React from "react";
import { Main } from "./components";

document.addEventListener("DOMContentLoaded", () => {
    render(
        <div className="main-holder">
            <Main />
        </div>,
        document.getElementById('root')
    )
});
