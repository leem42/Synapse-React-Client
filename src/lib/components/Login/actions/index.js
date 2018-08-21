import {login} from '../../../utils/SynapseClient'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECIEVE_LOGIN = 'RECIEVE_LOGIN'


function requestLogin () {
    return {
        type: REQUEST_LOGIN
    }
}

function recieveLogin (json) {
    return {
        type: RECIEVE_LOGIN,
        token: json.sessionToken
    }
}

export function fetchLogin({username, password}) {
    return (dispatch) => {
        dispatch(requestLogin({username, password}))
        return login(username, password)
            .then(response => dispatch(recieveLogin(response)))
    }
}