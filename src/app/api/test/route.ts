import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    const conn = await dbConnect();
    return NextResponse.json({ 
      success: true,
      message: 'Connected to MongoDB',
      dbName: conn.connection.db.databaseName 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { 
      status: 500 
    });
  }
}