import {artifactColumnGen_01, artifactColumnGen_02, ascensionColumnGen, talentBookColumnGen} from "./tableGenerators"
import {
    PYRO_REGISVINE_DATA,
    FORSAKEN_RIFT_DATA,
    VALLEY_OF_REMEMBRANCE,
    ANEMO_HYPOSTASIS,
    CRYO_REGISVINE
} from "../data/dummyData"
import {BaseMetaHeaders_01, BaseMetaHeaders_02} from "../data/genshinLoot";

// To be memoized
export type IGenshinTableProvider = {
    columns: any
    data: any,
    name: string,
    id: number
}

function WorldBossColumnTemplate(artifact_tmpl: any, ascension_tmpl: any) {
    return [BaseMetaHeaders_01, {
        Header: "Artifact",
        columns: artifact_tmpl
    }, {
        Header: "Ascension Materials",
        columns: ascension_tmpl
    }]
}

function TalentDungeonColumnTemplate() {
    return [BaseMetaHeaders_02, {
        Header: "Talent Books",
        columns: talentBookColumnGen
    }]
}

function ArtifactDungeonColumnTemplate() {
    return [BaseMetaHeaders_02, {
        Header: "Artifacts",
        columns: artifactColumnGen_02
    }]
}

const WORLD_BOSS_DROP_TABLE_SCHEMA = [...WorldBossColumnTemplate(artifactColumnGen_01, ascensionColumnGen)]

function GenerateBundle(columns: any, data: any, name: string, id: number): IGenshinTableProvider {
    return {columns: columns, data: data, name: name, id: id}
}

// ---------------------------------------------------
// const COLUMNS_PYRO_REGISVINE = [...WorldBossColumnTemplate(artifactColumnGen_01, ascensionColumnGen)]
export const TMPL_PYRO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, PYRO_REGISVINE_DATA,
    "Pyro Regisvine", 1001)

export const TMPL_CRYO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, CRYO_REGISVINE,
    "Cryo Regisvine", 1002)

// --------------------------------------------------
const COLUMNS_ANEMO_HYPOSTASIS = [...WorldBossColumnTemplate(artifactColumnGen_01, ascensionColumnGen)]
export const TMPL_ANEMO_HYPOSTASIS = GenerateBundle(COLUMNS_ANEMO_HYPOSTASIS, ANEMO_HYPOSTASIS,
    "Anemo Hypostasis", 1004)

// ---------------------------------------------------
const COLUMNS_FORSAKEN_RIFT = [...TalentDungeonColumnTemplate()]
export const TMPL_FORSAKEN_RIFT = GenerateBundle(COLUMNS_FORSAKEN_RIFT, FORSAKEN_RIFT_DATA,
    "Forsaken Rift", 4001)

// --------------------------------------------------
const COLUMNS_VALLEY_OF_REMEMBRANCE = [...ArtifactDungeonColumnTemplate()]
export const TMPL_VALLEY_OF_REMEMBRANCE = GenerateBundle(COLUMNS_VALLEY_OF_REMEMBRANCE, VALLEY_OF_REMEMBRANCE,
    "Valley of Rememberance", 2003)