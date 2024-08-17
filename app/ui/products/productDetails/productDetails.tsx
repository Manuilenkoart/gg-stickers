/* eslint-disable @next/next/no-img-element */
import { CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { Product } from 'app/lib/definitions';

import S from './productDetails.module.scss';
import { ProductDetailsForm } from './productDetailsForm';

interface ProductDetailsProps {
  product: Product;
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <main className={S.main}>
      <img
        src={product.src}
        alt={product.name}
        className={S.imgContainer}
      />
      <section>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <div>{`${product.price.value} ${CURRENCY_SYMBOL_MAP[product.price.currency]}`}</div>

        <ProductDetailsForm product={product} />
      </section>
    </main>
  );
}
