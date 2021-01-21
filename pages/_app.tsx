import React, {ReactElement} from "react";
import Head from "next/head"
import {AppProps} from "next/app"

// library CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faBook, faBookReader, faCoffee, faHome, faUserCog} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
    faGithub,
    faBook, faBookReader, faCoffee, faHome, faUserCog
)

// Custom CSS
import "../styles/export.scss";

export default function App({Component, pageProps}: AppProps): ReactElement {
    return <>
        <Head><title>Example pages</title></Head>
        <Component {...pageProps} />
    </>
}