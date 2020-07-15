import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment, { Moment } from "moment";
import { Time } from "../index";
import "./home.scss";

interface IProps {

}

interface IState {
    currentTime: Moment
}

export class Home extends React.PureComponent<IProps, IState> {
    private timerId: number;
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
                            {/* Good {this.getTimeOfDayFromCurrentTime()}, Nova */}
                            Happy Birthday, Dylan!
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
        this.setState({currentTime: moment()});
    }
}