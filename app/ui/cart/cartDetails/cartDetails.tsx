'use client';

import { LOCAL_STORAGE_KEY } from 'app/lib/constants';
import { Product, ProductCart, ProductSize, LocalStorageCart } from 'app/lib/definitions';
import ROUTE_PATH from 'app/lib/ROUTE_PATH';
import { useLocalStorage } from 'app/lib/utils';
import { Button } from 'app/ui/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import S from './cartDetails.module.scss';
import RemoveButton from './removeButton';

type CartSizeMap = Map<ProductSize['id'], ProductSize & { quantity: number }>;

type CartMap = Map<Product['id'], Pick<Product, 'id' | 'name' | 'src'> & { size: CartSizeMap }>;

function CartDetails() {
  const { getLS, setLS } = useLocalStorage();

  const [cart, setCart] = useState<CartMap>(() => {
    const localStorageCart = getLS<LocalStorageCart>(LOCAL_STORAGE_KEY.cart);
    const cartMap: CartMap = new Map();
    console.log('useState');

    if (!localStorageCart) return cartMap;

    Object.entries(localStorageCart).forEach(([productKey, productValues]) => {
      const cartSizeMap = new Map(Object.entries(productValues.size));

      cartMap.set(productKey, { ...productValues, size: cartSizeMap });
    });

    return cartMap;
  });

  useEffect(() => {
    // const abc = Array.from(cart.values()).map((product) => ({
    //   [product.id]: { ...product, size: { ...Array.from(product.size.values()).map((size) => ({ [size.id]: size })) } },
    // }));

    const obj = {};
    // cart.forEach((product) => {
    //   product.size.forEach(
    //     (size) => (obj = { ...obj, [product.id]: { ...product, size: { ...product.size, [size.id]: size } } }),
    //   );
    // });
    // setLS(LOCAL_STORAGE_KEY.cart, obj);
    console.log('obj', obj);
  }, [cart, setLS]);

  const handleRemoveButton = (productId: ProductCart['id'], sizeId: ProductSize['id']) => {
    setCart((prev) => {
      const prevCartMap = new Map(prev);

      const product = prevCartMap.get(productId);
      if (!product) return prevCartMap;

      const productSize = product.size.get(sizeId);
      if (!productSize) return prevCartMap;

      const prevSizeMap = new Map(product.size);

      const newQuantity = productSize.quantity - 1;

      if (newQuantity > 0) {
        const quantityUpdated = { ...productSize, quantity: newQuantity };
        const sizeUpdated = prevSizeMap.set(sizeId, quantityUpdated);
        const productUpdated = { ...product, size: sizeUpdated };

        prevCartMap.set(productId, productUpdated);
      } else {
        prevSizeMap.delete(sizeId);

        if (prevSizeMap.size > 0) {
          const productUpdated = { ...product, size: prevSizeMap };
          prevCartMap.set(productId, productUpdated);
        } else {
          prevCartMap.delete(productId);
        }
      }

      return prevCartMap;
    });
  };

  return (
    <main className={S.section}>
      {cart.size ? (
        <table>
          <caption>
            <h1>Your Cart</h1>
          </caption>

          <thead>
            <tr>
              {['Product', 'Quantity', 'Price', 'Remove'].map((e) => (
                <th key={e}>{e}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from(cart.values()).map((product) =>
              [...product.size.values()].map((size) => (
                <tr key={`${product.id}-${size.id}`}>
                  <th>{`${product.name}, ${size.name}`}</th>
                  <td>{size.quantity}</td>
                  <td>{size.price.value}</td>
                  <td>
                    <RemoveButton onClick={() => handleRemoveButton(product.id, size.id)} />
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      ) : (
        <>
          <h2>Your cart is empty</h2>
          <Link
            href={ROUTE_PATH.HOME}
            className={S.backHome}
          >
            <Button>Back to all products</Button>
          </Link>
        </>
      )}
    </main>
  );
}
export default CartDetails;
