import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initState from './initState';
import todoReducer from './reducers/todoReducer'


const store = createStore(todoReducer, initState, composeWithDevTools());

export default store;
