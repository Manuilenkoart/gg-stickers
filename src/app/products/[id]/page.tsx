import { notFound } from 'next/navigation';
import { Product } from '@/lib/definitions';
import { fakeFetch } from '@/lib/utils';
import { productsMock } from '@/lib/mock';
import { ProductDetails } from '@/ui/products';

export default async function Page({ params }: { params: { id: string } }) {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 2000 });
  const product = products.find(({ id }) => id === params.id);

  if (!product) {
    notFound();
  }
  return <ProductDetails product={product} />;
}
