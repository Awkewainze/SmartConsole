import * as React from "react";
import { Container, Row } from "react-bootstrap";
import { ReloadButton, SimpleTouchInput } from "~components";
import { ConfigurationService } from "~services";
import "./admin.scss";

interface IProps {

}

interface IState {
    name: string,
    uvIndexKey: string
}

export class Admin extends React.PureComponent<IProps, IState> {
    private configurationService: ConfigurationService = ConfigurationService.getInstance();

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: this.configurationService.getName(),
            uvIndexKey: this.configurationService.getOpenUVIndexKey()
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
            <Row>OpenUV Key: {this.state.uvIndexKey}</Row>
            <Row><SimpleTouchInput value={this.state.uvIndexKey} onChange={value => {
                this.setState({ uvIndexKey: value });
                this.configurationService.setOpenUVIndexKey(value);
            }} /></Row>
        </Container>)
    }
}