import * as actionTypes from './constants';


export const setInitialData = (instance) => {
    return {
        type: actionTypes.SET_INITIAL_DATA,
        instanceToEdit: instance
    };
};

export const setMapData = (selectedMap) => {
    return {
        type: actionTypes.SET_MAP_DATA,
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

export const addBookmark = (bookmark) => {
    return {
        type: actionTypes.ADD_BOOKMARK,
        bookmark: bookmark
    };
};

export const updateBookmark = (bookmark, index) => {
    return {
        type: actionTypes.UPDATE_BOOKMARK,
        bookmark: bookmark,
        index: index
    };
};

export const removeBookmark = (index) => {
    return {
        type: actionTypes.REMOVE_BOOKMARK,
        index: index
    };
};

export const updateNavTool = (navToolId) => {
    return {
        type: actionTypes.UPDATE_NAV_TOOL,
        id: navToolId
    };
};

export const updateAccessConfig = (accessConfigId, usersArray) => {
    return {
        type: actionTypes.UPDATE_ACCESS_CONFIG,
        id: accessConfigId,
        users: usersArray
    };
};