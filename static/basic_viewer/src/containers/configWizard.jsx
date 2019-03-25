import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store/configWizard';


class ConfigWizard extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <React.Fragment>

                </React.Fragment>
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