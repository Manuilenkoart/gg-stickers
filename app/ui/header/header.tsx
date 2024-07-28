import ROUTE_PATH from '@/app/lib/ROUTE_PATH';
import Link from 'next/link';

import S from './header.module.scss';

export default function Header() {
  return (
    <header className={S.header}>
      <Link href={ROUTE_PATH.HOME}>
        <h1>Home (logo)</h1>
      </Link>

      <Link href={ROUTE_PATH.CART.INDEX}>
        <div>cart</div>
      </Link>
    </header>
  );
}
