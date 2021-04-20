// Generator for sub-columns under artifacts tab
import {
    artifactCode, artifactMeta_01, artifactMeta_02,
    ascensionMatCode, ascensionMatMeta, talentBookMeta, talentUpMatCode
} from "../data/genshinLoot";
import React from "react";

// DRY: Modify in case changes were made to SASS selectors
const CSS_ICO = "ico";
const CSS_talentUp = "talentUp";
const CSS_artifacts = "artifact";
const CSS_ascension = "ascension";
const CSS_cell = "cell"

/* Utility function to generate CSS selector string
*   (Since we are using external SASS files)
*/
function MakeSelector(...args: string[]): string {
    let ret = ""
    args.forEach((ele) => {
        if (ele != "") ret += ele + " "
    })
    return ret.trim()
}

const GreyIfZero = (num: number): string => (num == 0.000) ? "greyed" : "";
// Converts a number to have three decimals
const ThreeDecimals = (num: number): string => num.toFixed(3);

/*
*   Open world bosses with all 4 rarity -- (offset  = 1)
*
*   -
* */
export const artifactColumnGen_01 = artifactMeta_01.map((ele, idx) => ({
    Header: () => <div className={MakeSelector(CSS_ICO, CSS_artifacts, ele)}/>,
    accessor: artifactCode + (idx + 1).toString(),
    Cell: (ele) => <div
        className={MakeSelector(CSS_artifacts, CSS_cell, GreyIfZero(ele.value))}>{ThreeDecimals(ele.value)}</div>
}))

/*
*   Dungeons with only top 3 rarity -- (offset  = 2)
*
*   - Domain of Guyun
*
* */
export const artifactColumnGen_02 = artifactMeta_02.map((ele, idx) => ({
    Header: () => <div className={MakeSelector(CSS_ICO, CSS_artifacts, ele)}/>,
    accessor: artifactCode + (idx + 1).toString(),
    Cell: (ele) => <div
        className={MakeSelector(CSS_artifacts, CSS_cell, GreyIfZero(ele.value))}>{ThreeDecimals(ele.value)}</div>
}))


// Generator for sub-columns under ascension materials tab
export const ascensionColumnGen = ascensionMatMeta.map((ele, idx) => ({
    Header: () => <div className={MakeSelector(CSS_ICO, CSS_ascension, ele)}/>,
    accessor: ascensionMatCode + (idx + 1).toString(),
    Cell: (ele) => <div
        className={MakeSelector(CSS_ascension, CSS_cell, GreyIfZero(ele.value))}>{ThreeDecimals(ele.value)}</div>
}))

export const talentBookColumnGen = talentBookMeta.map((ele, idx) => ({
    Header: () => <div className={MakeSelector(CSS_ICO, CSS_talentUp, ele)}/>,
    accessor: talentUpMatCode + (idx + 1).toString(),
    Cell: ele => <div
        className={MakeSelector(CSS_talentUp, CSS_cell, GreyIfZero(ele.value))}>{ThreeDecimals(ele.value)}</div>
}))