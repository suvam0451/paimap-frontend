import React, { ReactNode } from 'react'
import Head from 'next/head'
import NavBar from "./NavBar"
import Sidebar from "../components/Sidebar"

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <div className={"root-container"}>
        <Sidebar />
        <div className={"main-container"}>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavBar />
            
            <div className={"page-content"}>
            {children}
            </div>
            <footer>
                <hr />
                <span>I'm here to stay (Footer)</span>
            </footer>
        </div>
    </div>
)

export default Layout
