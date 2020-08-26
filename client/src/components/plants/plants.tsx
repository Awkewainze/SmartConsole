import { Component } from "react";

import * as React from "react";
import "./plants.scss";
import { CardColors } from "~components/box-list/box-list";
import { Card, CardDeck, Container, Row, Col } from "react-bootstrap";

interface Plant {
    id: string;
    name: string;
    type: string;
    needsWatering: boolean;
    img: string;
}

interface IProps {

}

interface IState {
    plants: Array<Plant>
}

let needsWateringCardColors: CardColors = {
    backgroundColor: "danger",
    textColor: "white"
};

let doesNotNeedWateringCardColors: CardColors = {
    backgroundColor: "success",
    textColor: "white"
}
// https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png
export class Plants extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            plants: [
                {
                    id: "0",
                    name: "Margaret",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/jade-planting-growing.jpg?itok=XAWRrD6K"
                },
                {
                    id: "1",
                    name: "Steve",
                    type: "Basil",
                    needsWatering: true,
                    img: "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/jade-planting-growing.jpg?itok=XAWRrD6K"
                },
                {
                    id: "2",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "3",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "4",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "5",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "6",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "7",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "8",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "9",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "10",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "11",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
                {
                    id: "12",
                    name: "Thatcher",
                    type: "Oregano",
                    needsWatering: false,
                    img: "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png"
                },
            ]
        };
    }

    render(): JSX.Element {
        return (
            <Container className="plants" fluid={true}>
                {this.chunkArray(this.state.plants, 6).map(cards => (<Row className="plant-row" key={cards.reduce((prev, curr) => prev + curr.id, "")}>{cards.map(this.plantToCard)}</Row>))}
            </Container>
        )
    }

    plantToCard(plant: Plant): JSX.Element {
        const colors = plant.needsWatering ? needsWateringCardColors : doesNotNeedWateringCardColors;
        return (
            <Col xs={2} key={plant.id}>
                <Card bg={colors.backgroundColor} text={colors.textColor} className="plant-card">
                    <Card.Img className="plant-card-img" variant="top" src={plant.img}></Card.Img>
                    <Card.Body>
                        <Card.Text>{plant.name} ({plant.type})</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    private chunkArray<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunked_arr[chunked_arr.length - 1];
            if (!last || last.length === chunkSize) {
                chunked_arr.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunked_arr;
    }
}