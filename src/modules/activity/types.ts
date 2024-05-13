export interface IActivity {
  id: string
  contract_address: string
  token_index: string
  listing_price: number
  maker: string
  listing_from: Date | string
  listing_to: Date | string | null
  event_timestamp: Date | string
  created_at: Date | string
}
