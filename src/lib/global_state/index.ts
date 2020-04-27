/*
  
  The Synapse-React-Client is a library and doesn't have a single root that all components live under,
  meaning that having shared state among components is more difficult to have.

  There is an option to try and use React Context, but that forwards down a single primitive value.

  Using Redux would be the idea situation, but that too relies on having a shared Root component, which
  the library does not have.

  react-hooks-global-state solves this issue by extracting out the root Provider/Context into a json object
  that can live inside SRC (AND) is useable by libraries that import this. This gives true access to global
  state.

*/

import { createGlobalState } from 'react-hooks-global-state'
import { UserProfile, EntityHeader } from 'lib/utils/synapseTypes'

type State = {
  userProfile: UserProfile[]
  entityHeader: EntityHeader[]
}
const initialState: State = {
  userProfile: [],
  entityHeader: [],
}
const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(
  initialState,
)

export { useGlobalState, getGlobalState, setGlobalState }
