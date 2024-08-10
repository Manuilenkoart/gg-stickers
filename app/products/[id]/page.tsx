/* eslint-disable @next/next/no-img-element */
import { CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { Product } from 'app/lib/definitions';
import { productsMock } from 'app/lib/mock';
import { fakeFetch } from 'app/lib/utils';
import { ProductDetailsForm } from 'app/ui/products';
import { notFound } from 'next/navigation';

import S from './page.module.scss';

export default async function Page({ params }: { params: { id: string } }) {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 2000 });
  const product = products.find(({ id }) => id === params.id);

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
