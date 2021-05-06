import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

type INextInternalLinkProps = {
  href: string
  text: string
  wrap?: 'none' | 'list' | 'div'
}

function NextInternalLink({ href, text, wrap }: INextInternalLinkProps) {
  const baseComp = (
    <Link href={href}>
      <a>{text}</a>
    </Link>
  )
  const wrapper = React.Fragment
  if (wrap) {
    switch (wrap) {
      case 'list':
        return <li>{baseComp}</li>
      default:
        return <React.Fragment>{baseComp}</React.Fragment>
    }
  } else {
    return <React.Fragment>{baseComp}</React.Fragment>
  }
}

export default function Page() {
  return (
    <Layout title="Documentation for Sleeping Forest (VSCode Extension for Unreal engine 4)">
      <ol>
        <NextInternalLink
          href={'/docs/feature-list'}
          text={'01. Feature List'}
          wrap="list"
        />
                <NextInternalLink
          href={'/docs/getting-started'}
          text={'02. Getting Started'}
          wrap="list"
        />
                        <NextInternalLink
          href={'/docs/intro-to-code-snippets'}
          text={'03. How to Use Code Snippets'}
          wrap="list"
        />
      </ol>
    </Layout>
  )
}
