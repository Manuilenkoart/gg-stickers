import { Product } from 'app/lib/definitions';
import { productsMock } from 'app/lib/mock';
import { fakeFetch } from 'app/lib/utils';

import { ProductListCard } from '../productListCard';
import S from './productList.module.scss';

export default async function ProductList() {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 2000 });

  return (
    <section className={S.container}>
      {products.map((product) => (
        <ProductListCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
