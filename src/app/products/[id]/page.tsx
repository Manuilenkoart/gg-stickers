import { Product } from '@/lib/definitions';
import { ProductDetails, ProductDetailsSkeleton } from '@/ui/products';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: Product['id'] } }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails productId={params.id} />
    </Suspense>
  );
}
