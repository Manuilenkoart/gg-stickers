'use client';

import { LOCAL_STORAGE_KEY } from '@/lib/constants';
import { LocalStorageCart } from '@/lib/definitions';
import { useLocalStorage } from '@/lib/utils';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import S from './cartIconCounter.module.scss';

function CartIconCounter() {
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
    <span>
      {cartCount ? (
        <span className={clsx(cartCount <= 9 ? S.cartCountShort : S.cartCountLong)}>{cartCount}</span>
      ) : null}
    </span>
  );
}

export default memo(CartIconCounter);

const productQuantityCounter = (cart: LocalStorageCart) =>
  Object.values(cart).reduce(
    (productAcc, { sizes }) =>
      productAcc + Object.values(sizes).reduce((sizeAcc, { quantity }) => sizeAcc + quantity, 0),
    0,
  );
