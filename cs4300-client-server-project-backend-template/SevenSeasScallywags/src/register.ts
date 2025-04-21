
import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, generateToken, setTokenCookie } from './auth';
import { createUser, findUserByUsername } from './user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (!password || !username) return res.status(400).json({ message: 'Missing fields' });

  const existing = await findUserByUsername(username);
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await hashPassword(password);
  const user = await createUser({ username, hashedPassword });

  const token = generateToken({ username });
  setTokenCookie(res, token);

  res.status(201).json({ message: 'User created', user: { username } });
}
