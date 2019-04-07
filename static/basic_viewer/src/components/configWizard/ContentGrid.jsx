import React, { Component } from 'react';
import { Row } from 'reactstrap';

import WizardTabs from './WizardTabs';


class ContentGrid extends Component {

    render() {
        return (
            <Row className="top-buffer">
                <WizardTabs />
                {/* <ActionBar/> */}
            </Row>
        );
    }
}

export default ContentGrid;