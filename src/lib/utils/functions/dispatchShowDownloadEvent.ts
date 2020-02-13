export const SHOW_DOWNLOAD_EVENT = 'SHOW_DOWNLOAD_EVENT'

export const dispatchShowDownloadEvent = () => {
  const showDownloadEvent = new CustomEvent(SHOW_DOWNLOAD_EVENT)
  document.dispatchEvent(showDownloadEvent)
}
