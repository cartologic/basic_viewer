import React from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import MapSelector from './wizardTabs/MapSelector';
import GeneralConfig from './wizardTabs/GeneralConfig';
import Bookmarks from './wizardTabs/Bookmarks';


class WizardTabs extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Col lg={3}>
                    <Nav tabs vertical pills className="cartoviewNavList">
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '1' ? "active" : null}
                                onClick={() => { this.toggle('1'); }}>
                                Select Map
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '2' ? "active" : null}
                                onClick={() => { this.toggle('2'); }} disabled={!this.props.isAnyMapSelected}>
                                General
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '3' ? "active" : null}
                                onClick={() => { this.toggle('3'); }} disabled={!this.props.isAnyMapSelected}>
                                Access Configuration
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '4' ? "active" : null}
                                onClick={() => { this.toggle('4'); }} disabled={!this.props.isAnyMapSelected} >
                                Bookmarks
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '5' ? "active" : null}
                                onClick={() => { this.toggle('5'); }} disabled={!this.props.isAnyMapSelected}>
                                GeoCoding
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={this.state.activeTab === '6' ? "active" : null}
                                onClick={() => { this.toggle('6'); }} disabled={!this.props.isAnyMapSelected}>
                                Navigation Tools
                                </NavLink>
                        </NavItem>
                    </Nav>
                </Col>

                <Col lg={9}>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <MapSelector />
                            </Row>
                        </TabPane>

                        <TabPane tabId="2" >
                            <Row>
                                <Col sm="12">
                                    <GeneralConfig />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4" >
                            <Row>
                                <Col sm="12">
                                    {this.state.activeTab == 4 ? <Bookmarks /> : null}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAnyMapSelected: state.appInstance.app_map != null,
    }
}

export default connect(mapStateToProps)(WizardTabs);