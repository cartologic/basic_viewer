import * as actionTypes from './constants';


export const setAppMode = (mode) => {
    return {
        type: actionTypes.SET_APP_MODE,
        mode: mode
    };
};

export const setToEditInstance = (appInstance) => {
    return {
        type: actionTypes.SET_TO_EDIT_INSTANCE,
        instance: appInstance
    };
};