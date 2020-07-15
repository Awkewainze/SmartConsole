import * as React from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { Home, Lights } from "../index";
import "./main.scss";

type TypedTabs = "home" | "lights" | "contact";

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
          <Tab eventKey="contact" title="More coming soon">
            <p>contact</p>
          </Tab>
        </Tabs>
    );
  }
}