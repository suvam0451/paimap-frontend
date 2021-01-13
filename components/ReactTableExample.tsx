import React, {useEffect, useMemo, useState} from 'react'
import {useTable, useSortBy} from "react-table"
import {
    TMPL_PYRO_REGISVINE,
    TMPL_CRYO_REGISVINE,
    // TMPL_FORSAKEN_RIFT,
    // TMPL_VALLEY_OF_REMEMBRANCE,
    TMPL_ANEMO_HYPOSTASIS,
    TMPL_OCEANID,
    TMPL_ELECTRO_REGISVINE,
    TMPL_GEO_REGISVINE,
    IGenshinTableProvider
} from "../templates/tableFormatExport"
import * as localStorage from "../interface/localStorage"
import {CircularNavMap, INavMap} from "../utility/algorithms"

type ITableDecorator = IGenshinTableProvider & {
    modifiedData: any,
    worldLevelConfig: boolean[], navigationMap: Map<number, INavMap<number>>,
    NavigationID: number,
    setNavigationID: React.Dispatch<React.SetStateAction<number>>
    data: any
}

function TableGenerator({
                            columns,
                            data,
                            fragment,
                            navigationMap,
                            NavigationID,
                            setNavigationID
                        }: ITableDecorator) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data}, useSortBy)

    function navigateNext() {
        console.log("Next ID: ", navigationMap.get(NavigationID)!.next)
        setNavigationID(navigationMap.get(NavigationID)!.next)
    }

    function navigatePrev() {
        console.log("Next ID: ", navigationMap.get(NavigationID)!.prev)
        setNavigationID(navigationMap.get(NavigationID)!.prev)
    }

    return <>
        <div className={"droprate_container"}>
            <div className={"header"}>
                        <span className={"inline"}>
            <button className={"crit prevbutton"} onClick={navigatePrev}/>
            <div className={"mid"}>
                <div className={`ico small ${fragment.icon}`}/>
                <h1 className={"mid"}>{fragment.name}</h1>
            </div>
            <button className={"crit nextbutton"} onClick={navigateNext}/>
        </span>
            </div>
            <div className={"content"}>
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
            </div>
        </div>
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

export default function DroprateTableView() {
    // Switches to represent if the user has made choice to show the world levels
    const [worldLevelSelection, setWorldLevelSelection] = useState(Array(8).fill(true))
    const [displayIndex, setDisplayIndex] = useState(1001)
    // When website fires, loads state data from localStorage
    const [firstRun, setFirstRun] = useState(true)
    // Acts as a notifier for when the boolean array representing selected world levels changes
    const [changed, setChanged] = useState(false)
    // Represents the ID of drop-rate table
    const [tableIndex, setTableIndex] = useState(1001)

    useEffect(() => {
        if (firstRun) {
            let prefs = localStorage.get_dropratePrefs()
            setDisplayIndex(prefs.activeWindowIndex)
            setFirstRun(false)
        }
        localStorage.set_dropratePrefs({activeWindowIndex: displayIndex, ARSelection: worldLevelSelection})
    }, [])


    const mp: Map<number, IGenshinTableProvider> = new Map()
    mp.set(1001, TMPL_PYRO_REGISVINE)
    mp.set(1002, TMPL_CRYO_REGISVINE)
    mp.set(1003, TMPL_OCEANID)
    mp.set(1004, TMPL_ANEMO_HYPOSTASIS)
    mp.set(1005, TMPL_ELECTRO_REGISVINE)
    mp.set(1006, TMPL_GEO_REGISVINE)

    // Make sure that all keys are satisfied in the map above
    const navMap = CircularNavMap([1001, 1002, 1003, 1004, 1005, 1006]);

    // This ref will fetch the id specific data, whenever the displayed table ID changes
    const currentDataHandle: IGenshinTableProvider | undefined = useMemo(() =>
            mp.has(tableIndex) ? mp.get(tableIndex) : mp.get(1001)
        , [worldLevelSelection, tableIndex])


    /* Data handle needs to change whenever user checks/unchecks WL (World Level) controls */
    const data_handle = useMemo(() => {
        let data: any[] = []
        let dataRef = currentDataHandle?.data
        for (let i = 0; i < worldLevelSelection.length; i++) {
            if (worldLevelSelection[i] && dataRef[i] != null)
                data.push(dataRef[i])
        }
        return data
    }, [currentDataHandle, worldLevelSelection, changed])


    return <>
        <WorldLevelController settings={worldLevelSelection} updateSettings={setWorldLevelSelection}
                              updateChanged={setChanged}/>
        <TableGenerator columns={currentDataHandle?.columns} data={data_handle}
                        fragment={currentDataHandle!.fragment}
                        modifiedData={data_handle}
                        worldLevelConfig={worldLevelSelection} navigationMap={navMap} setNavigationID={setTableIndex}
                        NavigationID={tableIndex}/>
    </>
}