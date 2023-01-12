import bcrypt from 'bcrypt'

const saltRounds = 8

const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}

export {
  saltRounds,
  encryptPassword
} 
