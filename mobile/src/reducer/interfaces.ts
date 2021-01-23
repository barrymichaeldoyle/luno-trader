import store from './store'

const state = store.getState()
export type AppState = typeof state
export type GetState = () => AppState
