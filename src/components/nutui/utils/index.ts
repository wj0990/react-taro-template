export function debounce(fn: Function, ms = 250) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args)
    }, ms)
  }
}


export function easeOutScroll(from: number, to: number, duration = 500, callback?) {
  if (from === to || typeof from !== 'number') {
    return
  }

  const change = to - from
  const sTime = Date.now()
  const isLarger = to >= from

  function linear(t: number, b: number, c: number, d: number): number {
    return c * t / d + b
  }

  function step() {
    from = linear(Date.now() - sTime, from, change, duration)
    if ((isLarger && from >= to) || (!isLarger && to >= from)) {
      callback(to)
      return
    }
    callback(from)
    requestAnimationFrame(step)
  }

  step()
}

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'


export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
