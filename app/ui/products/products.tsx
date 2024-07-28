import { productsMock } from '@/app/lib/mock';

import { ProductCard } from './productCard';
import S from './products.module.scss';

export default function Products() {
  return (
    <section className={S.section}>
      {productsMock.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}
