import * as actionTypes from '../../actions/configWizard/constants';

let appInitialState = {
    map_url: null,
    title: null,
    description: null,
    config: {}
}

export function appInstance(state = appInitialState, action) {

    const setAppInstanceInitialData = (state, map) => {
        let mapUrl = "/api/maps/" + map.id + "/map_json/"
        return {
            ...state,
            map_url: mapUrl,
            title: map.title,
            description: map.description
        };
    }

    const resetAppInstance = () => {
        return {
            map_url: null,
            title: null,
            description: null,
            config: {}
        };
    }

    switch (action.type) {
        case actionTypes.SET_INITIAL_DATA:
            return setAppInstanceInitialData(state, action.map);

        case actionTypes.RESET_SELECTED_MAP:
            return resetAppInstance();

        case actionTypes.SET_TITLE:
            return { ...state, title: action.title };

        case actionTypes.SET_DESCRIPTION:
            return { ...state, description: action.description };

        default:
            return state
    }
}