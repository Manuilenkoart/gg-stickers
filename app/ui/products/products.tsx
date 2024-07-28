import { productsMock } from '@/app/lib/mock/index.ts';
import { ProductCard } from './productCard/index.ts';
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
