import ROUTE_PATH from 'app/lib/ROUTE_PATH';
import Link from 'next/link';

import { CartIcon } from '../cart';
import S from './header.module.scss';

export default function Header() {
  return (
    <header className={S.header}>
      <Link href={ROUTE_PATH.HOME}>
        <h3>GG Stickers</h3>
      </Link>

      <Link href={ROUTE_PATH.CART.INDEX}>
        <CartIcon />
      </Link>
    </header>
  );
}
