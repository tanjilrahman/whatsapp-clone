import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';

const configureStore = () => {
    const store = createStore((authReducer), applyMiddleware(thunk))

    return store;
}

export default configureStore;