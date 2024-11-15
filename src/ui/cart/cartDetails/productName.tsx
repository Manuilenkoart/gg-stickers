/* eslint-disable @next/next/no-img-element */
import { ProductCart, ProductSize } from '@/lib/definitions';
import ROUTE_PATH from '@/lib/ROUTE_PATH';
import Link from 'next/link';
import { memo } from 'react';

interface ProductNameProps {
  productId: ProductCart['id'];
  sizeName: ProductSize['name'];
  productSrc: ProductCart['src'];
  productName: ProductCart['name'];
}
function ProductName({ productId, productName, productSrc, sizeName }: ProductNameProps) {
  return (
    <Link href={ROUTE_PATH.PRODUCTS.DETAILS(productId)}>
      <img
        src={productSrc.default}
        alt={productName}
      />
      <p>{`${productName}, ${sizeName}`}</p>
    </Link>
  );
}
export default memo(ProductName);
