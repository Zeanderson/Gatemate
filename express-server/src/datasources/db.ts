/*
* ABOUT MONGODB: 
    Data in MongoDB is stored as "collections" (like tables in SQL), of "documents" (like rows in SQL), which are ordered lists of JSON 
    objects. Unique IDs are automatically generated for each document, but collection names are not. We will use the convention that each 
    type of data gets its own collection, and the collection name is the same as the type name. We declare a type "collectionName" which
    has a single property of the same name and denotes the name of the collection. 

* CONNECTING TO MONGODB: 
    To connect to MongoDB we require: 
    [1.] A username and password that are set in the .env file 
    [2.] A "MongoClient" object initialized with the settings: 

    const client = new MongoClient(uri,  
        {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
    ); 

    where the uri is constructed using the username and password. 

    Once we have the MongoClient object, we call the asynchronous connect() method to connect to the database. We don't need to check if 
    the client is already connected. 

    TODO: Find a way to run asynchronous commands on the database without having to be connected the entire time, and without having to use 
    TODO: a different client for each command. Currently, because the commands run on the same client, we can't disconnect the client in any 
    TODO: one command because it might interupt another command and we'll get a MongoNetworkError. Alternatively, we could just always have 
    TODO: each client connected to the database, but I'm not sure of the negative consequences of this. 

* OPERATING ON THE DATABASE: 
    Every function that interacts with the database will take in a MongoClient object to establish a connection to the database. Additionally, 
    every argument used for creating, searching, updating, deleting, etc. will be of type validDBType defined in types.ts. This ensures that 
    the database will never have data that is not one of the verified types. Additionally, this ensures each datum will have the collectionName 
    property, which tells the database which collection that datum refers. 

    TODO: Write better error handling for CRUD operations. Add CRUD operations that can handle batches of documents. 
*/

import { validDBType } from "../types";
import { validCollectionNames } from "../types";
const { MongoClient, ServerApiVersion } = require("mongodb");

// Fetch environment variables
const MDB_USER = process.env.MDB_USER;
const MDB_PASS = process.env.MDB_PASS;

// Connection string to connect to the MongoDB server
const uri = `mongodb+srv://${MDB_USER}:${MDB_PASS}@gatemate.qzhtx4h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (e) {
    console.error("Error connecting to the database:", e);
  }
}

function getClient() {
  return client;
}

async function close() {
  await client.close();
  console.log("Connection to the database closed");
}

function getCollectionName(document: validDBType) {
  if (validCollectionNames.includes(document.collectionName)) {
    return document.collectionName;
  }

  console.error("Document is not a valid DB type.");
}

async function pingDB() {
  try {
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error(e);
  }
}

async function createDoc(document: validDBType) {
  try {
    const result = await client
      .db("gatemate")
      .collection(getCollectionName(document))
      .insertOne(document);
    console.log(
      `New listing created with the following id: ${result.insertedId}`
    );
  } catch (e) {
    console.error(e);
  }
}

// Passing in what we want to search for (query (i.e email for user))
async function readDoc(document: validDBType, query: any) {
  try {
    const result = await client
      .db("gatemate")
      .collection(getCollectionName(document))
      .findOne(query);
    if (result) {
      console.log("Found a listing in the collection:");
      console.log(result);
      return result;
    } else {
      console.log("No listings found");
      return undefined;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function updateDoc(
  documentOriginal: validDBType,
  documentReplacement: validDBType
) {
  try {
    await client
      .db("gatemate")
      .collection(getCollectionName(documentOriginal))
      .replaceOne(documentOriginal, documentReplacement);
  } catch (e) {
    console.error(e);
  }
}

async function deleteDoc(document: validDBType) {
  try {
    const result = await client
      .db("gatemate")
      .collection(getCollectionName(document))
      .deleteOne(document);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
  } catch (e) {
    console.error(e);
  }
}

export {
  connect,
  getClient,
  close,
  pingDB,
  createDoc,
  readDoc,
  updateDoc,
  deleteDoc,
};
