require('dotenv').config();
const  {MongoClient} = require('mongodb');

let client;
let isConnected = false;
const uri = process.env.DB_CON_STRING;
const dbName = process.env.DATABASE_NAME;

client = new MongoClient(uri, { }); // Create mongoclient

async function connectToMongo() {
    try {
        if(!isConnected) {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB');
        } else {
            console.log('Connection is already active');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        isConnected = false;
        throw error; // Throw error to indicate failure to connect
    }
}
const getDB = () => {
    if(!client){
        throw new Error('MongoDB client is not connected');
    }
    else{
        return client.db(dbName);
    }
};
module.exports = { 
    connectToMongo, 
    getDB
};