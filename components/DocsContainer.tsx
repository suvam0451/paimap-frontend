import React from 'react'
import { Button } from "react-bootstrap"

export default function DocsContainer({ children }, props) {
    return (
        <div className={"flex flex-row"}>
            <div className={"posts-left-sidebar"}>
                <div className={"bg-green-200"}>
                    <h4 className={"text-center my-4"}>Documentation</h4>
                </div>
                <div className={"bg-gray-800"}>

                </div>
            </div>
            <div className={"posts-main-container mx-2 my-4"}>
                {children}
            </div>
        </div>
    )
}
