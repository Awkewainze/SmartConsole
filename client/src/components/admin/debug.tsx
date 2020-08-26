import * as React from "react";
import { Container, Row } from "react-bootstrap";
import { ReloadButton, SimpleTouchInput } from "~components";
import "./admin.scss";
import { ConfigurationService } from "~services";

interface IProps {

}

interface IState {
    name: string
}

export class Admin extends React.PureComponent<IProps, IState> {
    private configurationService: ConfigurationService = ConfigurationService.getInstance();

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: this.configurationService.getName()
        };
    }

    render(): JSX.Element {
        return (<Container className="admin" >
            <Row><ReloadButton /></Row >
            <Row>Currently set name: {this.state.name}</Row>
            <Row><SimpleTouchInput value={this.state.name} onChange={value => {
                this.setState({ name: value });
                this.configurationService.setName(value);
            }} /></Row>
        </Container>)
    }
}