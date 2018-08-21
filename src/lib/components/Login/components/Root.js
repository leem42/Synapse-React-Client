import React from 'react'

// store related imports
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// view related
import { Provider } from 'react-redux'

// containers
import UserViewContainer from '../containers/UserViewContainer';

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,  // lets us do async by allowing functions to actions
        loggerMiddleware
    )
)

export default class Login extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <UserViewContainer />
            </Provider>
        )
    }
}