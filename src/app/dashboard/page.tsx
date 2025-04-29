import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import SummaryCards from '@/components/dashboard/SummaryCards'
import MonthlyExpensesChart from '@/components/charts/MonthlyExpensesChart'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

async function getTransactions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/transactions`, {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch transactions')
  }
  
  return res.json()
}

export default async function DashboardPage() {
  const transactions = await getTransactions()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Finance Dashboard</h1>
      
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <SummaryCards transactions={transactions} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-80 w-full" />}>
              <MonthlyExpensesChart transactions={transactions} />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-80 w-full" />}>
              <RecentTransactions transactions={transactions} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}