
import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://user:password_1234@cluster0.xt7epl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // process.env.MONGODB_URI;
const dbName = 'Cluster0';

const client = new MongoClient(uri);

let db;

export async function getDatabase() {
  try {
    if (!db) {
       await client.connect();
       db = client.db(dbName);
       console.log('We connected to Cluster0');
    }
    return db;
  } catch(error){
    console.log('Error:', error);
  }
}
