import { keysMap, keyMapLink } from './types'

type formErrInitType = keysMap<string[]>

type formErrResultType = keyMapLink<Error[] | object>

export function formErrHandle(errData: formErrInitType): formErrResultType {
  const result: formErrResultType = {}
  if (String(errData) === '[object Object]') {
    Object.keys(errData).forEach(v => {
      if (Array.isArray(errData[v])) {
        result[v] = {
          errors: errData[v].map((item: string) => new Error(item))
        }
      }
    })
  }
  return result
}
