import * as React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { ReloadButton, SimpleTouchInput } from "~components";
import { ConfigurationService, UVService } from "~services";
import "./admin.scss";

interface IProps {

}

interface IState {
    name: string,
    uvIndexKey: string,
    uvIndex: number
}

export class Admin extends React.PureComponent<IProps, IState> {
    private configurationService: ConfigurationService = ConfigurationService.getInstance();

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: this.configurationService.getName(),
            uvIndexKey: this.configurationService.getOpenUVIndexKey(),
            uvIndex: -1
        };
    }

    CheckUvIndex() {
        UVService.getCurrentUVIndex().then(uvIndex => {
            this.setState({uvIndex});
            console.log(uvIndex);
        });
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
            <Row>
            <Button variant="primary" onClick={() => this.CheckUvIndex()}>Check UV Index</Button>Current UV Index: {this.state.uvIndex}
            </Row>
        </Container>)
    }
}