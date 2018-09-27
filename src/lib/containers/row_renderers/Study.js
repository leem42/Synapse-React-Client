import React from 'react'
import { Chip } from './utils/index';

const STUDY_SCHEMA = {
    projectName :0,
    id : 1,
    projectFileviewId : 2,
    projectStatus :3,
    dataStatus : 4,
    fundingAgency : 5,
    summary : 6,
    summarySource : 7,
    projectLeads : 8,
    institutions : 9,
    tumorType : 10,
    diseaseFocus: 11
}

const CUTOFF = 250

export default class Study extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showMore: false
        }
        this.toggleShowMore = this.toggleShowMore.bind(this)
    }

    toggleShowMore(event) {
        event.preventDefault()
        this.setState({
            showMore: !this.state.showMore
        })
    }

    render () {
        const {data} = this.props
        let projectName = data[STUDY_SCHEMA.projectName]
        let projectLeads = data[STUDY_SCHEMA.projectLeads] && data[STUDY_SCHEMA.projectLeads].split(";").join(" / ")
        let summary = data[STUDY_SCHEMA.summary]

        // cutoff if show more is false and if its reasonably long enough
        if (!this.state.showMore && summary.length >= CUTOFF) {
            summary = summary.substring(0,CUTOFF).split(".")
            summary = summary.slice(0, summary.length - 1) // remove text after last sentence
            summary = summary.join(".") + "."  // add back period to the end
        }

        let diseaseFocus = <Chip type="gray" text={data[STUDY_SCHEMA.diseaseFocus]}></Chip>
        let tumorType = <Chip type="blue" text={data[STUDY_SCHEMA.tumorType]}></Chip>
        
        let projectStatus = data[STUDY_SCHEMA.projectStatus]
        let fundingAgency = data[STUDY_SCHEMA.fundingAgency]
        let dataStatus = data[STUDY_SCHEMA.dataStatus]
        let institutions = data[STUDY_SCHEMA.institutions]
        return <div className="container SRC-syn-border SRC-noPaddingBottom  SRC-syn-border-spacing">
                    <div className="row">
                        <div className="col-xs-2">
                            {this.props.icon}
                        </div>
                        <div className="col-xs-10">
                            <div>
                                <p> STUDY </p>
                                <div>
                                    <h5> 
                                        <a className="SRC-magentaText" href="">
                                            {
                                                projectName
                                            }
                                        </a>
                                    </h5>
                                </div>
                            </div>
                            <div>
                                <strong> 
                                    <i>
                                        {
                                            projectLeads
                                        }
                                    </i> 
                                </strong>
                            </div>
                            <div>
                                <p>
                                    {summary}
                                    {!this.state.showMore && <a className="SRC-magentaText" onClick={this.toggleShowMore}> Show More </a>}
                                </p>
                            </div>
                            <div className="SRC-marginBottomTen">
                                {diseaseFocus} {tumorType}
                            </div>
                        </div>
                    </div>
                    {/* FOOTER */}
                    {this.state.showMore && <div className="row SRC-grayBackground">
                        <div className="col-xs-2">
                        </div>
                        <div className="col-xs-10">
                            <div className="row">
                                <div className="col-xs-4">
                                    <table className="SRC-paddingRight">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    STATUS
                                                </td>
                                                <td>
                                                    {projectStatus}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    FUNDER
                                                </td>
                                                <td>
                                                    {fundingAgency}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    DATA    
                                                </td>
                                                <td>
                                                    {dataStatus}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    PUBLICATIONS    
                                                </td>
                                                <td>
                                                    NONE
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-xs-4">
                                    <table className="SRC-paddingRight">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    INVESTIGATORS
                                                </td>
                                                <td>
                                                    {projectLeads}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-xs-4">
                                    <table className="SRC-paddingRight">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    INSTUTIONS    
                                                </td>
                                                <td>
                                                    {institutions}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
            </div>
    }
}