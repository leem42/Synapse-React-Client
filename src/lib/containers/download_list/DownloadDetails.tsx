import React, { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile, faDatabase, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import calculateFriendlyFileSize from '../calculateFriendlyFileSize'
import { testDownloadSpeed } from '../../utils/DownloadSpeedTest'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import { TOOLTIP_DELAY_SHOW } from '../table/SynapseTable'

library.add(faFile)
library.add(faDatabase)
library.add(faClock)

export type DownloadDetailsProps = {
  numFiles: number
  numBytes: number
  backgroundColor: string
  token: string | undefined
}

type State = {
  isLoading: boolean
  downloadSpeed: number
}

export default function DownloadDetails(props: DownloadDetailsProps) {
  const [state, setState] = useState<State>({
    isLoading: true,
    downloadSpeed: 0,
  })
  const { isLoading, downloadSpeed } = state
  const { token, numFiles, numBytes } = props

  useEffect(() => {
    if (isLoading) {
      token &&
        testDownloadSpeed(token).then(speed => {
          setState({
            isLoading: false,
            downloadSpeed: speed,
          })
        })
    }
  })

  const timeEstimateInSeconds =
    isLoading || downloadSpeed === 0 ? 0 : numBytes / downloadSpeed
  const friendlyTime = moment
    .duration(timeEstimateInSeconds, 'seconds')
    .humanize()
  const numBytesTooltipId = 'num_bytes_id'
  const friendlyTimeTooltipId = 'friendly_time_id'

  return (
    <div className="download-details-container">
      <span>
        <FontAwesomeIcon icon="file" />
        {numFiles}
        files
      </span>
      <span
        data-for={numBytesTooltipId}
        data-tip="This is the total size of all files. Zipped package(s) will likely be smaller."
      >
        <ReactTooltip
          delayShow={TOOLTIP_DELAY_SHOW}
          place="top"
          type="dark"
          effect="solid"
          id={numBytesTooltipId}
        />
        <FontAwesomeIcon icon="database" />
        {calculateFriendlyFileSize(numBytes)}
      </span>
      <span
        data-for={friendlyTimeTooltipId}
        data-tip="This is an estimate of how long package download will take."
      >
        <ReactTooltip
          delayShow={TOOLTIP_DELAY_SHOW}
          place="top"
          type="dark"
          effect="solid"
          id={friendlyTimeTooltipId}
        />
        <FontAwesomeIcon icon="clock" />
        {isLoading && <span className="loader" />}
        {!isLoading && friendlyTime}
      </span>
    </div>
  )
}
