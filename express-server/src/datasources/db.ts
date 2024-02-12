/*
* ABOUT MONGODB: 
    Data in MongoDB is stored as "collections" (like tables in SQL), of "documents" (like rows in SQL), which are ordered lists of JSON 
    objects. Unique IDs are automatically generated for each document, but collection names are not. 

* ABOUT MONGOOSE: https://mongoosejs.com/docs/guides.html
    Mongoose is an API that streamlines interacting with MongoDB and allows users to enforce type restrictions on the data 
    they store by making "schemas" which define the structure of data. We then use a schema to define a "model", which is how 
    we will interact with MongoDB. The model automatically creates a collection of the same name (but pluralized) in MongoDB. 
    We can do all the standard CRUD operations and much more by starting with a model and calling one of many methods on it 
    (e.g. findOne(), count(), etc.). The result from calling these operations which returns documents from MongoDB are 
    Mongoose Documents. There is no easy way to convert between user defined types and Mongoose Documents, but Mongoose 
    Documents can be used the same as user defined types. So if there is data to be stored in the database, we should NOT 
    define a type, we should define a Schema and then a Model. 

* HOW TO INTERACT WITH THE DATABASE 
    For each datatype with name <type> we define many intermediate types/classes in the files ../interfaces.ts, ../models.ts. In 
    general, we will only use the following: the interface with name I<type>, the model with name <type>, and the document 
    with name I<type>Doc. Their use cases are as follows: 
    * The interface I<type>: 
      Use this type for function arguments and doing logic. This should be your default. 
    * The model <type>: 
      You will NOT make instances of this class. The default instance is declared in ../models.ts and imported with name <type>. 
      You will use the methods of the model to interact with the database. This includes the basic CRUD operations and much more. 
    * The document I<type>Doc: 
      This is the type returned by calls to the database. It has all the fields that the interface has and you access them the 
      same way. There are additional methods you can call on documents, and in particular you can chain queries on them. 
*/

import mongoose from 'mongoose'

// Fetch environment variables
const MDB_USER = process.env.MDB_USER;
const MDB_PASS = process.env.MDB_PASS;

// Connection string to connect to the MongoDB server
const uri = `mongodb+srv://${MDB_USER}:${MDB_PASS}@gatemate.qzhtx4h.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri); 
  } catch (e) {
    console.error("Error connecting to the database:", e);
  }
}

async function close() {
  await mongoose.connection.close(); 
  console.log("Connection to the database closed");
}

export {
  connect,
  close,
};
