import * as React from "react";

import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css'; // if you just want css
import 'react-touch-screen-keyboard/lib/Keyboard.scss'; // if you've got sass-loader


interface IProps {
    value: string;
    onChange: (value: string) => void;
}

interface IState {

}

export class SimpleTouchInput extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (<KeyboardedInput
            enabled
            value={this.props.value}
            onChange={this.props.onChange}
        />)
    }
}