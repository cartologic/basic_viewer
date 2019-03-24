import "@babel/polyfill/noConflict"
import React from 'react'
import ReactDOM from 'react-dom'

class Config extends React.Component {
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
var elem = document.getElementById("basicviewer-app")
if (!elem) {
    elem = document.createElement('div', { "id": "basicviewer-app" })
    document.body.prepend(elem)
}
ReactDOM.render(<Config />, elem)
if (module.hot) {
    module.hot.accept()
}