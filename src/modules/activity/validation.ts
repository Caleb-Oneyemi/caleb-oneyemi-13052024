import { z } from 'zod'

export const createActivitySchema = z
  .object({
    contract_address: z.string().trim().min(1),
    token_index: z.string().trim().min(1),
    listing_price: z.number(),
    maker: z.string().trim().min(1),
    listing_from: z.date(),
    listing_to: z.date().nullable(),
    event_timestamp: z.date(),
  })
  .strict()
