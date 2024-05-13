export interface ProviderApiResponse {
  continuation: string
  events: Array<{
    event: {
      createdAt: string
      id: string
      kind: string
      txHash: null
      txTimestamp: null
    }
    order: {
      id: string
      contract: string
      maker: string
      validFrom: number
      validUntil: number | null
      price: {
        amount: { native: number }
      }
      criteria: {
        data: {
          token: {
            tokenId: string
          }
        }
      }
    }
  }>
}
