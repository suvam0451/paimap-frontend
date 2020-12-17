// Abbreviations (must be used in the data)
import React from "react";

export const ascensionMatCode = "asc";
export const talentUpMatCode = "tnt";
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

// TIDY: Fragments used below
const Filterable = {
    filterable: true,
    sortType: "basic",
    Cell: (ele) => <div>{ele.value}</div>
}
const NonFilterable = {
    filterable: false,
    Cell: (ele) => <div>{ele.value}</div>
}

// The first two columns for boss runs is same
export const BaseMetaHeaders_01 = {
    Header: 'Data',
    columns: [
        {
            Header: 'Runs',
            accessor: 'col1',
            ...Filterable
        }, {
            Header: 'WL',
            accessor: 'col2',
            ...Filterable
        },
    ]
}


// Dungeons have level barrier before being unlocked
export const BaseMetaHeaders_02 = {
    Header: 'Data',
    columns: [
        {
            Header: "Runs",
            accessor: "col1",
            ...Filterable
        }, {
            Header: "DL",
            accessor: "col2",
            ...NonFilterable
        }, {
            Header: "AR",
            accessor: "col3",
            ...NonFilterable
        }, {
            Header: "WL",
            accessor: "col4",
            ...Filterable
        }
    ]
}