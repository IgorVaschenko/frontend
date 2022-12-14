import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const strEnhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    const { dispatch } = store
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return dispatch({ type: action })
        }
        return dispatch(action)
    }
    return store
}
const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args)
    const { dispatch } = store
    store.dispatch = (action) => {
        console.log(action.type);
        dispatch(action)
    }
    return store
}


const logMiddleware = ({ getState, dispatch }) => (dispatch) => (action) => {
    console.log(action.type, ' state - ', getState());
    return dispatch(action)
}
///store => {getState, dispatch}
const strMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({ type: action })
    }
    return dispatch(action)
}

const myAction = (dispatch) => {
    setTimeout(() => {
        dispatch('MY_ACTION')
        dispatch({ type: 'MY_ACTION' })
    }, 2000)
}
const myActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({ type: 'MY_ACTION_CREATOR' })
        , timeout)
}

// const store = createStore(rootReducer, compose(strEnhancer, logEnhancer))
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, strMiddleware, logMiddleware)
)

store.dispatch('1_@_3_4_$')
store.dispatch(myAction)
store.dispatch(myActionCreator(3500))



export default store