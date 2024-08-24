/* eslint-disable @next/next/no-img-element */
import { CURRENCY_SYMBOL_MAP } from '@/lib/constants';
import { Product } from '@/lib/definitions';

import S from './productDetails.module.scss';
import { ProductDetailsForm } from './productDetailsForm';
import { productsMock } from '@/lib/mock';
import { fakeFetch } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface ProductDetailsProps {
  productId: Product['id'];
}
export default async function ProductDetails({ productId }: ProductDetailsProps) {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 200 });
  const product = products.find(({ id }) => id === productId);

  if (!product) {
    notFound();
  }

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
