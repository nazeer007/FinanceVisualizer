import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Category from '@/models/Category'

// Predefined categories (fallback if none exist)
const DEFAULT_CATEGORIES = [
  { name: 'Food', color: '#FF6384' },
  { name: 'Transport', color: '#36A2EB' },
  { name: 'Housing', color: '#FFCE56' },
  { name: 'Entertainment', color: '#4BC0C0' },
  { name: 'Utilities', color: '#9966FF' }
]

export async function GET() {
  try {
    await dbConnect()
    let categories = await Category.find()
    
    // Create default categories if none exist
    if (categories.length === 0) {
      categories = await Category.insertMany(DEFAULT_CATEGORIES)
    }
    
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const body = await request.json()
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      )
    }

    const category = await Category.create({
      name: body.name,
      color: body.color || '#8884d8'
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}