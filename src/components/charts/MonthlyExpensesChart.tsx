'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subMonths, startOfMonth, eachMonthOfInterval } from 'date-fns'
import { Transaction } from '@/types'

export default function MonthlyExpensesChart({ 
  transactions 
}: { 
  transactions: Transaction[] 
}) {
  const data = eachMonthOfInterval({
    start: startOfMonth(subMonths(new Date(), 11)), // Last 12 months
    end: startOfMonth(new Date())
  }).map(month => {
    const monthKey = format(month, 'yyyy-MM')
    const monthExpenses = transactions
      .filter(t => 
        t.type === 'expense' && 
        format(new Date(t.date), 'yyyy-MM') === monthKey
      )
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      name: format(month, 'MMM yy'),
      value: monthExpenses
    }
  })

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar 
            dataKey="value" 
            fill="#8884d8" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}