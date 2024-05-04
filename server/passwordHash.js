import bcrypt from "bcrypt"

export const hashPassword = (plainTextPassword) => {
    const saltRounds = 10
    return bcrypt.hashSync(plainTextPassword, saltRounds)
}
