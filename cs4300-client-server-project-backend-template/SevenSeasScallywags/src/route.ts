
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from './server';
import User from './model';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password, action } = await req.json();

    if (!username || !password || !action) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    if (action === 'register') {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return NextResponse.json({ message: 'Username already taken' }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });

      await newUser.save();

      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    }

    if (action === 'login') {
      const user = await User.findOne({ username });

      if (!user) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }

      // Here you could also set a session or JWT
      return NextResponse.json({ message: 'Login successful', user: { username: user.username } });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
