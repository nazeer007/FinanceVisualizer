'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'
import { format, subMonths, eachMonthOfInterval, startOfMonth } from 'date-fns'

interface MonthlyExpensesChartProps {
  transactions: {
    amount: number
    date: string
    type: 'expense' | 'income'
  }[]
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const data = useMemo(() => {
    const now = new Date()
    const sixMonthsAgo = subMonths(now, 5)
    const months = eachMonthOfInterval({
      start: startOfMonth(sixMonthsAgo),
      end: startOfMonth(now)
    })

    const monthlyData = months.map(month => {
      const monthKey = format(month, 'yyyy-MM')
      const monthExpenses = transactions
        .filter(t => t.type === 'expense' && format(new Date(t.date), 'yyyy-MM') === monthKey)
        .reduce((sum, t) => sum + t.amount, 0)

      return {
        name: format(month, 'MMM yyyy'),
        total: monthExpenses
      }
    })

    return monthlyData
  }, [transactions])

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Total Expenses']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar 
            dataKey="total" 
            fill="#8884d8" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}