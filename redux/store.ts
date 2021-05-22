import { useMemo } from "react"
import { createStore, applyMiddleware } from "redux"

let store

type IState = {
    lastUpdate: number
    light: boolean
    count: number
}
const initialState: IState = {
    lastUpdate: 0,
    light: false,
    count: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

    }
}

function initStore(preloadState = initialState) {
    return createStore(
        reducer,
        preloadState,
        // enhancers
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export const useStore = (initialState) => {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}