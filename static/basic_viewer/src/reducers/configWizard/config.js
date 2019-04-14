import * as actionTypes from '../../actions/configWizard/constants';


let appInitialState = {
    mode: null,
    instanceToEdit: null
}

export function config(state = appInitialState, action) {

    const setAppMode = (state, mode) => {
        return {
            ...state,
            mode: mode
        };
    };

    const setToEditInstance = (state, instance) => {
        return {
            ...state,
            instanceToEdit: instance
        };
    };

    switch (action.type) {
        case actionTypes.SET_APP_MODE:
            return setAppMode(state, action.mode);

        case actionTypes.SET_TO_EDIT_INSTANCE:
            return setToEditInstance(state, action.instance);

        default:
            return state;
    }
}