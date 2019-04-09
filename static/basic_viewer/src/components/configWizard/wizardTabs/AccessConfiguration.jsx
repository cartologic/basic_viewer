import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';
import { Col, Row, Container, Label } from 'reactstrap';

import { getUsers } from '../../../api';
import * as actions from '../../../actions/configWizard/index';


class AccessConfiguration extends Component {

    state = {
        accessConfig: [
            { id: 'whoCanView', label: 'Who can view (optional)' },
            { id: 'whoCanChangeMetadata', label: 'Who can change metadata (optional)' },
            { id: 'whoCanDelete', label: 'Who can delete (optional)' },
            { id: 'whoCanChangeConfiguration', label: 'Who can change configuration (optional)' },
        ],
        users: []
    }

    componentDidMount() {
        getUsers().then(response => {
            let usersOptions = response.data.results.map(user => {
                return { label: user.username, value: user.username }
            });
            this.setState({ users: usersOptions });
        });
    }

    filterColors = (inputValue) => {
        return this.state.users.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.filterColors(inputValue));
            }, 1000);
        });

    changeHandler = configId => event => {
        this.props.updateAccessConfig(configId, event.map(user => user.value));
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Access Configuration</h3>
                    </Col>
                </Row>
                <Row className="top-buffer">
                    <Col>
                        {this.state.accessConfig.map(config => {
                            return <div key={config.id} className="mb-3">
                                <Label><strong>{config.label}</strong></Label>
                                <AsyncSelect
                                    isMulti
                                    isSearchable
                                    cacheOptions
                                    defaultOptions
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    loadOptions={this.promiseOptions}
                                    onChange={this.changeHandler(config.id)} />
                            </div>
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        accessConfig: state.appInstance.access
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAccessConfig: (accessConfigId, usersArray) => dispatch(actions.updateAccessConfig(accessConfigId, usersArray)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccessConfiguration);