import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Transaction } from '@/types'

interface SummaryCardsProps {
  transactions: Transaction[]
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'expense') {
        acc.expenses += transaction.amount
      } else {
        acc.income += transaction.amount
      }
      return acc
    },
    { expenses: 0, income: 0 }
  )

  const savings = totals.income - totals.expenses

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <span className="text-green-500">↑</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totals.income)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <span className="text-red-500">↓</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totals.expenses)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          <span className={savings >= 0 ? 'text-green-500' : 'text-red-500'}>
            {savings >= 0 ? '↑' : '↓'}
          </span>
        </CardHeader>
        <CardContent>
          <div 
            className={`text-2xl font-bold ${
              savings >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {formatCurrency(savings)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}