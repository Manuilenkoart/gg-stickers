'use client';

import { LOCAL_STORAGE_KEY } from 'app/lib/constants';
import { LocalStorageCart } from 'app/lib/definitions';
import ROUTE_PATH from 'app/lib/ROUTE_PATH';
import { LocalStorage } from 'app/lib/utils';
import { Button } from 'app/ui/components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import S from './cartDetails.module.scss';

export default function CartDetails() {
  const [cart, setCart] = useState<LocalStorageCart | null>(null);

  useEffect(() => {
    const localStorageCart = LocalStorage().get<LocalStorageCart>(LOCAL_STORAGE_KEY.cart);
    if (!!localStorageCart) {
      setCart(() => localStorageCart);
    }
  }, []);

  return (
    <section className={S.section}>
      {!!cart ? (
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
            {Object.values(cart).map((product) =>
              Object.values(product.size).map((size) => (
                <tr key={`${product.id}-${size.id}`}>
                  <th>{`${product.name}, ${size.name}`}</th>
                  <td>{size.quantity}</td>
                  <td>{size.price.value}</td>
                  <td>
                    <RemoveButton />
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
    </section>
  );
}

function RemoveButton() {
  return (
    <button className={S.removeButton}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  );
}
