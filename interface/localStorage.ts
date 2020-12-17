
type IDropratePrefs = {
    activeWindow: number
    AR: boolean[]
}

// KEYS
const DROPRATE_PREFS = "prefs_droprate";

export function set_dropratePrefs(setval: IDropratePrefs) {
    localStorage.setItem(DROPRATE_PREFS,     JSON.stringify(setval));
}

export function get_dropratePrefs() : IDropratePrefs {
    const opt = localStorage.getItem(DROPRATE_PREFS)
    if(opt == null) {
        return { activeWindow: 0, AR: Array(8).fill(true) }
    }
    const chk : IDropratePrefs =  JSON.parse(opt)
    if(chk == null) {
        let tmp = new Array(8)
        tmp.fill(true)
        return { activeWindow: 0, AR: Array(8).fill(true) }
    }
    return chk
}
