import {React} from 'react'


class Root extends React.Component {

    render () {
        return (
            <Provider store={store}>
                <div></div>
            </Provider>
        )
    }

}


export default Root