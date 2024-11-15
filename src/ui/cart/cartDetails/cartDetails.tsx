/* eslint-disable @next/next/no-img-element */
'use client';

import { CURRENCY_SYMBOL_MAP, LOCAL_STORAGE_KEY } from '@/lib/constants';
import { CartMap, CartSizeMap, LocalStorageCart, ProductCart, ProductSize } from '@/lib/definitions';
import ROUTE_PATH from '@/lib/ROUTE_PATH';

import Link from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';

import { adaptCartMapToLocalStorageCart, adaptLocalStorageCartToCartMap, useLocalStorage } from '@/lib/utils';
import { Button } from '@/ui/components';
import S from './cartDetails.module.scss';
import ProductName from './productName';
import QuantityInput from './quantityInput';
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

  const handleRemoveProductClick = useCallback(
    (productId: ProductCart['id'], sizeId: ProductSize['id']) =>
      setCartMap((prev) => {
        const prevCartMap = new Map(prev);

        const product = prevCartMap.get(productId);
        if (!product) return prevCartMap;

        const productSize = product.sizes.get(sizeId);
        if (!productSize) return prevCartMap;

        const prevSizeMap = new Map(product.sizes);

        prevSizeMap.delete(sizeId);

        if (prevSizeMap.size > 0) {
          const productUpdated = { ...product, sizes: prevSizeMap };
          prevCartMap.set(productId, productUpdated);
        } else {
          prevCartMap.delete(productId);
        }

        return prevCartMap;
      }),
    [],
  );

  const cartPriceTotal = [...cartMap.values()].reduce(
    (productAcc, product) =>
      productAcc +
      Array.from(product.sizes.values()).reduce((sizeAcc, size) => sizeAcc + size.quantity * size.price.value, 0),
    0,
  );

  const handleChangeQuantity = useCallback(
    ({ productId, quantity, sizeId }: { quantity: string; productId: ProductCart['id']; sizeId: ProductSize['id'] }) =>
      setCartMap((prev) => {
        const prevCartMap = new Map(prev);

        const productInCart = prevCartMap.get(productId);
        if (!productInCart) return prevCartMap;

        const cartSizeMap: CartSizeMap = new Map(productInCart.sizes);
        const productSizeInCart = cartSizeMap.get(sizeId);
        if (!productSizeInCart) return prevCartMap;

        const minCartProductQuantity = 1;
        const updatedQuantity = quantity.trim() ? Math.floor(Number(quantity)) : minCartProductQuantity;

        cartSizeMap.set(sizeId, {
          ...productSizeInCart,
          quantity: updatedQuantity,
        });

        prevCartMap.set(productId, { ...productInCart, sizes: cartSizeMap });

        return prevCartMap;
      }),
    [],
  );

  return (
    <section className={S.section}>
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
            {[...cartMap.values()].map((product) =>
              [...product.sizes.values()].map((size) => (
                <tr key={product.id + size.id}>
                  <th>
                    <ProductName
                      productId={product.id}
                      productName={product.name}
                      productSrc={product.src}
                      sizeName={size.name}
                    />
                  </th>
                  <td>
                    <QuantityInput
                      onChange={handleChangeQuantity}
                      sizeQuantity={size.quantity}
                      productId={product.id}
                      sizeId={size.id}
                    />
                  </td>
                  <td>{`${CURRENCY_SYMBOL_MAP[size.price.currency]} ${size.price.value}`}</td>
                  <td>
                    <RemoveButton
                      productId={product.id}
                      sizeId={size.id}
                      onClick={handleRemoveProductClick}
                    />
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
          <h1>Your cart is empty</h1>
          <Link
            href={ROUTE_PATH.HOME}
            className={S.backHome}
          >
            <Button>Back to all products</Button>
          </Link>
        </>
      )}
    </section>
  );
}
export default memo(CartDetails);
