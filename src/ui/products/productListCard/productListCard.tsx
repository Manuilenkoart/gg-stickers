/* eslint-disable @next/next/no-img-element */
import { CURRENCY_SYMBOL_MAP } from '@/lib/constants';
import { Product } from '@/lib/definitions';
import ROUTE_PATH from '@/lib/ROUTE_PATH';
import Link from 'next/link';

import S from './productListCard.module.scss';
import ProductListCardPicture from './productListCardPicture';

interface ProductListCardProps {
  product: Product;
}

export default function ProductListCard({ product: { description, id, name, price, src } }: ProductListCardProps) {
  return (
    <Link
      href={ROUTE_PATH.PRODUCTS.DETAILS(id)}
      className={S.container}
    >
      <ProductListCardPicture
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
