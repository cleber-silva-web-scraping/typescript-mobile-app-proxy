export const sleep = (ms: number) => new Promise((r) => {
    return setTimeout(r, ms * 1000)
});