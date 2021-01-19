import React from 'react'
import Link from 'next/link'

type ILinkProps = {
    to: string
    text: string
}

const LinkElement = ({to, text}: ILinkProps) =>
    <Link href={to}>
        <a>{text}</a>
    </Link>

export default function NavBar() {
    return (<header>
        <nav>
            <LinkElement to={"/"} text={"Home"}/>
            {' | '}
            <LinkElement to={"/about"} text={"About"}/>
            {' | '}
            <LinkElement to={"/users"} text={"Users List"}/>
            {' | '}
            <LinkElement to={"/droprates"} text={"Drop Rates"}/>
            {' | '}
            <LinkElement to={"/contributors"} text={"Contributors"}/>
            {' | '}
            <LinkElement to={"/memes"} text={"Memes (OC)"}/>
            {' | '}
            <LinkElement to={"/api/users"} text={"Users API"}/>
        </nav>
    </header>)
}