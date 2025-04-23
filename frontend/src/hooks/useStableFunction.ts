import {useCallback, useRef} from 'react'

/******
 * useStableFunction.ts
 *
 * This is a custom React hook that creates a stable function reference that
 * does not change on every render.
 *
 * @param fn - The function to be stabilized.
 * @returns A stable version of the provided function.
 *
 * This hook is useful for optimizing performance by preventing unnecessary
 * re-renders or re-executions of functions in React components, specifically
 * when passing functions as props to child components or when using them in
 * dependencies of other hooks, to avoid unnecessary re-renders or
 * re-executions.
 *
 * It uses a ref to store the latest version of the function and a callback to call it.
 *
 *      Example usage:
 *      const stableFunction = useStableFunction((arg1, arg2) => {
 *          // Your function logic here
 *       })
 ******/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStableFunction = <T extends (...args: any[]) => any>(
  fn: T
): T => {
  const fnRef = useRef(fn)
  fnRef.current = fn

  const stableCallback = useCallback((...args: Parameters<T>) => {
    const result = fnRef.current(...args) as unknown as ReturnType<T>
    return result
  }, []) as unknown as T

  return stableCallback
}
