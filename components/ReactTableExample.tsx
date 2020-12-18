import React, {useEffect, useMemo, useState} from 'react'
import {useTable, useSortBy} from "react-table"
import {
    TMPL_PYRO_REGISVINE,
    TMPL_FORSAKEN_RIFT,
    TMPL_VALLEY_OF_REMEMBRANCE,
    TMPL_ANEMO_HYPOSTASIS,
    IGenshinTableProvider
} from "../templates/tableFormatExport"
import {set_dropratePrefs, get_dropratePrefs} from "../interface/localStorage"
import {CircularNavMap, INavMap} from "../utility/algorithms"

type ITableDecorator =
    IGenshinTableProvider
    & {
    title: string, worldLevelConfig: boolean[], navigationMap: Map<number, INavMap<number>>,
    NavigationID: number,
    setNavigationID: React.Dispatch<React.SetStateAction<number>>
}

function TableGenerator({columns, data, title, navigationMap, NavigationID, setNavigationID}: ITableDecorator) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useSortBy)

    function navigateNext() {
        console.log("Click Click Boom")
        setNavigationID(navigationMap.get(NavigationID)!.next)
    }

    function navigatePrev() {
        console.log("Click Click Boomshaka")
        setNavigationID(navigationMap.get(NavigationID)!.prev)
    }

    return <>
        <span className={"inline"}>
            <button className={"crit prevbutton"} onClick={navigatePrev}/>
            <h1 className={"mid"}>{title}</h1>
            <button className={"crit nextbutton"} onClick={navigateNext}/>
        </span>
        <table {...getTableProps()} >
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}> {
                    headerGroup.headers.map((column, i) => (
                        <th {...column.getHeaderProps()} key={i}>
                            {column.render('Header')}
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
                            row.cells.map((cell, i) => {
                                return (<td {...cell.getCellProps()} key={i}>{cell.render('Cell')}</td>)
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
    updateChanged: React.Dispatch<React.SetStateAction<boolean>>
}

function FlipState(input: boolean[], loc: number, update: boolean): boolean[] {
    input[loc] = update
    return input
}

function WorldLevelController({settings, updateSettings, updateChanged}: IWorldLevelSettings) {
    return <>{
        [...Array(8).keys()].map((ele) =>
            <button onClick={() => {
                updateSettings(FlipState(settings, ele, !settings[ele]))
                updateChanged(prev => !prev);
            }}>{`${ele + 1}`}</button>
        )}
    </>
}

type ITableHandle = {
    columns: any,
    data: any[],
    title: string,
    index?: number
}
export default function TeyvatMap() {
    // Switches to represent if the user has made choice to show the world levels
    const [worldLevelSelection, setWorldLevelSelection] = useState([true, true, true, true, true, true, true, true])
    const [displayIndex, setDisplayIndex] = useState(0)
    // When website fires, loads state data from localStorage
    const [firstRun, setFirstRun] = useState(true)
    // Acts as a notifier for when the boolean array representing selected world levels changes
    const [changed, setChanged] = useState(false)
    // Represents the ID of drop-rate table
    const [tableIndex, setTableIndex] = useState(0)

    const mp: Map<number, ITableHandle> = new Map()
    mp.set(0, {
        columns: TMPL_PYRO_REGISVINE.columns,
        data: TMPL_PYRO_REGISVINE.data,
        title: "Pyro Regisvine",
        index: 1001
    })
    mp.set(1, {
        columns: TMPL_FORSAKEN_RIFT.columns,
        data: TMPL_FORSAKEN_RIFT.data,
        title: "Forsaken Rift",
        index: 1002
    })
    mp.set(2, {
        columns: TMPL_VALLEY_OF_REMEMBRANCE.columns,
        data: TMPL_VALLEY_OF_REMEMBRANCE.data,
        title: "Valley Of Remembrance",
        index: 1003
    })
    mp.set(3, {
        columns: TMPL_ANEMO_HYPOSTASIS.columns,
        data: TMPL_ANEMO_HYPOSTASIS.data,
        title: "Anemo Hypostasis",
        index: 1004
    })

    const navMap = CircularNavMap([0, 1, 2, 3]);

    // const navMap: Map<number, {prev: number, next: number}> = new Map()
    // navMap.set(0, {next: 1, prev: 2})
    // navMap.set(1, {next: 2, prev: 0})
    // navMap.set(2, {next: 0, prev: 1})

    // This ref will fetch the id specific data, whenever the displayed table ID changes
    const currentDataHandle: any = useMemo(() => {
        let testRef = mp.get(tableIndex);
        if (testRef != null) {
            return testRef
        }
        return mp.get(0)
    }, [worldLevelSelection, tableIndex])

    useEffect(() => {
        if (firstRun) {
            let prefs = get_dropratePrefs()
            setDisplayIndex(prefs.activeWindow)
            setFirstRun(false)
        }
        set_dropratePrefs({activeWindow: displayIndex, AR: worldLevelSelection})
    }, [])

    /* Data handle needs to change whenever user checks/unchecks WL (World LEvel) buttons*/
    const data_handle = useMemo(() => {
        let data: any[] = []
        let dataRef = currentDataHandle.data
        for (let i = 0; i < worldLevelSelection.length; i++) {
            if (worldLevelSelection[i] && dataRef[i] != null)
                data.push(dataRef[i])
        }
        return data
    }, [currentDataHandle, worldLevelSelection, changed])


    return <>
        <WorldLevelController settings={worldLevelSelection} updateSettings={setWorldLevelSelection}
                              updateChanged={setChanged}/>
        <TableGenerator columns={currentDataHandle.columns} data={data_handle}
                        title={currentDataHandle.title}
                        worldLevelConfig={worldLevelSelection} navigationMap={navMap} setNavigationID={setTableIndex}
                        NavigationID={tableIndex}/>
    </>
}