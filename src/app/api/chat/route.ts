import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM messages ORDER BY timestamp ASC');
    const messages = stmt.all();
    return NextResponse.json({ messages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { sender, text } = await req.json();
    if (!sender || !text) {
      return NextResponse.json({ error: 'Sender and text are required' }, { status: 400 });
    }
    const stmt = db.prepare('INSERT INTO messages (sender, text) VALUES (?, ?)');
    const info = stmt.run(sender, text);
    
    const newMsgStmt = db.prepare('SELECT * FROM messages WHERE id = ?');
    const newMessage = newMsgStmt.get(info.lastInsertRowid);
    
    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to insert message' }, { status: 500 });
  }
}
