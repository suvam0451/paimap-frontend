import React, { ReactElement } from "react";
import Head from "next/head"
import { AppProps } from "next/app"
import { useStore } from "../redux/store"
import { Provider } from 'react-redux'

import "../styles/export.scss";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App({ Component, pageProps }: AppProps): ReactElement {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Head><title>Example pages</title></Head >
            <Component {...pageProps} />
        </Provider>
    )
}