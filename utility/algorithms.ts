export type INavMap<T> = {
    prev: T,
    next: T
}

function MakeNavCouple<T>(...prev: T[]) {
    if (!prev.length) return {prev: prev[0], next: prev[0]}
    else return {prev: prev[0], next: prev[1]}
}

/*
*   A circular linked list is required for toggling between tabs with prev/next buttons.
*   We make do with a map (to store data as well)
* */
export function CircularNavMap<T>(arr: T[]): Map<T, INavMap<T>> {
    const navMap: Map<T, { prev: T, next: T }> = new Map()
    let N = arr.length
    switch (N) {
        case 0:
            break;
        case 1: {
            navMap.set(arr[0], MakeNavCouple(arr[1]))
            break;
        }
        default: {
            navMap.set(arr[0], MakeNavCouple(arr[N - 1], arr[1]))
            for (let i = 1; i < N - 1; i++)
                navMap.set(arr[i], MakeNavCouple(arr[i - 1], arr[i + 1]))
            navMap.set(arr[N - 1], MakeNavCouple(arr[N - 2], arr[0]))
        }
    }
    return navMap
}