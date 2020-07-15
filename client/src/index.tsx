// import "popper.js";
// import "jquery";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { render } from "react-dom";
import * as React from "react";
import {Container, Row, Col, Toast, ToastHeader, ToastBody} from "react-bootstrap";
import { ReloadButton, Main } from "./components";

function Example() {
    let [show, setShow] = React.useState(true);
    return (<Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
    show={show} onClick={() => setShow(false)}>
        <ToastHeader>
          <strong className="mr-auto">Toast Header</strong>
          <small>just now</small>
        </ToastHeader>
        <ToastBody>See? Just like this.</ToastBody>
      </Toast>);
}

document.addEventListener("DOMContentLoaded", () => {
    render(
        // <Container fluid>
        //     <Row>
        //         <Col><Example /></Col>
        //         <Col><CirclePicker></CirclePicker></Col>
        //         <Col><ReloadButton></ReloadButton></Col>
        //     </Row>
        // </Container>,
        <div className="main-holder">
          <Main />
          {/* <div className="background"></div> */}
        </div>,
        document.getElementById('root')
    )
});
