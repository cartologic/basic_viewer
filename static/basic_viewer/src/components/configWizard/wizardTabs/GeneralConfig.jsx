import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, FormGroup, Label, Input, Row, Container } from 'reactstrap';

import * as actions from '../../../actions/configWizard/index';


class GeneralConfig extends Component {

    onChangeTitle = (event) => {
        this.props.setTitle(event.target.value);
    }

    onChangeDescription = (event) => {
        this.props.setDescription(event.target.value);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>General Configuration</h3>
                    </Col>
                </Row>
                <Row className="top-buffer">
                    <Col>
                        <FormGroup>
                            <Label><strong>App Title</strong></Label>
                            <Input onChange={this.onChangeTitle}
                                value={this.props.app.title || ''}
                                type="text" placeholder="App Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label><strong>Description (Optional)</strong></Label>
                            <Input onChange={this.onChangeDescription}
                                value={this.props.app.description || ''}
                                type="textarea" placeholder="App Description" />
                        </FormGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.appInstance,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (title) => dispatch(actions.setTitle(title)),
        setDescription: (description) => dispatch(actions.setDescription(description)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralConfig);