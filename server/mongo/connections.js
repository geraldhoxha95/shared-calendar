import {MongoClient} from "mongodb";
import bcrypt from "bcrypt"

export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

export async function findUserByToken(username, token) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri)
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('credentials')

        const user = await verifyUserByToken(username, token, collection)
        if (user.length > 0 && user[0].token === token) {
            return {
                username: user[0].username,
                token: user[0].token
            }
        } else {
            throw new Error ('Invalid Token')
        }
    } finally {
        await mongoClient.close();
    }
}

export async function findUser(username, password) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri)
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('credentials')

        const user = await verifyUser(username, password, collection)
        if (user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
            return {
                username: user[0].username,
                token: user[0].token
            }
        } else {
            throw new Error ('Invalid password')
        }
    } finally {
        await mongoClient.close();
    }
}

export async function verifyUser(username, password, collection) {
    return collection.find({ username }).toArray();
}

export async function verifyUserByToken(username, token, collection) {
    return collection.find({ username, token }).toArray();
}

export async function createEventReq(event) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('events');

        console.log('CREATE Student');
        await createEvent(collection, event);
    } finally {
        await mongoClient.close();
    }
}

export async function deleteEventRequest(event) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('events');

        return await deleteEvent(collection, event);
    } finally {
        await mongoClient.close();
    }
}

export async function findAllEvents() {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('events');

        return await findEvents(collection);
    } finally {
        await mongoClient.close();
    }
}

export async function createEvent(collection, event) {
    console.log(event)
    await collection.insertOne(event);
}

export async function findEvents(collection, name) {
    return collection.find({}).toArray();
}

export async function deleteEvent(collection, event) {
    const query = { title: event.title }
    await collection.deleteOne(query)
}

export async function createLogin(collection, payload) {
    await collection.insertOne(payload);
}

export async function createLoginReq(payload) {
    const uri = process.env.DB_URI;
    let mongoClient;
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('friends_calendar');
        const collection = db.collection('credentials');

        console.log('CREATE Login');
        await createLogin(collection, payload);
    } finally {
        await mongoClient.close();
    }
}
