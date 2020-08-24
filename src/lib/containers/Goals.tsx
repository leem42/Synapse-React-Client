import React, { useEffect, useState } from 'react'
import {
  QueryResultBundle,
  QueryBundleRequest,
  FileHandleAssociateType,
} from '../utils/synapseTypes'
import { SynapseClient, SynapseConstants } from '../utils'
import { SynapseClientError } from '../utils/SynapseClient'
import { Error } from '../containers/Error'
import QueryCount from './QueryCount'

export type GoalsProps = {
  entityId: string
  token?: string
}

enum ExpectedColumns {
  TABLEID = 'TableId',
  TITLE = 'Title',
  SUMMARY = 'Summary',
  LINK = 'Link',
  ASSET = 'Asset',
}

export const getFieldIndex = (
  name: string,
  result: QueryResultBundle | undefined,
) => {
  return (
    result?.selectColumns?.findIndex(el => {
      return el.name === name
    }) ?? -1
  )
}

export default function (props: GoalsProps) {
  const { entityId, token } = props
  const [queryResult, setQueryResult] = useState<
    QueryResultBundle | undefined
  >()
  const [error, setError] = useState<string | SynapseClientError | undefined>()

  useEffect(() => {
    const getData = async () => {
      const request: QueryBundleRequest = {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        entityId,
        partMask:
          SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
          SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql: `select TableId, Title, Summary, Link, Asset from ${entityId} order by ItemOrder`,
        },
      }
      try {
        const data = await SynapseClient.getQueryTableResults(request, token)
        setQueryResult(data)
        setError(undefined)
      } catch (e) {
        console.error('Error on get data', e)
        setError(e)
      }
    }
    getData()
  }, [entityId, token])

  const tableIdColumnIndex = getFieldIndex(ExpectedColumns.TABLEID, queryResult)
  const titleColumnIndex = getFieldIndex(ExpectedColumns.TITLE, queryResult)
  const summaryColumnIndex = getFieldIndex(ExpectedColumns.SUMMARY, queryResult)
  const linkColumnIndex = getFieldIndex(ExpectedColumns.LINK, queryResult)
  const assetColumnIndex = getFieldIndex(ExpectedColumns.ASSET, queryResult)

  return (
    <div className="Goals">
      {error && <Error error={error} token={token} />}
      {queryResult?.queryResult.queryResults.rows.map((el, index) => {
        const values = el.values
        const tableId = values[tableIdColumnIndex]
        const title = values[titleColumnIndex]
        const summary = values[summaryColumnIndex]
        const link = values[linkColumnIndex]
        // assume that we recieve assets in order of rows and there is an asset for each item
        // can revisit if this isn't the case.
        const asset = values[assetColumnIndex]
        const url = asset
          ? `https://www.synapse.org/Portal/filehandleassociation?associatedObjectId=${entityId}&associatedObjectType=${FileHandleAssociateType.TableEntity}&fileHandleId=${asset}`
          : ''
        return (
          <div className="Goals__Card">
            <div
              className="Goals__Card__header"
              style={{ background: `url('${url}')` }}
            >
              <p>
                <span className="Goals__Card__header__title"> {title} </span>
                <span className="Goals__Card__header__count">
                  <QueryCount
                    parens={false}
                    sql={`SELECT * FROM ${tableId}`}
                    token={token}
                    name=""
                  />
                </span>
              </p>
            </div>
            <div className="Goals__Card__summary">
              <p> {summary} </p>
              <p>
                <a className="Goals__Card__summary__link" href={link}>
                  EXPLORE
                </a>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
