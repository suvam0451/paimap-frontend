import React, {ReactElement} from "react";
import Head from "next/head"
import {AppProps} from "next/app"

import "../styles/containers.scss";

export default function App({ Component, pageProps }: AppProps) : ReactElement{
    return (<>
        <Head><title>Example pages</title></Head>
        <Component {...pageProps} />
    </>)
}