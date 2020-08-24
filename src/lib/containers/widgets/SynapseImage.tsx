import * as React from 'react'
import { getEntity, getStablePresignedUrl } from '../../utils/SynapseClient'
import {
  FileEntity,
  FileHandle,
  FileHandleAssociateType,
} from '../../utils/synapseTypes/'
import { ClientError, Error } from '../Error'

type SynapseImageProps = {
  wikiId?: string
  synapseId?: string
  token?: string
  fileName?: string
  fileResults?: FileHandle[]
  params: {
    align: string
    scale: string
    // this should be treated as a boolean, but the actual type that will come through
    // is a string which I don't want to mis-represent
    responsive: string
    altText: string
  }
}

type SynapseImageState = {
  preSignedURL: string
  error: ClientError
}

class SynapseImage extends React.Component<
  SynapseImageProps,
  SynapseImageState
> {
  constructor(props: SynapseImageProps) {
    super(props)
    this.getEntity = this.getEntity.bind(this)
    this.getSynapseFiles = this.getSynapseFiles.bind(this)
    this.state = {
      preSignedURL: '',
      error: undefined,
    }
  }

  public getEntity() {
    const { token, synapseId } = this.props
    if (synapseId) {
      getEntity<FileEntity>(token, synapseId).then(
        // https://docs.synapse.org/rest/org/sagebionetworks/repo/model/FileEntity.html
        (data: FileEntity) => {
          this.getSynapseFiles(
            synapseId,
            FileHandleAssociateType.FileEntity,
            data.dataFileHandleId,
          )
        },
      )
    }
  }
  public getSynapseFiles(
    associateObjectId: string,
    associateObjectType: FileHandleAssociateType,
    fileHandleId: string,
  ) {
    getStablePresignedUrl(
      associateObjectId,
      associateObjectType,
      fileHandleId,
      this.props.token,
    )
      .then(preSignedURL => {
        this.setState({
          preSignedURL,
          error: undefined,
        })
      })
      .catch(error => {
        console.error('Error on getting image ', error)
        this.setState({
          error,
        })
      })
  }
  public componentDidMount() {
    if (!this.props.wikiId) {
      // Get file handle as external attachment
      this.getEntity()
    } else {
      // Can get presigned url right away from wiki association
      const { fileName, fileResults = [] } = this.props
      const { id } = fileResults.filter(el => el.fileName === fileName)[0]
      this.getSynapseFiles(
        this.props.wikiId,
        FileHandleAssociateType.WikiAttachment,
        id,
      )
    }
  }

  public render() {
    const { params, token } = this.props
    const { preSignedURL, error } = this.state
    const { align = '', altText = 'synapse image' } = params
    let scale = `${Number(params.scale) ?? 100}%`
    const alignLowerCase = align.toLowerCase()
    let className = ''
    if (alignLowerCase === 'left') {
      className = 'floatLeft'
    }
    if (alignLowerCase === 'right') {
      className = 'floatright'
    }
    if (alignLowerCase === 'center') {
      className = 'align-center'
    }
    let style: React.CSSProperties = {
      width: scale,
      height: scale,
    }
    if (!preSignedURL) {
      return null
    }
    if (error) {
      return <Error token={token} error={error} />
    }
    return (
      <React.Fragment>
        <img
          alt={altText}
          className={'img-fluid  ' + className}
          src={preSignedURL}
          style={style}
        />
      </React.Fragment>
    )
  }
}
export default SynapseImage
