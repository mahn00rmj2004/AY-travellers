import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

function toTitleCase(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const basePrisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

export const prisma = basePrisma.$extends({
  query: {
    user: {
      async create({ args, query }) {
        if (args.data.fullName && typeof args.data.fullName === 'string') {
          args.data.fullName = toTitleCase(args.data.fullName);
        }
        return query(args);
      },
      async update({ args, query }) {
        if (args.data.fullName && typeof args.data.fullName === 'string') {
          args.data.fullName = toTitleCase(args.data.fullName);
        }
        return query(args);
      },
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = basePrisma

export default prisma