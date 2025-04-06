import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the dashboard page immediately
  redirect('/dashboard');

  // This part will not be rendered due to the redirect,
  // but returning null or an empty fragment is good practice.
  return null;
}
