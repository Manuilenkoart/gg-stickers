/* eslint-disable @next/next/no-img-element */
import { CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { Product } from 'app/lib/definitions';
import ROUTE_PATH from 'app/lib/ROUTE_PATH';
import Link from 'next/link';

import S from './productListCard.module.scss';

interface ProductListCardProps {
  product: Product;
}

export default function ProductListCard({ product: { id, name, description, price, src } }: ProductListCardProps) {
  return (
    <Link
      href={ROUTE_PATH.PRODUCTS.DETAILS(id)}
      className={S.container}
    >
      <img
        src={src}
        alt={name}
      />
      <section>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className={S.price}>
          <span>{`${price.value} ${CURRENCY_SYMBOL_MAP[price.currency]}`}</span>
        </div>
      </section>
    </Link>
  );
}
