'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BudgetWithCategory, Transaction } from '@/types'

export default function BudgetVsActualChart({
  budgets,
  transactions
}: {
  budgets: BudgetWithCategory[]
  transactions: Transaction[]
}) {
  const data = budgets.map(budget => {
    const actual = transactions
      .filter(t => 
        t.category && 
        typeof t.category !== 'string' &&
        t.category._id === budget.category._id && 
        t.type === 'expense'
      )
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      name: budget.category.name,
      budget: budget.amount,
      actual,
      difference: budget.amount - actual
    }
  })

  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              `$${value}`,
              name === 'difference' 
                ? 'Remaining' 
                : name === 'budget' 
                  ? 'Budgeted' 
                  : 'Actual'
            ]}
          />
          <Legend 
            formatter={(value) => (
              value === 'difference' 
                ? 'Remaining' 
                : value === 'budget' 
                  ? 'Budgeted' 
                  : 'Actual'
            )}
          />
          <Bar 
            dataKey="budget" 
            fill="#8884d8" 
            name="Budget" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="actual" 
            fill="#82ca9d" 
            name="Actual" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="difference" 
            fill="#ffc658" 
            name="Difference" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}