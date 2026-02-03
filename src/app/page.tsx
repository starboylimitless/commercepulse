
import { redirect } from 'next/navigation';

export default function Home() {
  // In a real app, we'd check session here.
  // For this demo, let's redirect to login.
  redirect('/login');
}
