
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyPassword, generateToken, setTokenCookie } from './auth';
import { findUserByUsername } from './user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

  const user = await findUserByUsername(username);
  if (!user) return res.status(401).json({ message: 'Invalid user or password' });

  const isValid = await verifyPassword(password, user.hashedPassword);
  if (!isValid) return res.status(401).json({ message: 'Invalid user or password' });

  const token = generateToken({ username });
  setTokenCookie(res, token);

  res.status(200).json({ message: 'Login successful', user: { username: user.username } });
}
