import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, FormGroup, Label, Input } from 'reactstrap';

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
            <Col>
                <FormGroup>
                    <Label>App Title</Label>
                    <Input onChange={this.onChangeTitle}
                        value={this.props.app.title || ''}
                        type="text" placeholder="App Name" />
                </FormGroup>
                <FormGroup>
                    <Label>Description (Optional)</Label>
                    <Input onChange={this.onChangeDescription} type="text" placeholder="App Description"
                        value={this.props.app.description || ''} />
                </FormGroup>
                <FormGroup>
                    <Label>Keywords</Label>
                    <Input type="select">
                        <option>1</option>
                        <option>2</option>
                    </Input>
                </FormGroup>
            </Col>
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