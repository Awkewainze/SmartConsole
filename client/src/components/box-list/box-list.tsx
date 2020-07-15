import * as React from "react";
import { Card } from "react-bootstrap";
import "./box-list.scss";


interface IProps<T> {
    items: Array<T>;
    getKey: (item: T) => string;
    getDisplayName: (item: T) => string;
    canSelectMultiple?: boolean;
    onSelectedValueChanged?: (items: Array<T>) => void;
}

interface IState {
    selectedItemsKeys: Array<string>
}

export class BoxList<T> extends React.PureComponent<IProps<T>, IState> {
    constructor(props: IProps<T>) {
        super(props);
        this.state = {
            selectedItemsKeys: []
        };
    }

    render() {
        return (
            <div className="box-list">
                {this.props.items.map(item => this.itemToCard(item))}
            </div>
        )
    }

    private onSelectCard(key: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const wasSelected = this.state.selectedItemsKeys.indexOf(key) > -1;
        let newKeys: Array<string>;
        if (this.props.canSelectMultiple) {
            if (wasSelected) {
                newKeys = this.state.selectedItemsKeys.filter(x => x !== key)
            } else {
                newKeys = this.state.selectedItemsKeys.concat([key]);
            }
        } else {
            newKeys = [key];
        }

        this.setState({selectedItemsKeys: newKeys});
        if (this.props.onSelectedValueChanged) {
            this.props.onSelectedValueChanged(newKeys.map(newKey => this.props.items.find(item => this.props.getKey(item) === newKey) as any));
        }
    }

    private itemToCard(item: T): JSX.Element {
        const key = this.props.getKey(item);
        const className = this.state.selectedItemsKeys.indexOf(key) > -1 ? "selected" : "";
        const displayName = this.props.getDisplayName(item);
        return (
            <Card key={key} className={className} onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => this.onSelectCard(key, event)}>
                <Card.Body>
                    <Card.Text>{displayName}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}