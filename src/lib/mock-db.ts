
export type Order = {
  id: string;
  productName: string;
  orderCount: number;
  revenue: number;
  date: string;
};

export const MOCK_ORDERS: Order[] = [
  { id: '1', productName: 'Premium Headphones', orderCount: 125, revenue: 18750, date: '2024-03-01' },
  { id: '2', productName: 'Wireless Mouse', orderCount: 450, revenue: 9000, date: '2024-03-02' },
  { id: '3', productName: 'Mechanical Keyboard', orderCount: 85, revenue: 12750, date: '2024-03-02' },
  { id: '4', productName: 'UltraWide Monitor', orderCount: 42, revenue: 21000, date: '2024-03-03' },
  { id: '5', productName: 'Smart Watch', orderCount: 310, revenue: 62000, date: '2024-03-03' },
  { id: '6', productName: 'USB-C Hub', orderCount: 190, revenue: 3800, date: '2024-03-04' },
  { id: '7', productName: 'Leather Laptop Sleeve', orderCount: 65, revenue: 3250, date: '2024-03-04' },
  { id: '8', productName: 'Portable SSD 2TB', orderCount: 110, revenue: 22000, date: '2024-03-05' },
  { id: '9', productName: 'Webcam 4K', orderCount: 75, revenue: 7500, date: '2024-03-05' },
  { id: '10', productName: 'Noise Cancelling Earbuds', orderCount: 220, revenue: 33000, date: '2024-03-06' },
  { id: '11', productName: 'Ergonomic Desk Chair', orderCount: 15, revenue: 7500, date: '2024-03-06' },
];

export function getOrderHistoryString(): string {
  return MOCK_ORDERS.map(o => `${o.productName}: ${o.date} (${o.orderCount})`).join(', ');
}
