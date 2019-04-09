import React from 'react';
import { connect } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import MapSelector from './wizardTabs/MapSelector';
import GeneralConfig from './wizardTabs/GeneralConfig';
import Bookmarks from './wizardTabs/Bookmarks';
import NavigationTools from './wizardTabs/NavigationTools';
import AccessConfiguration from './wizardTabs/AccessConfiguration';


class WizardTabs extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "MapSelector"
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    render() {
        let NavListItmes = [
            { id: 'MapSelector', displayName: 'Select Map' },
            { id: 'GeneralConfig', displayName: 'General' },
            { id: 'AccessConfig', displayName: 'Access Configuration' },
            { id: 'Bookmarks', displayName: 'Bookmakrs' },
            { id: 'NavTools', displayName: 'Navigation Tools' }];

        let bookmark = this.state.activeTab == "Bookmarks" ? <Bookmarks /> : null;

        return (
            <React.Fragment>
                <Col lg={3}>
                    <Nav tabs vertical pills className="cartoviewNavList">
                        {NavListItmes.map(item => {
                            return <NavItem key={item.id}>
                                <NavLink
                                    className={this.state.activeTab === item.id ? "active" : null}
                                    disabled={!this.props.isAnyMapSelected}
                                    onClick={() => this.toggle(item.id)}>
                                    {item.displayName}
                                </NavLink>
                            </NavItem>
                        })}
                    </Nav>
                </Col>

                <Col lg={9}>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="MapSelector">
                            <Row>
                                <MapSelector />
                            </Row>
                        </TabPane>
                        <TabPane tabId="GeneralConfig" >
                            <Row>
                                <Col sm="12">
                                    <GeneralConfig />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="AccessConfig" >
                            <Row>
                                <Col sm="12">
                                    <AccessConfiguration />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="Bookmarks" >
                            <Row>
                                <Col sm="12">
                                    {bookmark}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="NavTools" >
                            <Row>
                                <Col sm="12">
                                    <NavigationTools />
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