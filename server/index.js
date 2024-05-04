import { config } from 'dotenv';
import express from 'express'

import cors from 'cors'
import bodyParser from "body-parser";
import { createEventReq, deleteEventRequest, findAllEvents, findUser, findUserByToken } from "./mongo/connections.js"

const app = express()
const port = 3001

const jsonParser = bodyParser.json()

app.use(cors())

config()

app.get('/', async (req, res, next) => {
    const { token, username } = req.query
    try {
        const validUser = await findUserByToken(username, token)
        if (validUser.length === 0) {
            throw new Error('Invalid Token')
          }
        const response = await findAllEvents()

        res.send(response)
    } catch (e) {
        next(e)
    }
})

app.post('/login', jsonParser, async (req, res, next) => {
    const {username, password} = req.body
    try {
        const response = await findUser(username.toLowerCase(), password)
        res.send(response)
    } catch (e) {
        next(e)
    }
})

app.post('/createEvent', jsonParser, async (req, res, next) => {
    const { token, username } = req.query
    try {
        const validUser = await findUserByToken(username, token)
        if (validUser.length === 0) {
            throw new Error('Invalid Token')
        }
        const event = req.body
        await createEventReq(event);
        res.send('Event created');
    } catch (e) {
        next(e)
    }
})

app.post('/deleteEvent', jsonParser, async (req, res, next) => {
    const { token, username } = req.query
    try {
        const validUser = await findUserByToken(username, token)
        if (validUser.length === 0) {
            throw new Error('Invalid Token')
        }
        const event = req.body
        await deleteEventRequest(event);
        res.send('Event created');
    } catch (e) {
        next(e)
    }

})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`)
})

