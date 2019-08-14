import { KeysMap } from './types'

type formValueInitType = KeysMap<string>
type formErrInitType = KeysMap<string[]>
interface FormResultItemType {
    value: string
    errors?: Error[]
}
type formErrResultType = KeysMap<FormResultItemType>

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
