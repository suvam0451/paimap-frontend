import { useMemo } from "react"
import { createStore, applyMiddleware } from "redux"
import produce, { Draft } from "immer"
import { useImmerReducer } from "use-immer"
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from "./reducer"

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

enum IFrontendAction {
    ADD_ITEM,
    REMOVE_ITEM,
    SORT_ITEMS
}

type IReduxAction = {
    type: IFrontendAction
    payload?: any
    lastUpdate: number
    light: boolean
    count: number
}

const frontendReducer = produce((draft: IState, action: IReduxAction) => {
    const { type, payload, light, lastUpdate } = action
    switch (type) {
        case IFrontendAction.ADD_ITEM:
            draft.lastUpdate = lastUpdate
            draft.light = !!light
            break
        case 'INCREMENT':
            draft.count += 1
            break;
        case 'DECREMENT':
            draft.count -= 1
            break
        case 'RESET':
            draft.count = 0
            break
        default:
            break
    }
}, initialState)

const [data, dataDispatch] = useImmerReducer(reducer, initialState);

function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
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

export const useStore = (initState) => useMemo(() => initializeStore(initState), [initState])