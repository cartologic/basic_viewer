import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button, Alert, Spinner } from 'reactstrap';

import { postAppInstance, updateAppInstance } from '../../api';
import { APP_MODE } from '../../shared';


class ActionBar extends Component {
    state = {
        loading: false,
        successAlertIsVisible: false,
        errorAlertIsVisible: false,
    };

    onDismissSuccess = () => {
        this.setState({ successAlertIsVisible: false });
    }

    onDismissError = () => {
        this.setState({ errorAlertIsVisible: false });
    }

    addAppInstance = () => {
        this.setState({
            loading: true
        });
        postAppInstance(this.props.appInstance).then(response => {
            this.setState({
                loading: false,
                successAlertIsVisible: true
            });
            setTimeout(() => {
                this.setState({
                    successAlertIsVisible: false
                });
            }, 5000);

            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    editAppInstance = () => {
        this.setState({
            loading: true
        });
        updateAppInstance(this.props.appInstanceId, this.props.appInstance).then(
            response => {
                this.setState({ loading: false, successAlertIsVisible: true });
                setTimeout(() => {
                    this.setState({
                        successAlertIsVisible: false
                    });
                }, 5000);

                console.log(response);
            }).catch(error => {
                this.setState({ loading: false, errorAlertIsVisible: true });

                setTimeout(() => {
                    this.setState({
                        errorAlertIsVisible: false
                    });
                }, 5000);
                console.log(error);
            });
    };

    render() {
        return (
            <Col lg={12} className="mb-3">
                <Alert color="success" isOpen={this.state.successAlertIsVisible} toggle={this.onDismissSuccess}>
                    Your data is submitted successfully
                </Alert>
                <Alert color="danger" isOpen={this.state.errorAlertIsVisible} toggle={this.onDismissError}>
                    Something went wrong !
                </Alert>
                <Button color="primary"
                    className="float-right"
                    onClick={this.props.isEditMode ? this.editAppInstance : this.addAppInstance}
                    disabled={!this.props.isAnyMapSelected} >
                    {this.state.loading ? <Spinner color="light" /> :
                        this.props.isEditMode ? "Save Changes" : "Save"}
                </Button>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAnyMapSelected: state.appInstance.app_map != null,
        appInstance: state.appInstance,
        appInstanceId: state.config.instanceToEdit ? state.config.instanceToEdit.id : null,
        isEditMode: state.config.mode == APP_MODE.EDIT
    }
}

export default connect(mapStateToProps)(ActionBar);