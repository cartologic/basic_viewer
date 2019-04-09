import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container, CustomInput } from 'reactstrap';

import * as actions from '../../../actions/configWizard/index';


class NavigationTools extends Component {

    state = {
        navTools: [
            { id: 'enableHistory', label: 'Enable History' },
            { id: 'enableFeatureTable', label: 'Enable Feature Table' },
            { id: 'showLayerSwitcher', label: 'Show Layer Switcher' },
            { id: 'showExportMap', label: 'Show Export Map' },
            { id: 'showLegend', label: 'Show Legand' },
        ]
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col><h3>Navigation Tools</h3></Col>
                </Row>
                <Row className="top-buffer">
                    <Col >
                        {this.state.navTools.map(tool => {
                            return <CustomInput key={tool.id} type="checkbox" className="m-2"
                                id={tool.id} label={tool.label} checked={this.props.navTools[tool.id]}
                                onChange={() => { this.props.updateNavTool(tool.id) }} />
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        navTools: state.appInstance.config
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateNavTool: (navToolId) => dispatch(actions.updateNavTool(navToolId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationTools);