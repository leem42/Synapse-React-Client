import React from 'react'

/**
 * Class that demos obtatining a user's projects list
 */
class UserProjects extends React.Component {

    constructor () {
        super()
        this.state = {
            projects: [],
            errorMessage: ''
        }
        this.getProjects = this.getProjects.bind(this)
    }

    getProjects(projectType) {
        this.props.getUserProjectsEndpoint(this.props.token, projectType)
        .then(
            data => {
                this.setState({
                        projects: data.results
                    })
                }
        ).catch(
            err => {
                this.setState({
                    errorMessage: ''
                })
            }
        )
    }

    render () {

        let listProjects = null

        if (this.props.token === '') {
            listProjects = <p> Sign in and click the button to get projects </p>
        } else {
            listProjects = this.state.projects.map((fav) =>
                <li key={fav.id}> {fav.name} </li>
            );
        }

        return (
            <div className="container border pt-2 mt-5">
                <h3> Demo of getting user projects</h3>
                <button disabled={this.props.token === "" ? true: false} className={"btn ml-1 mr-1 " + (this.props.token === "" ? "btn-outline-secondary" :"btn-primary")}  onClick={() => this.getProjects('MY_PROJECTS')}> All </button>
                <button disabled={this.props.token === "" ? true: false} className={"btn ml-1 mr-1 " + (this.props.token === "" ? "btn-outline-secondary" :"btn-primary")}  onClick={() => this.getProjects('MY_CREATED_PROJECTS')}> Created By Me </button>
                <button disabled={this.props.token === "" ? true: false} className={"btn ml-1 mr-1 " + (this.props.token === "" ? "btn-outline-secondary" :"btn-primary")}  onClick={() => this.getProjects('MY_PARTICIPATED_PROJECTS')}> Shared directly with me </button>
                {listProjects}
            </div>
        )
    }
}

export default UserProjects;