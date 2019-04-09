import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Input, CardText, CardImg, Button, CardTitle, Col, Label } from 'reactstrap';

import * as actions from '../../../actions/configWizard/index';


class MapCard extends Component {

    onChangeHandler = (event) => {
        this.props.setAppInstanceInitialData(this.props.map);
    }

    render() {

        return (
            <Label check className="radio-container">
                <Input type="radio" name="selectedMapRadio"
                    onChange={this.onChangeHandler}
                />
                <span className="checkmark"></span>

                <Card className="m-3 flex-row flex-wrap" outline>
                    <Col sm={5} className="nopadding" >
                        <CardImg src="//placehold.it//300" alt="Card image cap" />
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

const mapDispatchToProps = dispatch => {
    return {
        setAppInstanceInitialData: (map) => dispatch(actions.setAppInstanceInitialData(map)),
    }
};

export default connect(null, mapDispatchToProps)(MapCard);