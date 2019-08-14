//  https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
// 避免允许字符串类型 和 数组允许类型的多次列出，并配合 typeof类型保护
export const tuple = <T extends string[]>(...args: T) => args

//映射
export interface KeysMap<T> {
    [key: string]: T
}

// 链表
export type LinkedList<T> = T & { next: LinkedList<T> }

//映射链
export type keyMapLink<T> = KeysMap<T> & KeysMap<KeysMap<T>>

export interface ItemMenu {
    id: number
    category_type: number
    name?: string
    desc: string
    key?: string
    children?: (ItemMenu & ItemDetail)[]
}

export interface ItemDetail {
    component_code: string
    name: string
    easy_to_use: number
    component_brief: string
    id: number
}
