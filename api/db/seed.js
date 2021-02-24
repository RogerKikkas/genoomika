/* eslint-disable no-console */
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  // https://www.prisma.io/docs/guides/prisma-guides/seed-database
  //
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:
  //
  //   const existing = await db.user.findMany({ where: { email: 'admin@email.com' }})
  //   if (!existing.length) {
  //     await db.user.create({ data: { name: 'Admin', email: 'admin@email.com' }})
  //   }

  const { email, password, roles } = {
    email: 'admin@admin.com',
    password: 'admin',
    roles: ['view', 'upload', 'manage'],
  }

  const existing = await db.user.findMany({
    where: { email },
  })

  if (!existing.length) {
    const encryptedPassword = await bcrypt.hash(password, 12)

    await db.user.create({
      data: {
        password: encryptedPassword,
        email,
        userRoles: {
          create: roles.map((role) => ({ name: role })),
        },
      },
    })
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
