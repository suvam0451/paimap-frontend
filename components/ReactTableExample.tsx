import React, {useEffect, useMemo, useState} from 'react'
import {useTable, useSortBy} from "react-table"
import {
    TMPL_PYRO_REGISVINE,
    TMPL_FORSAKEN_RIFT,
    TMPL_VALLEY_OF_REMEMBRANCE,
    IReactTableInput
} from "../templates/tableFormatExport"
import {set_dropratePrefs, get_dropratePrefs} from "../interface/localStorage"
import {BaseMetaHeaders_01} from "../data/genshinLoot";
import {artifactColumnGen_01, ascensionColumnGen} from "../templates/tableGenerators";

// type ITableDecorator = { src: IReactTableInput, title: string, worldLevelConfig: boolean[] }

function TableGenerator() {
    const columnInfo: any = [BaseMetaHeaders_01,
        {
            Header: "Artifact",
            columns:
            artifactColumnGen_01
        },
        {
            Header: "Ascension Materials",
            columns:
            ascensionColumnGen
        }
    ]
    const dataCopy = useMemo(() => TMPL_PYRO_REGISVINE.data, [])
    const columnCopy = useMemo(() => columnInfo, [])

    // const myData = useMemo(() => data, [])
    // const COLUMNS = useMemo(() => columns, [])
    // const [dataCopy, setDataCopy] = useState(data)
    // const dataCopy: any = useMemo(() => src.data, [])
    // useEffect(() => {
    //     let tmp: any[] = []
    //     for (let i = 0; i < worldLevelConfig.length; i++) {
    //         if (worldLevelConfig[i]) tmp.push(src.data[i])
    //     }
    // }, [worldLevelConfig])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columnCopy, dataCopy}, useSortBy)
    return <>
        {/*<h1>{title}</h1>*/}
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

type IWorldLevelSettings = {
    settings: boolean[]
    updateSettings: React.Dispatch<React.SetStateAction<boolean[]>>
}

function FlipState(input: boolean[], loc: number, update: boolean): boolean[] {
    input[loc] = update
    return input
}

function WorldLevelController({settings, updateSettings}: IWorldLevelSettings) {
    return <>{
        [...Array(8).keys()].map((ele) =>
            <button onClick={() => {
                updateSettings(FlipState(settings, ele, !settings[ele]))
                console.log(settings)
            }}>{`${ele + 1}`}</button>
        )}
    </>
}

export default function TeyvatMap() {
    const [worldLevelSelection, setWorldLevelSelection] = useState([true, true, true, true, true, true, true, true])
    const [displayIndex, setDisplayIndex] = useState(0)
    const [firstRun, setFirstRun] = useState(true)

    useEffect(() => {
        if (firstRun) {
            let prefs = get_dropratePrefs()
            setDisplayIndex(prefs.activeWindow)
            setFirstRun(false)
        }
        set_dropratePrefs({activeWindow: displayIndex, AR: worldLevelSelection})
    }, [])

    // Pyro regisvine
    const data_PyroRegisvine = useMemo(() => TMPL_PYRO_REGISVINE.data, [])
    const columns_PyroRegisvine = useMemo(() => TMPL_PYRO_REGISVINE.columns, [])

    const data_ForsakenRift = useMemo(() => TMPL_FORSAKEN_RIFT.data, [])
    const columns_ForsakenRift = useMemo(() => TMPL_FORSAKEN_RIFT.columns, [])

    const data_ValleyOfRemembrance = useMemo(() => TMPL_VALLEY_OF_REMEMBRANCE.data, [])
    const columns_ValleyOfRemembrance = useMemo(() => TMPL_VALLEY_OF_REMEMBRANCE.columns, [])

    const ViewMap = [{
        columns: columns_PyroRegisvine,
        data: data_PyroRegisvine,
        title: "Pyro Regisvine"
    }, {
        columns: columns_ForsakenRift,
        data: data_ForsakenRift,
        title: "Forsaken Rift"
    }, {
        columns: columns_ValleyOfRemembrance,
        data: data_ValleyOfRemembrance,
        title: "Valley Of Remembrance"
    }]

    const _ = ViewMap[displayIndex]
    return <>
        <WorldLevelController settings={worldLevelSelection} updateSettings={setWorldLevelSelection}/>
        {/*<TableGenerator columns={dataSource.columns} data={dataSource.data} title={dataSource.title}*/}
        {/*                worldLevelConfig={worldLevelSelection}/>*/}
        <TableGenerator/>
    </>
}