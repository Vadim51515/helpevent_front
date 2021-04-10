import {applyMiddleware, combineReducers, createStore} from 'redux';
import  thunkMiddleWare from 'redux-thunk'
import EventsReducer from './EventsReducer';
let reducers = combineReducers({
    eveReducer: EventsReducer,
});


let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
export default store;
