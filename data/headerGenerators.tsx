// Generator for sub-columns under artifacts tab
import {artifactCode, artifactMeta_01, artifactMeta_02,
    ascensionMatCode, ascensionMatMeta} from "./genshinLoot";
import React from "react";

/*
*   Open world bosses with all 4 rarity -- (offset  = 1)
*
*   -
* */
export const artifactColumnGen_01 = artifactMeta_01.map((ele, idx) => ({
    Header: () => <div className={"ico artifact " + ele}/>,
accessor: artifactCode + (idx + 1).toString(),
    Cell: (ele) => <div className={"artifact " + ele}>{ele.value}</div>
}))

/*
*   Dungeons with only top 3 rarity -- (offset  = 2)
*
*   - Domain of Guyun
*
* */
export const artifactColumnGen_02 = artifactMeta_02.map((ele, idx) => ({
    Header: () => <div className={"ico artifact " + ele}/>,
    accessor: artifactCode + (idx + 2).toString(),
    Cell: (ele) => <div className={"artifact " + ele}>{ele.value}</div>
}))




// Generator for sub-columns under ascension materials tab
export const ascensionColumnGen = ascensionMatMeta.map((ele, idx) => ({
    Header: () => <div className={"ico ascension " + ele}/>,
accessor: ascensionMatCode + (idx + 1).toString(),
    Cell: (ele) => <div className={"ascension " + ele}>{ele.value}</div>
}))