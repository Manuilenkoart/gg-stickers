'use client';

import { LOCAL_STORAGE_KEY, CURRENCY_SYMBOL_MAP } from 'app/lib/constants';
import { CartMap, ProductCart, ProductSize, LocalStorageCart } from 'app/lib/definitions';
import ROUTE_PATH from 'app/lib/ROUTE_PATH';
import { useLocalStorage, adaptCartMapToLocalStorageCart, adaptLocalStorageCartToCartMap } from 'app/lib/utils';
import { Button } from 'app/ui/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import S from './cartDetails.module.scss';
import RemoveButton from './removeButton';

function CartDetails() {
  const { getLS, setLS } = useLocalStorage();

  const [cartMap, setCartMap] = useState<CartMap>(() => {
    const localStorageCart = getLS<LocalStorageCart>(LOCAL_STORAGE_KEY.cart);

    return adaptLocalStorageCartToCartMap(localStorageCart);
  });

  useEffect(() => {
    const localStorageCart = adaptCartMapToLocalStorageCart(cartMap);
    setLS(LOCAL_STORAGE_KEY.cart, localStorageCart);
  }, [cartMap, setLS]);

  const handleRemoveButton = (productId: ProductCart['id'], sizeId: ProductSize['id']) => {
    setCartMap((prev) => {
      const prevCartMap = new Map(prev);

      const product = prevCartMap.get(productId);
      if (!product) return prevCartMap;

      const productSize = product.sizes.get(sizeId);
      if (!productSize) return prevCartMap;

      const prevSizeMap = new Map(product.sizes);

      const newQuantity = productSize.quantity - 1;

      if (newQuantity > 0) {
        const quantityUpdated = { ...productSize, quantity: newQuantity };
        const sizeUpdated = prevSizeMap.set(sizeId, quantityUpdated);
        const productUpdated = { ...product, sizes: sizeUpdated };

        prevCartMap.set(productId, productUpdated);
      } else {
        prevSizeMap.delete(sizeId);

        if (prevSizeMap.size > 0) {
          const productUpdated = { ...product, sizes: prevSizeMap };
          prevCartMap.set(productId, productUpdated);
        } else {
          prevCartMap.delete(productId);
        }
      }

      return prevCartMap;
    });
  };

  const cartPriceTotal = Array.from(cartMap.values()).reduce(
    (productAcc, product) =>
      productAcc +
      Array.from(product.sizes.values()).reduce((sizeAcc, size) => sizeAcc + size.quantity * size.price.value, 0),
    0,
  );
  return (
    <main className={S.section}>
      {cartMap.size ? (
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
            {Array.from(cartMap.values()).map((product) =>
              Array.from(product.sizes.values()).map((size) => (
                <tr key={`${product.id}-${size.id}`}>
                  <th>{`${product.name}, ${size.name}`}</th>
                  <td>{size.quantity}</td>
                  <td>{`${CURRENCY_SYMBOL_MAP[size.price.currency]} ${size.price.value}`}</td>
                  <td>
                    <RemoveButton onClick={() => handleRemoveButton(product.id, size.id)} />
                  </td>
                </tr>
              )),
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td></td>
              <td>{`${CURRENCY_SYMBOL_MAP['usd']} ${cartPriceTotal}`}</td>
              <td></td>
            </tr>
          </tfoot>
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
