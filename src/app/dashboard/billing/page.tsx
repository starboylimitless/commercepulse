
import { CreditCard, Zap } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Billing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">Pro Plan</p>
              <p className="text-muted-foreground">Renews on July 1, 2024</p>
            </div>
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
              <Zap size={24} />
            </div>
          </div>
          <button className="mt-6 w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Upgrade Plan
          </button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CreditCard size={32} />
              <div>
                <p className="font-semibold">Visa **** **** **** 1234</p>
                <p className="text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
            <button className="text-sm text-primary hover:underline">Update</button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Your payment information is securely stored and processed.
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Billing History</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-muted-foreground">
              <th className="pb-2">Date</th>
              <th className="pb-2">Description</th>
              <th className="pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">June 1, 2024</td>
              <td>Pro Plan - Monthly</td>
              <td className="text-right">$49.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-4">May 1, 2024</td>
              <td>Pro Plan - Monthly</td>
              <td className="text-right">$49.00</td>
            </tr>
            <tr className="border-b">
              <td className="py-4">April 1, 2024</td>
              <td>Pro Plan - Monthly</td>
              <td className="text-right">$49.00</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 text-sm text-primary hover:underline">View all</button>
      </div>
    </div>
  );
}
