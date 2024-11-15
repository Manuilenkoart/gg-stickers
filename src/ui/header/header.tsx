import ROUTE_PATH from '@/lib/ROUTE_PATH';
import Link from 'next/link';

import S from './header.module.scss';

import { CartIcon } from '../cart';
import { TitanOne } from '../fonts';

export default function Header() {
  return (
    <header className={S.header}>
      <Link href={ROUTE_PATH.HOME}>
        <h3 className={TitanOne.className}>GG Stickers</h3>
      </Link>

      <Link href={ROUTE_PATH.CART.INDEX}>
        <CartIcon />
      </Link>
    </header>
  );
}
