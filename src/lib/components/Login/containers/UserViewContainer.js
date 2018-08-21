import { connect } from 'react-redux'
import UserView from '../presenters/UserView'

const mapStateToProps = (state) => ({
  token: state.token
})

export default connect(
    mapStateToProps,
    null
  )(UserView)