import {artifactColumnGen_01, artifactColumnGen_02, ascensionColumnGen, talentBookColumnGen} from "./tableGenerators"
import {
    FORSAKEN_RIFT_DATA,
    VALLEY_OF_REMEMBRANCE,
} from "../data/dummyData"
import {BaseMetaHeaders_01, BaseMetaHeaders_02} from "../data/genshinLoot";
import DroprateDataBosses from "../data/json/droprate_data_bosses.json"

export type IGenshinDroprateIdentifier = {
    id: number,
    name: string,
    icon: string
}
export type IGenshinDroprateStruct = IGenshinDroprateIdentifier & {
    data: any
}

// To be memoized
export type IGenshinTableProvider = {
    columns: any
    fragment: IGenshinDroprateIdentifier
    data: any
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

function GenerateBundle(columns: any, fragment: IGenshinDroprateStruct): IGenshinTableProvider {
    return {columns: columns, fragment: fragment, data: fragment.data}
}

// ---------------------------------------------------
// const COLUMNS_PYRO_REGISVINE = [...WorldBossColumnTemplate(artifactColumnGen_01, ascensionColumnGen)]
export const TMPL_PYRO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[0])
export const TMPL_CRYO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[1])
export const TMPL_OCEANID = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[2])
export const TMPL_ANEMO_HYPOSTASIS = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[3])
export const TMPL_ELECTRO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[4])
export const TMPL_GEO_REGISVINE = GenerateBundle(WORLD_BOSS_DROP_TABLE_SCHEMA, DroprateDataBosses[5])
// --------------------------------------------------

// ---------------------------------------------------
// const COLUMNS_FORSAKEN_RIFT = [...TalentDungeonColumnTemplate()]
// export const TMPL_FORSAKEN_RIFT = GenerateBundle(COLUMNS_FORSAKEN_RIFT, FORSAKEN_RIFT_DATA,
//     "Forsaken Rift", 4001, "dungeon_4001")

// --------------------------------------------------
// const COLUMNS_VALLEY_OF_REMEMBRANCE = [...ArtifactDungeonColumnTemplate()]
// export const TMPL_VALLEY_OF_REMEMBRANCE = GenerateBundle(COLUMNS_VALLEY_OF_REMEMBRANCE, VALLEY_OF_REMEMBRANCE,
//     "Valley of Rememberance", 2003, "dungeon_2003")