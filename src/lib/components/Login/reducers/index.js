import {
  REQUEST_LOGIN,
  RECIEVE_LOGIN
} from '../actions'


function handleLogin (
  state = {
    isFetching: false,
    token: ""
  }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign(
        {}, state, {
          isFetching: true
        }
      )
    case RECIEVE_LOGIN:
      return Object.assign(
        {}, state, {
          isFetching: false,
          token: action.token
        }
      )
    default:
      return state

  }
}

export default handleLogin