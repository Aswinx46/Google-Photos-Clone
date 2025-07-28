
function useDebounce<T>(cb: (arg: T) => void, delay: number) {
    let isDebounced: ReturnType<typeof setTimeout>;

    return function (arg: T) {
        if (isDebounced) clearTimeout(isDebounced)
        isDebounced = setTimeout(() => {
            cb(arg)
        }, delay)
    }
}

export default useDebounce
