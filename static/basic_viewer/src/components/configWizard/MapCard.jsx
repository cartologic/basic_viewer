import React, { Component } from 'react';
import { Card, Row, CardBody, CardHeader, CardText, CardImg, Button, CardSubtitle, CardTitle, Col } from 'reactstrap';

class MapCard extends Component {
    state = {
    };

    componentDidMount() {

    }

    render() {
        return (
            <Card className=" resource-box flex-row flex-wrap ">
                <Col sm={5} className="nopadding" >
                    <CardImg src="//placehold.it/200" alt="Card image cap" />
                </Col>
                <Col sm={7}>
                    <CardTitle className="mt-2">{this.props.map.title}</CardTitle>
                    <CardBody>
                        <CardText>{this.props.map.description}</CardText>
                        <Button>Show Details</Button>
                    </CardBody>
                </Col>

            </Card>
        );
    }
}

export default MapCard;