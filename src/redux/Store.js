import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from "./UserReducer";

const reducer = combineReducers({
    information: userReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
