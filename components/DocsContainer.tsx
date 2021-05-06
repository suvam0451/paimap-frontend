import React from 'react'
import { Button } from "react-bootstrap"
import Link from "next/link"

export default function DocsContainer({ children }, props) {
    return (
        <div className={"flex flex-row"}>
            {/* <div className={"posts-left-sidebar"}>
                <div className={"bg-green-200"}>
                    <h4 className={"text-center my-4"}>Documentation</h4>
                </div>
                <div className={"bg-gray-100 "}>
                    <SidebarCategoryComponent label="Installation" >
                        <Link href="/docs/feature-list">Feature List</Link>
                    </SidebarCategoryComponent>
                    <SidebarCategoryComponent label="Snippet Lists" />
                    <SidebarCategoryComponent label="Context Key" />
                    <SidebarCategoryComponent label="Modules" />
                    <SidebarCategoryComponent label="Asset Streams" />
                    <SidebarCategoryComponent label="Modding Guide" />
                    <SidebarCategoryComponent label="References" />
                </div>
            </div> */}
            <div className={"posts-main-container mx-2 my-4"}>
                {children}
            </div>
        </div>
    )
}

type SidebarCategoryComponentProps = {
    label: string
    children?: JSX.Element | JSX.Element[]
    isCollapsed?: boolean
}

export function SidebarCategoryComponent({ label, children, isCollapsed = true }: SidebarCategoryComponentProps) {
    const [Collapsed, setCollapsed] = React.useState(isCollapsed);
    return (
        <div className="flex flex-col">
            <div className="flex flex-row px-2 hover:bg-gray-200" onClick={() => {
                setCollapsed(!Collapsed);
            }}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pt-0"
                >
                    <path d="M960 256q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm832 928v352q0 22-20 30-8 2-12 2-12 0-23-9l-93-93q-119 143-318.5 226.5t-429.5 83.5-429.5-83.5-318.5-226.5l-93 93q-9 9-23 9-4 0-12-2-20-8-20-30v-352q0-14 9-23t23-9h352q22 0 30 20 8 19-7 35l-100 100q67 91 189.5 153.5t271.5 82.5v-647h-192q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h192v-163q-58-34-93-92.5t-35-128.5q0-106 75-181t181-75 181 75 75 181q0 70-35 128.5t-93 92.5v163h192q26 0 45 19t19 45v128q0 26-19 45t-45 19h-192v647q149-20 271.5-82.5t189.5-153.5l-100-100q-15-16-7-35 8-20 30-20h352q14 0 23 9t9 23z" />
                </svg>
                <div className="border-l-4 border-teal-500 -ml-3 absolute" />
                <h5 className="mx-2 hover:from-gray-700 hover:to-gray-200">{label}</h5>
            </div>
            <div className={Collapsed ? "hidden" : ""}>{children}</div>
        </div>
    )
}
