import React from 'react'
import {useTable, useSortBy} from "react-table"
import {artifactMeta_01, ascensionMatMeta, artifactCode, ascensionMatCode, artifactMeta_02} from "../data/genshinLoot"
import {PYRO_REGISVINE_DATA, DOMAIN_OF_GUYUN_DATA} from "../data/dummyData"

export default function TeyvatMap() {
    const data = React.useMemo(
        () => PYRO_REGISVINE_DATA, []
    )

    // Generator for sub-columns under artifacts tab
    const artifactColumnGen = artifactMeta_01.map((ele, idx) => ({
        Header: () => <div className={"ico artifact " + ele}/>,
        accessor: artifactCode + (idx + 1).toString(),
        Cell: (ele) => <div className={"artifact " + ele}>{ele.value}</div>
    }))

    // Generator for sub-columns under ascension materials tab
    const ascensionColumnGen = ascensionMatMeta.map((ele, idx) => ({
        Header: () => <div className={"ico ascension " + ele}/>,
        accessor: ascensionMatCode + (idx + 1).toString(),
        Cell: (ele) => <div className={"ascension " + ele}>{ele.value}</div>
    }))

    const columns: any = React.useMemo(
        () => [
            CommonMetaHeaders, ,
            {
                Header: "Artifact",
                columns: artifactColumnGen,
                filterable: false
            },
            {
                Header: "Ascension Materials",
                columns: ascensionColumnGen
            }
        ],
        []
    )
    const tableInstance = useTable({columns, data}, useSortBy)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance
    return <>
        <table {...getTableProps()} >
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}> {
                    headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                            {/*<span>*/}
                            {/*    {column.isSortedDesc ? ' 🔽' : ' 🔼'}*/}
                            {/*</span>*/}
                        </th>
                    ))
                }
                </tr>
            ))}
            </thead>
            {/* Table body */}
            <tbody {...getTableBodyProps()}> {
                rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps}> {
                            row.cells.map(cell => {
                                return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                            })
                        }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
}