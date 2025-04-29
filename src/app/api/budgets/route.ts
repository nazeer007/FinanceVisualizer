import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Budget from '@/models/Budget'
import { startOfMonth } from 'date-fns'

export async function GET() {
  try {
    await dbConnect()
    const currentMonth = startOfMonth(new Date())
    const budgets = await Budget.find({ month: currentMonth })
      .populate('category')
    
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    
    if (!body.category || !body.amount) {
      return NextResponse.json(
        { error: 'Category and amount are required' },
        { status: 400 }
      )
    }

    const currentMonth = startOfMonth(new Date())
    const budget = await Budget.findOneAndUpdate(
      { category: body.category, month: currentMonth },
      { amount: body.amount },
      { upsert: true, new: true }
    ).populate('category')
    
    return NextResponse.json(budget, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set budget' },
      { status: 500 }
    )
  }
}