import React from 'react'

const LoginForm = ({handleLogin}) => {
    let username
    let password
    return (
        <div className="container">
            <form onSubmit={(event) => handleLogin(event, username.value, password.value) }>
                <div className="form-group">
                    <label className="text-left" htmlFor="exampleEmailRedux">
                        Synapse Email/Username:
                    </label>
                    <input autoComplete="email" placeholder="Enter email" className="form-control" id="exampleEmailRedux" name="username" type="text"
                    ref = {node => username = node }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="examplePasswordRedux">
                        Password:
                    </label>
                    <input autoComplete="password" placeholder="Enter password" className="form-control" id="examplePasswordRedux"
                    ref = {node => password = node}
                    name="password" type="password" value={password}/>
                </div>
                <button onSubmit={(event) => handleLogin(event, username.value, password.value)} type="submit" className="btn btn-primary m-1">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm