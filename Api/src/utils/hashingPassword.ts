import bcrypt from 'bcrypt'

const hashingPassword = async(password : string) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt)

    return passwordHashed
}

export default hashingPassword