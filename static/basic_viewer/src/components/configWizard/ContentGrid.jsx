import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import WizardTabs from './WizardTabs';
import ActionBar from './ActionBar';


class ContentGrid extends Component {

    render() {
        return (
            <Row className="top-buffer">
                <Col>
                    <Row> <ActionBar/> </Row>
                    <Row> <WizardTabs/> </Row>
                </Col>            
            </Row>
        );
    }
}

export default ContentGrid;