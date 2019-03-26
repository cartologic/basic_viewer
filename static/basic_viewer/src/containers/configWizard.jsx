import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from '../store/configWizard';
import AppHeader from '../components/configWizard/AppHeader';
import ContentGrid from '../components/configWizard/ContentGrid';


class ConfigWizard extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Container>
                    <AppHeader />
                    <ContentGrid />
                </Container>
            </Provider>

        )
    }

}


var elem = document.getElementById("basicviewer-config")
if (!elem) {
    elem = document.createElement('div', { "id": "basicviewer-config" })
    document.body.prepend(elem)
}
ReactDOM.render(<ConfigWizard />, elem)
if (module.hot) {
    module.hot.accept()
}