export interface IToken {
  id: string
  index: string
  contract_address: string
  current_price: number | null
  created_at: Date | string
  updated_at: Date | string
}
