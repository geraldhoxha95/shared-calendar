import { v4 as uuidv4 } from 'uuid'
import {hashPassword} from "../passwordHash.js"
import {createLoginReq} from "../mongo/connections.js"
import {config} from 'dotenv'
config()
const args = process.argv.slice(2)

const payload = {
    username: args[0],
    password: hashPassword(args[1]),
    token: uuidv4()
}

await createLoginReq(payload)

process.exit()
