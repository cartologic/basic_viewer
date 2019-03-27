import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import MapSelector from './MapSelector';

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
                                onClick={() => { this.toggle('2'); }}>
                                Tab 2
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
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <h4>Tab 2  Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </React.Fragment>
        );
    }
}

export default WizardTabs;