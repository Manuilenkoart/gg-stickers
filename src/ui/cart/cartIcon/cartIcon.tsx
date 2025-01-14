'use client';
/* eslint-disable @next/next/no-img-element */
import { LOCAL_STORAGE_KEY } from '@/lib/constants';
import { LocalStorageCart } from '@/lib/definitions';

import clsx from 'clsx';
import { useState, useEffect } from 'react';

import S from './cartIcon.module.scss';
import { useLocalStorage } from '@/lib/utils';

export default function CartIcon() {
  const { getLS } = useLocalStorage();

  const [cartCount, setCartCount] = useState(() => {
    const localStorageCart = getLS<LocalStorageCart>(LOCAL_STORAGE_KEY.cart);
    return !!localStorageCart ? productQuantityCounter(localStorageCart) : 0;
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localStorageCartListener = (event: any) => {
      const localStorageCart = event?.currentTarget?.localStorage?.cart as string | undefined;
      if (!localStorageCart) return;

      const productQuantity = productQuantityCounter(JSON.parse(localStorageCart));
      setCartCount(productQuantity);
    };

    window.addEventListener(LOCAL_STORAGE_KEY.cart, localStorageCartListener);

    return () => {
      window.removeEventListener(LOCAL_STORAGE_KEY.cart, localStorageCartListener);
    };
  }, []);

  return (
    <div className={S.container}>
      {cartCount ? (
        <span className={clsx(cartCount <= 9 ? S.cartCountShort : S.cartCountLong)}>{cartCount}</span>
      ) : null}

      <svg
        aria-label="Shopping cart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
        ></path>
      </svg>
    </div>
  );
}

const productQuantityCounter = (cart: LocalStorageCart) =>
  Object.values(cart).reduce(
    (productAcc, { sizes }) =>
      productAcc + Object.values(sizes).reduce((sizeAcc, { quantity }) => sizeAcc + quantity, 0),
    0,
  );
