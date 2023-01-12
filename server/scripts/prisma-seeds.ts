import { PrismaClient } from '@prisma/client'
import { encryptPassword } from './../helpers/encrypt-password'

const prisma = new PrismaClient()

async function main () {
  const user = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@localhost.com',
      password: await encryptPassword('password')
    }
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })