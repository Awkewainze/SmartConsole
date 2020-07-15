import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Time, ColorPicker } from "../index";
import { Subject, Subscription, interval } from "rxjs";
import { ColorResult } from "react-color";
import { CommunicationService } from "../../services"
import { BoxList } from "~components/box-list/box-list";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import "./lights.scss";
import { debounce } from "rxjs/operators";

interface IProps {
}

interface IState {
  lights: Array<SuperSimpleLight>;
  groups: Array<SuperSimpleLightGroup>;
  selectedLights: Array<SuperSimpleLight>;
  selectedLightsOn: boolean;
  ct: number
}


export class Lights extends React.PureComponent<IProps, IState> {
    private readonly colorChangeSubject = new Subject<ColorResult>();
    private readonly ctChangeSubject = new Subject<number>();
    private readonly communicationService = CommunicationService.getInstance();
    private lightsSubscription: Subscription = Subscription.EMPTY;
    private groupsSubscription: Subscription = Subscription.EMPTY;
    private lightOrGroupChangedSubscription: Subscription = Subscription.EMPTY;
    private onColorChangeSubscription: Subscription = Subscription.EMPTY;
    private ctChangeSubscription: Subscription = Subscription.EMPTY;

    constructor(props: IProps) {
        super(props);
        this.state = {
          lights: [],
          groups: [],
          selectedLights: [],
          selectedLightsOn: false,
          ct: 500
        };
    }

    componentDidMount() {
      this.lightsSubscription = this.communicationService.onLightsAsObservable().subscribe(x => {
        console.log("update ct", x.length > 0 ? x[0].state?.ct as any : 500);
        this.setState({lights: x, ct: x.length > 0 ? x[0].state?.ct as any : 500});
      });
      this.groupsSubscription = this.communicationService.onGroupsAsObservable().subscribe(x => this.setState({groups: x}));
      this.lightOrGroupChangedSubscription = this.communicationService.onLightOrGroupChangedAsObservable().subscribe(x => {
        this.setState({lights: x.lights, groups: x.groups});
      });
      this.colorChangeSubject.subscribe(color => {
        if (!this.state.selectedLightsOn) return;
        for(const light of this.state.selectedLights) {
          this.communicationService.setLightState(light.id as any, {hue: color.hsl.h * 65535.0 / 360.0, saturation: color.hsl.s * 100, luminosity: color.hsl.l * 100});
        }
      });
      this.ctChangeSubscription = this.ctChangeSubject.pipe(debounce(() => interval(1000))).subscribe(this.ctChangedAfterDebounce.bind(this));

      this.communicationService.getLights();
      this.communicationService.getGroups();
    }

    componentWillUnmount() {
      this.lightsSubscription.unsubscribe();
      this.groupsSubscription.unsubscribe();
      this.lightOrGroupChangedSubscription.unsubscribe();
      this.onColorChangeSubscription.unsubscribe();
      this.ctChangeSubscription.unsubscribe();
    }

    render(): JSX.Element {
        return (<Container className="lights">
          <Row>
            <Col>
              <Container className="left-pane">
                <Row><BoxList items={this.state.lights} getKey={(light) => (light.id as string)}
                getDisplayName={(light) => `${light.name} (${light.state?.on ? "On" : "Off"})`}
                canSelectMultiple={true} onSelectedValueChanged={this.selectedLightsChanged.bind(this)} /></Row>
              </Container>
            </Col>
            <Col>
              <Container className="right-pane">
                <Row>
                  <div className="on-switch-container">
                    <BootstrapSwitchButton checked={this.state.selectedLightsOn} height={75}
                      onChange={this.lightsEnabled.bind(this)} onstyle="light" offstyle="dark" style="border" width={150} />
                  </div>
                </Row>
                <Row><ColorPicker onColorChange={this.colorChangeSubject}></ColorPicker></Row>
                <Row><p>Color Temperature</p><ReactBootstrapSlider value={this.state.ct} change={this.ctChange.bind(this)} max={500} min={153} reversed={true} disabled={this.state.selectedLightsOn ? "" : "disabled"} /></Row>
              </Container>
            </Col>
          </Row>
      </Container>)
    }

    private ctChangedAfterDebounce(value: number): void {
      for(const light of this.state.selectedLights) {
        this.communicationService.setLightState(light.id as any, {ct: value});
      }
    }

    private lightsEnabled(checked: boolean): void {
      for(const light of this.state.selectedLights) {
        this.communicationService.setLightState(light.id as any, {on: checked});
      }
      this.setState({
        selectedLightsOn: checked
      });
    }

    private selectedLightsChanged(lights: Array<SuperSimpleLight>): void {
      this.setState({
        selectedLights: lights,
        selectedLightsOn: lights.every(light => light.state?.on),
        ct: lights.length > 0 ? lights[0].state?.ct as any : 500
      });
    }

    private ctChange(event: any): void {
      this.setState({
        ct: event.target.value
      });

      this.ctChangeSubject.next(event.target.value);
    }
}