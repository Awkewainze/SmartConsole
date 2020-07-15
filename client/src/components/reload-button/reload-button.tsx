import { render } from "react-dom";
import * as React from "react";
import {Button} from "react-bootstrap";

export class ReloadButton extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    onClick() {
        location.reload(true);
    }

    render() {
        return (
            <Button variant="primary" onClick={this.onClick}>Refresh page</Button>
        )
    }
}