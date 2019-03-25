import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../../reducers/configWizard';

export function configureStore( initialState ) {
    return createStore( rootReducer, initialState, composeWithDevTools(
        applyMiddleware( ReduxThunk ) ) )
};
