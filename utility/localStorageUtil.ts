
type StoredTokenType = {
    isValid: boolean, token: string, expiry: string
}

const tokenStorage_TAG = "suvam0451-token"

export const readTokenStorage = (): StoredTokenType | null => {
    let frost = localStorage.getItem(tokenStorage_TAG)
    if (!frost) return null
    let obj: StoredTokenType = JSON.parse(frost);
    return obj
}

export const writeTokenStorage = (obj: StoredTokenType) => {
    localStorage.setItem(tokenStorage_TAG, JSON.stringify(obj))
}