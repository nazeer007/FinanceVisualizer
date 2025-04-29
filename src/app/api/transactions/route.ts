import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Transaction from '@/models/Transaction'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    await dbConnect()
    const transactions = await Transaction.find()
      .populate('category')
      .sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    
    // Basic validation
    if (!body.amount || !body.description) {
      return NextResponse.json(
        { error: 'Amount and description are required' },
        { status: 400 }
      )
    }

    const transaction = await Transaction.create({
      ...body,
      date: body.date || new Date()
    })
    
    revalidatePath('/dashboard')
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}