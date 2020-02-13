import * as React from 'react'
import DownloadListTable from 'lib/containers/download_list/DownloadListTable'
import ShowDownload from 'lib/containers/download_list/ShowDownload'

type Props = {
  token: string | undefined
}
export const DownloadListTableDemo = ({ token }: Props) => {
  return (
    <div className="container download-list-demo">
      <div>
        <ShowDownload to="https://synapse.org" token={token} />
      </div>
      <div className="col-xs-10">
        <DownloadListTable token={token} />
      </div>
    </div>
  )
}
