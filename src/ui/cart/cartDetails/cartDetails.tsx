/* eslint-disable @next/next/no-img-element */
'use client';

import { LOCAL_STORAGE_KEY, CURRENCY_SYMBOL_MAP } from '@/lib/constants';
import { CartMap, ProductCart, ProductSize, CartSizeMap, LocalStorageCart } from '@/lib/definitions';
import ROUTE_PATH from '@/lib/ROUTE_PATH';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import S from './cartDetails.module.scss';
import RemoveButton from './removeButton';
import { adaptCartMapToLocalStorageCart, adaptLocalStorageCartToCartMap, useLocalStorage } from '@/lib/utils';
import { Button } from '@/ui/components';

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

  const handleRemoveProductClick = (productId: ProductCart['id'], sizeId: ProductSize['id']) => {
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
    });
  };

  const cartPriceTotal = [...cartMap.values()].reduce(
    (productAcc, product) =>
      productAcc +
      Array.from(product.sizes.values()).reduce((sizeAcc, size) => sizeAcc + size.quantity * size.price.value, 0),
    0,
  );

  const handleChangeQuantity = ({
    productId,
    quantity,
    sizeId,
  }: {
    quantity: string;
    productId: ProductCart['id'];
    sizeId: ProductSize['id'];
  }) => {
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
    });
  };
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
            {[...cartMap.values()].map((product) =>
              [...product.sizes.values()].map((size) => (
                <tr key={`${product.id}-${size.id}`}>
                  <th>
                    <Link href={ROUTE_PATH.PRODUCTS.DETAILS(product.id)}>
                      <img
                        src={product.src}
                        alt={product.name}
                      />
                      <p>{`${product.name}, ${size.name}`}</p>
                    </Link>
                  </th>
                  <td>
                    <input
                      type="number"
                      inputMode="numeric"
                      id="quantity"
                      name="quantity"
                      min="1"
                      step="1"
                      value={size.quantity}
                      onChange={(e) =>
                        handleChangeQuantity({ productId: product.id, quantity: e.target.value, sizeId: size.id })
                      }
                    />
                  </td>
                  <td>{`${CURRENCY_SYMBOL_MAP[size.price.currency]} ${size.price.value}`}</td>
                  <td>
                    <RemoveButton onClick={() => handleRemoveProductClick(product.id, size.id)} />
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
    </main>
  );
}
export default CartDetails;
