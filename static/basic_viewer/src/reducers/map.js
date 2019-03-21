import BasicViewerHelper from 'cartoview-sdk/helpers/BasicViewerHelper';
import * as actions from '../actions/constants';

let mapInitialState = {
    name: "Web Map",
    layers: [],
    view: {
        center: [0, 0],
        constrainRotation: true,
        enableRotation: true,
        rotation: 0,
        extent: undefined,
        maxZoom: 28,
        minZoom: 0,
        projection: "EPSG:3857",
        zoomFactor: 2,
        zoom: 6
    },
    renderOptions: {},
    loadTilesWhileAnimating: false,
    loadTilesWhileInteracting: false,
    moveTolerance: 1,
    ol_map: BasicViewerHelper.getMap(),
}


export function map(state = mapInitialState, action) {
    switch (action.type) {
        case actions.SET_WEB_MAP:
            return { ...state, ...action.payload }
        case actions.UPDATE_MAP_VIEW:
            return { ...state, view: { ...state.view, ...action.payload } }
        case actions.SET_MAP_VIEW:
            return { ...state, view: action.payload }
        case actions.SET_MAP_LAYERS:
            return { ...state, layers: action.payload }
        case actions.ADD_MAP_LAYERS:
            return { ...state, layers: [...state.layers, ...action.payload] }
        case actions.UPDATE_WEB_MAP:
            return { ...state, ...action.payload }
        case actions.DELETE_MAP_LAYERS:
            return {
                ...state,
                layers: state.layers.filter(lyr => !action.payload.includes(lyr.id))
            }
        case actions.EXPORT_MAP:
            BasicViewerHelper.exportMap(action.payload);
            return state;
        default:
            return state
    }
}
