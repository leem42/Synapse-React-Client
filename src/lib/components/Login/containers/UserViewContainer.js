import { connect } from 'react-redux'
import UserView from '../components/UserView'

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps,
    null
  )(UserView)