import { connect } from 'react-redux'
import LoginForm from '../presenters/LoginForm'
import {fetchLogin} from '../actions/'

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (event, username, password) => {
            console.log('called inside container')
            event.preventDefault()
            dispatch(fetchLogin({ username, password }))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
  )(LoginForm)