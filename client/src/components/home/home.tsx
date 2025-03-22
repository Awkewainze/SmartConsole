import moment, { Moment } from "moment";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ConfigurationService } from "../../services";
import { Time } from "../index";
import "./home.scss";

interface IProps {

}

interface IState {
    currentTime: Moment
}

export class Home extends React.PureComponent<IProps, IState> {
    private timerId: number;
    private readonly configurationService: ConfigurationService = ConfigurationService.getInstance();
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentTime: moment(),
        };
        this.timerId = setInterval(this.updateTime.bind(this), 500);
    }

    render() {
        return (
            <Container className="home align-middle">
                <Row>
                    <Col>
                        <Time />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="display-message">
                            {this.getGreeting()}
                        </p>
                    </Col>
                </Row>
            </Container>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    private getTimeOfDayFromCurrentTime(): string {
        if (this.state.currentTime.hour() < 12) {
            return "Morning";
        }
        if (this.state.currentTime.hour() < 16) {
            return "Afternoon";
        }
        if (this.state.currentTime.hour() < 21) {
            return "Evening";
        }
        return "Night";
    }

    private updateTime(): void {
        this.setState({ currentTime: moment() });
    }

    private getGreeting(): string {
        let greeting = `Good ${this.getTimeOfDayFromCurrentTime()}`;

        let name = this.configurationService.getName();
        if (name) {
            greeting = `${greeting}, ${name}`;
        }

        return greeting;
    }
}