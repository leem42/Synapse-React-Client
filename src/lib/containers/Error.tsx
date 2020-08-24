import * as React from 'react'
import { SynapseClientError } from '../utils/SynapseClient'
import SignInButton from './SignInButton'
import { Alert } from 'react-bootstrap'

export type ClientError = undefined | string | Error | SynapseClientError

type ErrorProps = {
  token?: string
  error?: ClientError
}

function isSynapseClientError(error: ClientError): error is SynapseClientError {
  return (error as any).status !== undefined
}

function isError(error: ClientError): error is Error {
  return (error as any).message !== undefined
}

function isString(error: ClientError): error is string {
  return typeof error === 'string'
}

export const ClientError = (props: {
  error: SynapseClientError
  token?: string
}) => {
  const { error, token } = props
  const loginError = error.status === 403 && !token
  const accessDenied = error.status === 403 && token

  return (
    <>
      {loginError && (
        <>
          Please <SignInButton /> to view this resource.
        </>
      )}
      {accessDenied && <>You are not authorized to access this resource.</>}
      {
        // if we don't have a friendly error message then show the error
        !accessDenied && !loginError && <>{error.reason}</>
      }
    </>
  )
}

export const Error = (props: ErrorProps) => {
  const { error, token } = props

  if (!error) {
    return <></>
  }

  let synapseClientError: SynapseClientError | undefined = undefined
  let jsError: Error | undefined = undefined
  let stringError: string | undefined = undefined
  if (isSynapseClientError(error)) {
    synapseClientError = error
  } else if (isError(error)) {
    jsError = error
  } else if (isString(error)) {
    stringError = error
  }
  return (
    <div className="Error">
      <Alert
        dismissible={false}
        show={true}
        variant={'danger'}
        transition={false}
      >
        <p>
          {synapseClientError && (
            <ClientError error={synapseClientError} token={token} />
          )}
          {jsError && jsError.message}
          {stringError && stringError}
        </p>
      </Alert>
    </div>
  )
}
