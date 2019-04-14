import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from '../store/configWizard';
import AppHeader from '../components/configWizard/AppHeader';
import ContentGrid from '../components/configWizard/ContentGrid';
import * as actions from '../actions/configWizard/index';
import { APP_MODE } from '../shared';
import { getAppInstance, getMap } from '../api';


class ConfigWizard extends React.Component {

    componentWillMount() {

        //setting app mode new/edit 
        var urlParts = window.location.href.split("/");
        if (urlParts[urlParts.length - 1] == 'edit') {
            var appInstanceId = urlParts[urlParts.length - 2];
            store.dispatch(actions.setAppMode(APP_MODE.EDIT));

            //in edit mode so fetching the app instance from api and store it
            getAppInstance(appInstanceId).then(
                response => {
                    store.dispatch(actions.setToEditInstance(response.data));
                    store.dispatch(actions.setInitialData(response.data));

                    //get app map to set center and zoom for bookmarks initial map view
                    getMap(response.data.app_map).then(app_map => {
                        store.dispatch(actions.setMapData(app_map.data));
                    });
                });
        } else {
            store.dispatch(actions.setAppMode(APP_MODE.ADD_NEW));
        }
    }

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