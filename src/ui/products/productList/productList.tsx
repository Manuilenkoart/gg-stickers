import { ProductListCard } from '../productListCard/index';
import S from './productList.module.scss';
import { fakeFetch } from '@/lib/utils';
import { productsMock } from '@/lib/mock';
import { Product } from '@/lib/definitions';

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
