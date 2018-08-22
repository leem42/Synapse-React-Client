import {
    REQUEST_WIKI_MARKDOWN,
    REQUEST_WIKI_ATTCHMENTS,
    REQUEST_ENTITY,
    REQUEST_QUERY,
    REQUEST_FILES
} from '../actions'

import * as SynapseClient from 'lib/utils/SynapseClient'

function requestResource(type) {
    return {type}
}

function recievedResource(type, data) {
    return {
        type,
        data
    }
}

function fetchResource (resource) {
    return (dispatch) => {
        switch (resource.type) {
            case true:
                dispatch(requestResource(resource.type))
            case REQUEST_WIKI_MARKDOWN:
                return SynapseClient
                        .getEntityWiki(resource.token, resource.ownerId, resource.wikiId)
                        .then(data => {
                            dispatch(recievedResource(resource.type, data))
                        })
            case REQUEST_WIKI_ATTCHMENTS:
                return SynapseClient.
                        getWikiAttachmentsFromEntity(resource.token, resource.ownerId, resource.wikiId)
                        .then(data => {
                            dispatch(recievedResource(resource.type, data))
                        })
            case REQUEST_ENTITY:
                return SynapseClient
                        .getEntity(resource.token, resource.synapseId)
                        .then(data => {
                            dispatch(recievedResource(resource.type, data))
                        })
            case REQUEST_QUERY_INIT:
                return SynapseClient
                        .getQueryTableResults(resource.queryRequest, query.token)
                        .then(data => {
                            let queryCount = data.queryResult.queryResults.rows.length
                            dispatch(recievedResource(resource.type, data                  ))
                            dispatch({type: REQUEST_QUERY_FOLLOWUP, queryCount})
                        })
            case REQUEST_QUERY_FOLLOWUP:
                return SynapseClient
                        .getQueryTableResults(resource.queryRequest, query.token)
                        .then(data => {
                            dispatch(recievedResource(resource.type, data))
                            dispatch({type: REQUEST_QUERY_FOLLOWUP, queryCount})
                        })
            case REQUEST_FILES:
                return SynapseClient
                        .getFiles(resource.payload, resource.token)
                        .then(data => {
                            dispatch(recievedResource(resource.type, data))
                        })
            default:
                break
        }
    }
}

export default fetchResource