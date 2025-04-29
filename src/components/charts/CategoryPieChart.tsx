'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Transaction } from '@/types'

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#A4DE6C', '#D0ED57', '#8884D8', '#82CA9D'
]

export default function CategoryPieChart({ 
  transactions 
}: { 
  transactions: Transaction[] 
}) {
  const categoryData = transactions
    .filter(t => t.type === 'expense' && t.category && typeof t.category !== 'string')
    .reduce((acc, t) => {
      const categoryName = t.category.name
      acc[categoryName] = (acc[categoryName] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percent: (value / Object.values(categoryData).reduce((a, b) => a + b, 0)) * 100
  }))

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${percent.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string, entry: any) => [
              `$${value.toFixed(2)}`,
              `${entry.payload.name} (${entry.payload.percent.toFixed(1)}%)`
            ]}
          />
          <Legend 
            formatter={(value, entry, index) => (
              <span style={{ color: COLORS[index % COLORS.length] }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}