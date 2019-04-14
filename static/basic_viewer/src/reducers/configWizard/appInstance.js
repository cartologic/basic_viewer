import * as actionTypes from '../../actions/configWizard/constants';


let appInitialState = {
    app: 1,
    app_map: null,
    title: null,
    description: null,
    config: {
        enableHistory: true,
        enableFeatureTable: true,
        showLayerSwitcher: true,
        showExportMap: true,
        showLegend: true
    },
    bookmarks: [],
    access: {
        whoCanView: [],
        whoCanChangeMetadata: [],
        whoCanDelete: [],
        whoCanChangeConfiguration: []
    }
}

export function appInstance(state = appInitialState, action) {

    const resetAppInstance = () => {
        return appInitialState;
    };

    const setInitialData = (state, instanceToEdit) => {
        return {
            ...state,
            app_map: instanceToEdit.app_map,
            title: instanceToEdit.title,
            description: instanceToEdit.description,
            bookmarks: instanceToEdit.bookmarks,
            config: instanceToEdit.config ? instanceToEdit.config : {
                //if the saved instance has no config set initial config elements to false
                enableHistory: false,
                enableFeatureTable: false,
                showLayerSwitcher: false,
                showExportMap: false,
                showLegend: false
            },
            access: instanceToEdit.access ? instanceToEdit.access : state.access,
        };
    };

    const setMapData = (state, map) => {
        return {
            ...state,
            app_map: map.id,
            title: state.title ? state.title : map.title,
            description: state.description ? state.description : map.description,
            map_center: map.center,
            map_zoom: map.zoom,
        };
    };

    const addBookmark = (state, bookmark) => {
        let newBookmarks = [...state.bookmarks];
        newBookmarks.push(bookmark);
        return {
            ...state,
            bookmarks: newBookmarks
        };
    };

    const updateBookmark = (state, bookmark, index) => {
        let newBookmarks = [...state.bookmarks];
        newBookmarks.splice(index, 1, bookmark);
        return {
            ...state,
            bookmarks: newBookmarks
        };
    };

    const removeBookmark = (state, index) => {
        let newBookmarks = [...state.bookmarks];
        newBookmarks.splice(index, 1);
        return {
            ...state,
            bookmarks: newBookmarks
        };
    };

    const updateNavTool = (state, id) => {
        let newConfig = { ...state.config };
        newConfig[id] = !newConfig[id];
        return {
            ...state,
            config: newConfig
        };
    };

    const updateAccessConfig = (state, id, users) => {
        let newAccessConfig = { ...state.access };
        newAccessConfig[id] = users;
        return {
            ...state,
            access: newAccessConfig
        };
    };

    switch (action.type) {
        case actionTypes.SET_INITIAL_DATA:
            return setInitialData(state, action.instanceToEdit);

        case actionTypes.SET_MAP_DATA:
            return setMapData(state, action.map);

        case actionTypes.RESET_SELECTED_MAP:
            return resetAppInstance();

        case actionTypes.SET_TITLE:
            return { ...state, title: action.title };

        case actionTypes.SET_DESCRIPTION:
            return { ...state, description: action.description };

        case actionTypes.ADD_BOOKMARK:
            return addBookmark(state, action.bookmark);

        case actionTypes.UPDATE_BOOKMARK:
            return updateBookmark(state, action.bookmark, action.index);

        case actionTypes.REMOVE_BOOKMARK:
            return removeBookmark(state, action.index);

        case actionTypes.UPDATE_NAV_TOOL:
            return updateNavTool(state, action.id);

        case actionTypes.UPDATE_ACCESS_CONFIG:
            return updateAccessConfig(state, action.id, action.users);

        default:
            return state
    }
}