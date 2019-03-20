import "@babel/polyfill/noConflict"
import '../css/base.css'
import 'ol/ol.css'
import '../css/popup.css'

import React, { Component } from 'react'

import BasicViewerHelper from 'cartoview-sdk/helpers/BasicViewerHelper'
import { BasicViewerProvider } from '../context'
import ContentGrid from '../components/ContentGrid'
import FeatureIdentify from '../services/Identify'
import FeaturesHelper from 'cartoview-sdk/helpers/FeaturesHelper'
import Overlay from 'ol/overlay'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { fetchAppSettings } from '../api/index'
import proj from 'ol/proj'
import proj4 from 'proj4'
import store from '../store'

proj.setProj4(proj4)

class BasicViewer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: BasicViewerHelper.getMap(),
            drawerOpen: false,
            featureIdentifyLoading: false,
            featureIdentifyResult: [],
            showPopup: false,
            activeFeature: 0,
            mouseCoordinates: [0, 0]
        }
        global.map = this.state.map
    }
    changeShowPopup = () => {
        const { showPopup } = this.state
        this.setState({ showPopup: !showPopup })
    }
    nextFeature = () => {
        const { activeFeature } = this.state
        const nextIndex = activeFeature + 1
        this.setState({ activeFeature: nextIndex })
    }
    previousFeature = () => {
        const { activeFeature } = this.state
        const previuosIndex = activeFeature - 1
        this.setState({ activeFeature: previuosIndex })
    }
    toggleDrawer = () => {
        const { drawerOpen } = this.state
        this.setState({ drawerOpen: !drawerOpen })
    }
    componentDidMount() {
        const { map } = this.state
        store.dispatch(fetchAppSettings(226))
        this.overlay = new Overlay({
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            },
            positioning: 'center-center'
        })
        map.addOverlay(this.overlay)
        map.on('singleclick', (evt) => {
            if (this.overlay) {
                this.overlay.setElement(undefined)
            }
            this.setState({
                featureIdentifyLoading: true,
                activeFeature: 0,
                featureIdentifyResult: [],
                showPopup: false,
                mouseCoordinates: evt.coordinate,
            }, () => this.identify(evt))
        })
    }
    addOverlay = (node) => {
        const { activeFeature, featureIdentifyResult, mouseCoordinates } =
            this.state
        let position = mouseCoordinates
        if (featureIdentifyResult.length > 0) {
            const currentFeature = featureIdentifyResult[activeFeature]
            const geometry = currentFeature.getGeometry()
            position = FeaturesHelper.getGeometryCenter(geometry)
        }
        this.overlay.setElement(node)
        this.overlay.setPosition(position)
    }
    getContextValue = () => {
        return {
            reduxState: store.getState(),
            ...this.state,
            toggleDrawer: this.toggleDrawer,
            nextFeature: this.nextFeature,
            previousFeature: this.previousFeature,
            changeShowPopup: this.changeShowPopup,
            addOverlay: this.addOverlay
        }
    }
    identify = (evt) => {
        const { map } = this.state
        Promise.all(FeatureIdentify.identify(map, evt)).then(featureGroups => {
            let features = []
            for (let g = 0, gg = featureGroups.length; g < gg; g++) {
                const layers = Object.keys(featureGroups[g])
                for (let l = 0, ll = layers.length; l < ll; l++) {
                    const layer = layers[l]
                    let newFeatures = featureGroups[g][layer].map(f => {
                        f.set('layerName', layer)
                        return f
                    })
                    features = [...features, ...newFeatures]
                }
            }
            this.setState({
                featureIdentifyLoading: false,
                activeFeature: 0,
                featureIdentifyResult: features,
                showPopup: true,
            })
        })
    }
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <BasicViewerProvider value={this.getContextValue()}>
                        <ContentGrid />
                    </BasicViewerProvider>
                </React.Fragment>
            </Provider>
        )
    }
}
var elem = document.getElementById("basicviewer-app")
if (!elem) {
    elem = document.createElement('div', { "id": "basicviewer-app" })
    document.body.prepend(elem)
}
ReactDOM.render(<BasicViewer />, elem)
if (module.hot) {
    module.hot.accept()
}