import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Transaction } from '@/types'
  import { formatCurrency, formatDate } from '@/lib/utils'
  import { Badge } from '@/components/ui/badge'
  import { Trash2, Edit } from 'lucide-react'
  import { Button } from '@/components/ui/button'
  
  export default function TransactionList({ 
    transactions 
  }: { 
    transactions: Transaction[] 
  }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.category && typeof transaction.category !== 'string' && (
                  <Badge 
                    style={{ backgroundColor: transaction.category.color }}
                    className="text-white"
                  >
                    {transaction.category.name}
                  </Badge>
                )}
              </TableCell>
              <TableCell 
                className={`text-right font-medium ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }