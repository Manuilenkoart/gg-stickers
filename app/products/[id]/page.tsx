import { Product } from 'app/lib/definitions';
import { productsMock } from 'app/lib/mock';
import { fakeFetch } from 'app/lib/utils';
import { ProductDetails } from 'app/ui/products';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const products = await fakeFetch<Product[]>(productsMock, { timeOut: 2000 });
  const product = products.find(({ id }) => id === params.id);

  if (!product) {
    notFound();
  }
  return <ProductDetails product={product} />;
}
