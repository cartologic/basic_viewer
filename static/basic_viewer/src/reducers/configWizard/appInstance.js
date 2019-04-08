import * as actionTypes from '../../actions/configWizard/constants';


let appInitialState = {
    app: null,
    app_map: null,
    title: null,
    description: null,
    config: {
        enableHistory: true,
        enableFeatureTable: true,
        showLayerSwitcher: true,
        showExportMap: true,
        showLegend: true,
        bookmarks: []
    }    
}

export function appInstance(state = appInitialState, action) {

    const setAppInstanceInitialData = (state, map) => {
        return {
            ...state,
            app_map: map.id,
            title: map.title,
            description: map.description,
            map_center: map.center,
            map_zoom: map.zoom
        };
    };

    const resetAppInstance = () => {
        return {
            app: null,
            app_map: null,
            title: null,
            description: null,
            config: {
                bookmarks: []
            }
        };
    };

    const addBookmark = (state, bookmark) => {
        let newBookmarks = [...state.config.bookmarks];
        newBookmarks.push(bookmark);

        let newConfig = { ...state.config };
        newConfig.bookmarks = newBookmarks;
        return {
            ...state,
            config: newConfig
        };
    };

    const updateBookmark = (state, bookmark, index) => {
        let newBookmarks = [...state.config.bookmarks];
        newBookmarks.splice(index, 1, bookmark);

        let newConfig = { ...state.config };
        newConfig.bookmarks = newBookmarks;
        return {
            ...state,
            config: newConfig
        };
    };

    const removeBookmark = (state, index) => {
        let newBookmarks = [...state.config.bookmarks];
        newBookmarks.splice(index, 1);

        let newConfig = { ...state.config };
        newConfig.bookmarks = newBookmarks;
        return {
            ...state,
            config: newConfig
        };
    };

    switch (action.type) {
        case actionTypes.SET_INITIAL_DATA:
            return setAppInstanceInitialData(state, action.map);

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


        default:
            return state
    }
}