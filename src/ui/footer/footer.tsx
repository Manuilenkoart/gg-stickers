import ROUTE_PATH from '@/lib/ROUTE_PATH';
import Link from 'next/link';

import S from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={S.container}>
      <Link href={ROUTE_PATH.ABOUT.INDEX}>About</Link>
    </footer>
  );
}
