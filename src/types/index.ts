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
