import { Product } from '@/app/lib/definitions';
import { productsMock } from '@/app/lib/mock';
import { fakeFetch } from '@/app/lib/utils';

import { ProductCard } from './productCard';
import S from './products.module.scss';

export default async function Products() {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 2000 });

  return (
    <section className={S.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
