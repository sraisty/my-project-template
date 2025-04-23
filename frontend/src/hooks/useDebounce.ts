// To use:
// const {debouncedVal, cancel} = useDebounce(searchStr, 500)
// call cancel() on unmount, escape key, reset button, etc.

import {useCallback, useEffect, useRef, useState} from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState<T | null>(null)

  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancel = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current)
    }
  }, [])

  useEffect(() => {
    cancel()
    const timerId = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)
    timerIdRef.current = timerId

    return cancel
  }, [delay, value, cancel])

  return {debouncedVal, cancel}
}
