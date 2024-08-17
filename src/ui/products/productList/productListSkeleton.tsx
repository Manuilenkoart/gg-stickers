import { ProductListCardSkeleton } from '../productListCard/index';
import S from './productList.module.scss';

export default function ProductsSkeleton() {
  return (
    <section className={S.container}>
      {Array.from({ length: 9 }).map((_, index) => (
        <ProductListCardSkeleton key={index} />
      ))}
    </section>
  );
}
