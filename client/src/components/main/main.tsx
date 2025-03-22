import * as React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Admin, Home, Lights } from "../../components";
import "./main.scss";

type TypedTabs = "home" | "lights" | "plants" | "admin";

interface IProps {

}

interface IState {
    key: TypedTabs
}

export class Main extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            key: "home"
        };
    }

    render(): JSX.Element {
        return (
            <Tabs
                id="main"
                className="main"
                activeKey={this.state.key}
                onSelect={(k: any) => this.setState({ key: k })}
                unmountOnExit={true}
                variant="pills"
            >
                <Tab eventKey="home" title="Home">
                    <Home />
                </Tab>
                <Tab eventKey="lights" title="Lights">
                    <Lights />
                </Tab>
                {/* <Tab eventKey="plants" title="Plants">
                    <Plants />
                </Tab> */}
                <Tab eventKey="admin" title="Admin">
                    <Admin />
                </Tab>
            </Tabs>
        );
    }
}