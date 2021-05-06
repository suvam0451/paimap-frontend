import React, {ReactElement} from "react";
import Head from "next/head"
import {AppProps} from "next/app"

import "../styles/export.scss";
import "bootstrap/dist/css/bootstrap.min.css"

export default function App({ Component, pageProps }: AppProps) : ReactElement{
    return <>
        <Head><title>Example pages</title></Head>
        <Component {...pageProps} />
    </>
}