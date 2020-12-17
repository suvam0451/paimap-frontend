import {artifactColumnGen_01, artifactColumnGen_02, ascensionColumnGen, talentBookColumnGen} from "./tableGenerators"
import {PYRO_REGISVINE_DATA, FORSAKEN_RIFT_DATA, VALLEY_OF_REMEMBRANCE} from "../data/dummyData"
import {BaseMetaHeaders_01, BaseMetaHeaders_02} from "../data/genshinLoot";

// To be memoized
export type IReactTableInput = {
    columns: any
    data: any
}

const COLUMNS_PYRO_REGISVINE = [BaseMetaHeaders_01, {
    Header: "Artifact",
    columns: artifactColumnGen_01
}, {
    Header: "Ascension Materials",
    columns: ascensionColumnGen
}]

export const TMPL_PYRO_REGISVINE: IReactTableInput = {columns: COLUMNS_PYRO_REGISVINE, data: PYRO_REGISVINE_DATA}

// ---------------------------------------------------
const COLUMNS_FORSAKEN_RIFT = [
    BaseMetaHeaders_02, {
        Header: "Talent Books",
        columns: talentBookColumnGen
    }
]

export const TMPL_FORSAKEN_RIFT: IReactTableInput = {
    columns: COLUMNS_FORSAKEN_RIFT,
    data: FORSAKEN_RIFT_DATA
}

// --------------------------------------------------
const COLUMNS_VALLEY_OF_REMEMBRANCE = [
    BaseMetaHeaders_02, {
        Header: "Artifacts",
        columns: artifactColumnGen_02
    }
]

export const TMPL_VALLEY_OF_REMEMBRANCE: IReactTableInput = {
    columns: COLUMNS_VALLEY_OF_REMEMBRANCE,
    data: VALLEY_OF_REMEMBRANCE
}