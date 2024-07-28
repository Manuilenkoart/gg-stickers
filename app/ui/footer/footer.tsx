import ROUTE_PATH from '@/app/lib/ROUTE_PATH';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <Link href={ROUTE_PATH.ABOUT.INDEX}>About</Link>
    </footer>
  );
}
