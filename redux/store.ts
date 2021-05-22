import { useMemo } from "react"
import { createStore, applyMiddleware } from "redux"
import produce, { Draft } from "immer"
import { useImmerReducer } from "use-immer"
import { composeWithDevTools } from 'redux-devtools-extension'

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

type IReduxAction = {
    type: string
    payload?: any
    lastUpdate: number
    light: boolean
    count: number
}

const reducer = (state: IState = initialState, action: IReduxAction): IState =>
    produce(state, (draft: Draft<IState>) => {
        const { light, lastUpdate } = action
        switch (action.type) {
            case 'TICK':
                draft.lastUpdate = lastUpdate
                draft.light = !!action.light
                return
            case 'INCREMENT':
                return {
                    ...state,
                    count: state.count + 1,
                }
            case 'DECREMENT':
                return {
                    ...state,
                    count: state.count - 1,
                }
            case 'RESET':
                return {
                    ...state,
                    count: initialState.count,
                }
            default:
                return state
        }
    }
    )

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