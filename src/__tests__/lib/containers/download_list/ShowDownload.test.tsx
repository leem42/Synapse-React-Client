import * as React from 'react'
import {
  DOWNLOAD_LIST_CHANGE_EVENT,
  dispatchDownloadListChangeEvent,
} from 'lib/utils/functions/dispatchDownloadListChangeEvent'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import ShowDownload, {
  ShowDownloadProps,
} from 'lib/containers/download_list/ShowDownload'
import {
  DownloadList,
  FileHandleAssociation,
  FileHandleAssociateType,
} from 'lib/utils/synapseTypes'
import { MemoryRouter } from 'react-router-dom'

describe('Show download works as expected', () => {
  const SynapseClient = require('../../../../lib/utils/SynapseClient')
  const mockFileHandleAssociation = {
    fileHandleId: '',
    associateObjectId: '',
    associateObjectType: FileHandleAssociateType.FileEntity,
  }
  const mockFilesToDownload: FileHandleAssociation[] = [
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
    mockFileHandleAssociation,
  ]
  const mockDownloadList: DownloadList = {
    ownerId: '',
    updatedOn: '',
    etag: '',
    filesToDownload: mockFilesToDownload,
  }
  const mockToken = 'mock value'
  SynapseClient.getDownloadList = jest.fn().mockResolvedValue(mockDownloadList)
  let container: HTMLElement

  async function init(props: ShowDownloadProps) {
    await act(async () => {
      container = await render(
        <MemoryRouter>
          <ShowDownload {...props} />
        </MemoryRouter>,
      ).container
    })
  }

  it('hides if no token is present', async () => {
    const props = {
      to: 'https://synapse.org',
    }
    await init(props)
    expect(container.innerHTML).toEqual('')
  })

  it('renders an anchor if given a link', async () => {
    const props = {
      to: 'https://synapse.org',
      token: mockToken,
    }
    await init(props)
    expect(container.innerHTML).not.toEqual('')
    expect(container.querySelectorAll('a')).toBeDefined()
    expect(container.querySelector('.download-size')?.textContent).toEqual(
      String(mockFilesToDownload.length),
    )
  })

  it('renders a button if not given a link', async () => {
    await init({ token: mockToken })
    expect(container.querySelector('button')).toBeDefined()
    expect(container.querySelector('.download-size')?.textContent).toEqual(
      String(mockFilesToDownload.length),
    )
  })

  it(`updates correctly when ${DOWNLOAD_LIST_CHANGE_EVENT} is triggered`, async () => {
    await init({ token: mockToken })
    const mockDownloadListUpdate: DownloadList = {
      ownerId: '',
      updatedOn: '',
      etag: '',
      filesToDownload: [mockFileHandleAssociation],
    }
    await act(async () => {
      await dispatchDownloadListChangeEvent(mockDownloadListUpdate)
    })
    expect(container.querySelector('.download-size')?.textContent).toEqual(
      String(mockDownloadListUpdate.filesToDownload.length),
    )
  })
})
