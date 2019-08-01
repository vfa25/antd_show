import { keysMap } from './types'

type formValueInitType = keysMap<string>
type formErrInitType = keysMap<string[]>
type formResultItemType = {
  value: string
  errors?: Error[]
}
type formErrResultType = keysMap<formResultItemType>

export function formErrHandle(
  valueOrigin: formValueInitType,
  errData: formErrInitType
): formErrResultType {
  const result: formErrResultType = {}
  if (String(errData) === '[object Object]') {
    Object.keys(valueOrigin).forEach(v => {
      if (Array.isArray(errData[v])) {
        result[v] = {
          value: valueOrigin[v],
          errors: errData[v].map((item: string) => new Error(item))
        }
      } else {
        result[v] = {
          value: valueOrigin[v]
        }
      }
    })
  }
  return result
}
