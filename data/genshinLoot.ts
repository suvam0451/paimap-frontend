// Abbreviations (must be used in the data)
export const ascensionMatCode = "asc";
export const artifactCode = "art";

// Artifact rarity
export const artifactMeta_01 = ["green", "blue", "purple", "orange"]
export const artifactMeta_02 = ["blue", "purple", "orange"] // Domain of Guyun

// Talent book rarity
export const talentBookMeta = ["copper", "silver", "gold"]

// Ascension material rarity
export const ascensionMatMeta = ["green", "blue", "purple", "orange"]

// Weapon ascension material rarity
export const weaponAscensionMeta = ["green", "blue", "purple", "orange"]

// The first two columns for boss runs is same
export const BossMetaHeaders = {
    Header: 'Data',
    columns: [
        {
            Header: 'Runs',
            accessor: 'col1',
            filterable: true
        }
        , {
            Header: 'WL',
            accessor: 'col2',
            sortType: "basic",
            filterable: false
        },
    ]
}

// Dungeons have level barrier before being unlocked
export const DungeonMetaHeaders = {
    Header: 'Data',
    columns: [
        {
            Header: "Runs",
            accessor: "col1",
            filterable: true
        }, {
            Header: "DL",
            accessor: "col2",
            filterable: true
        }, {
            Header: "AR",
            accessor: "col3",
            filterable: true
        }, {
            Header: "WL",
            accessor: "col4",
            filterable: true
        }
    ]
}