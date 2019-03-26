import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

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
                                Tab1
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
                    <Col lg={12}>
                        <TabContent className="tab-content" activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 1 Contents</h4>
                                    </Col>
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
                </Col>
            </React.Fragment>
        );
    }
}

export default WizardTabs;