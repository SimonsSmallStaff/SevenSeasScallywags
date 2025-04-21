
import { getDatabase } from './db';

export async function findUserByUsername(username: string) {
  const db = await getDatabase();
  return await db.collection('users').findOne({ username });
}

export async function createUser(user: { username: string; hashedPassword: string }) {
  const db = await getDatabase();
  const result = await db.collection('users').insertOne(user);
  return { ...user, _id: result.insertedId };
}