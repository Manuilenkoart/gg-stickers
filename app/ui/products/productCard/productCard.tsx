import ROUTE_PATH from '@/app/lib/ROUTE_PATH.ts';
import { Product } from '@/app/lib/types.ts';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product: { id, name } }: ProductCardProps) {
  return (
    <Link href={ROUTE_PATH.PRODUCTS.DETAILS(id)}>
      <div>{name}</div>
    </Link>
  );
}
