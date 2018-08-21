import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import {fetchLogin} from '../actions/'

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (event, username, password) => {
            event.preventDefault()
            dispatch(fetchLogin({ username, password }))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
  )(LoginForm)