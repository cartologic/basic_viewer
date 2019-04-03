import * as actionTypes from './constants';


export const setAppInstanceInitialData = (selectedMap) => {
    return {
        type: actionTypes.SET_INITIAL_DATA,
        map: selectedMap
    };
};

export const resetSelectedMap = () => {
    return {
        type: actionTypes.RESET_SELECTED_MAP,
    };
};

export const setTitle = (title) => {
    return {
        type: actionTypes.SET_TITLE,
        title: title
    };
};

export const setDescription = (description) => {
    return {
        type: actionTypes.SET_DESCRIPTION,
        description: description
    };
};