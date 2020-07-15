import * as React from "react";
import moment, { Moment } from "moment";
import "./time.scss";

interface IProps {

}

interface IState {
    currentTime: Moment,
}

export class Time extends React.PureComponent<IProps, IState> {
    private timerId: number;
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentTime: moment(),
        };
        this.timerId = setInterval(this.updateTime.bind(this), 500);
    }

    render() {
        let {date, time} = this.getDateTimeStringsFromCurrentTime();
        return (
            <div className="clock">
                <p className="date">{date}</p>
                <p className="time">{time}</p>
            </div>
          );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    private getDateTimeStringsFromCurrentTime(): {date: string, time: string} {
        return {
            date: this.state.currentTime.format("dddd, MMMM Do YYYY"),
            time: this.state.currentTime.format("h:mm:ss a")
        }
    }

    private updateTime(): void {
        this.setState({currentTime: moment()});
    }
}