import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Transaction } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export default function RecentTransactions({ 
  transactions 
}: RecentTransactionsProps) {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div key={transaction._id} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
            </div>
            <div 
              className={`font-medium ${
                transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}