import { CirclePicker, ColorResult } from "react-color";
import * as React from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import "./color-picker.scss";
import { Subject } from "rxjs";

type Color = string;

export enum DefaultColor {
	Red = 65280,
	Pink = 56100,
	Purple = 52180,
	Violet = 47188,
	Blue = 46920,
	Turquoise = 31146,
	Green = 25500,
	Yellow = 12750,
	Orange = 8618
}

export enum WhiteTemperature {
	Candle = 500,
	Relaxing = 467,
	Reading = 346,
	Neutral = 300,
	Concentrate = 231,
	Energize = 136
}

interface IProps {
    onColorChange: Subject<ColorResult>
}

interface IState {
}

let colors: Array<Color> = [
    "#f44336", "#e91e63", "#9c27b0", "#673ab7",
    "#03a9f4", "#00bcd4",
    "#009688", "#4caf50", "#8bc34a", "#cddc39",
    "#ffeb3b", "#ffc107", "#ff9800", "#ff5722",
    "#795548", "#607d8b", "#f0ead6",
    "#fafafa", "#d6dcf0", "#ffffff"
];

export class ColorPicker extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }
    }

    render(): JSX.Element {
        return (
            <div className="color-picker">
                <CirclePicker onChange={this.onColorChange.bind(this)} circleSize={64} colors={colors} width="100%" />
            </div>
        )
    }

    private onColorChange(color: ColorResult, ..._: any[]): void {
        this.props.onColorChange.next(color);
    }
}