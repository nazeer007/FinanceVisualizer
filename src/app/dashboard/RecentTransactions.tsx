import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { formatCurrency, formatDate } from '@/lib/utils'
  import { Transaction } from '@/models/Transaction'
  
  interface RecentTransactionsProps {
    transactions: Transaction[]
  }
  
  export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const recentTransactions = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{transaction.description}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell 
                className={`text-right ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }