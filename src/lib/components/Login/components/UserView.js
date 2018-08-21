import React from 'react'
import LoginFormContainer from '../containers/LoginFormContainer'

let UserView = ({token}) => {

    if (!token) {
        return (
            <div className="container syn-example">
                <h3 className="text-left"> Demo login with session token printed to screen</h3>
                <p> You are currently <strong> <i> not </i> </strong> signed in to Synpase </p>
                <LoginFormContainer></LoginFormContainer>
            </div>
        )
    } else {
        return (
            <div className="container syn-example">
                <h3 className="text-left"> Demo login with session token printed to screen</h3>
                <p> You are currently <strong> <i> signed in </i> </strong> to Synapse </p>
                <p> Your session token is {token} </p>
                
                <div className="bg-success" role="alert">
                    Synapse login successful
                </div>
                <LoginFormContainer></LoginFormContainer>
            </div>
        )
    }
}

export default UserView