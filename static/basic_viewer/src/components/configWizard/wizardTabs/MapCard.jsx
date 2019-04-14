import React, { Component } from 'react';
import { Card, Input, CardText, CardImg, Button, CardTitle, Col, Label } from 'reactstrap';


class MapCard extends Component {

    render() {
        return (
            <Label check className="radio-container">
                <Input type="radio" name="selectedMapRadio" checked={this.props.checked} onChange={this.props.onSelectMapHandler} />
                <span className="checkmark"></span>
                <Card className={this.props.checked ? "m-3 flex-row flex-wrap selected-bg"
                    : "m-3 flex-row flex-wrap"} outline>
                    <Col sm={5} className="nopadding" >
                        <CardImg src={this.props.map.thumbnail ? this.props.map.thumbnail : "//placehold.it//300"} alt="Card image cap" />
                    </Col>
                    <Col sm={6} className="d-flex flex-column">
                        <CardTitle className="mt-2 font-weight-bold ">{this.props.map.title}</CardTitle>
                        <CardText>{this.props.map.description}</CardText>
                        {this.props.map.owner ?
                            <CardText><strong>Owner: </strong>{this.props.map.owner}</CardText> : null}
                        <Button className="mt-auto mb-1" disabled>Show Details</Button>
                    </Col>
                </Card>
            </Label>
        );
    }
}

export default MapCard;