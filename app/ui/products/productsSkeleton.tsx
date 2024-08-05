import ProductCardSkeleton from './productCard/productCardSkeleton';
import S from './products.module.scss';

export default function ProductsSkeleton() {
  return (
    <section className={S.container}>
      {Array.from({ length: 9 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </section>
  );
}
