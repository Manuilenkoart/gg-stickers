'use client';

import { LOCAL_STORAGE_KEY } from 'app/lib/constants';
import { Product, ProductSize, CartSizeMap, LocalStorageCart } from 'app/lib/definitions';
import { useLocalStorage, adaptLocalStorageCartToCartMap, adaptCartMapToLocalStorageCart } from 'app/lib/utils';
import { Button, Select } from 'app/ui/components';
import { useMemo, useState } from 'react';

import S from './productDetailsForm.module.scss';

interface ProductDetailsFormProps {
  product: Product;
}

export default function ProductDetailsForm({ product }: ProductDetailsFormProps) {
  const { getLS, setLS } = useLocalStorage();

  const [userChoice, setUserChoice] = useState<{ quantity: number; sizeId: ProductSize['id'] }>(() => {
    const sizeId = product.size.length ? product.size[1].id : '';

    return { quantity: 1, sizeId };
  });

  const sizeOptions = useMemo(() => product.size.map(({ id, name }) => ({ label: name, value: id })), [product.size]);

  const handleChangeQuantity = (quantity: string) => {
    setUserChoice((prev) => ({
      ...prev,
      quantity: quantity.trim() ? Math.floor(Number(quantity)) : 0,
    }));
  };

  const handleChangeSize = (sizeId: ProductSize['id']) => {
    setUserChoice((prev) => ({ ...prev, sizeId }));
  };

  const handleClickAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localStorageCart = getLS<LocalStorageCart>(LOCAL_STORAGE_KEY.cart);
    const cartMap = adaptLocalStorageCartToCartMap(localStorageCart);

    const { description: _description, price: _price, size: _size, ...restProductFields } = product;

    const selectedSize = product.size.find(({ id }) => id === userChoice.sizeId);
    if (!selectedSize) {
      console.error('The selected size was not found');
      return;
    }

    const productInCart = cartMap.get(product.id);
    const cartSizeMap: CartSizeMap = productInCart ? new Map(productInCart.sizes) : new Map();

    const productSizeInCart = cartSizeMap.get(userChoice.sizeId);
    const updatedQuantity = productSizeInCart ? productSizeInCart.quantity + userChoice.quantity : userChoice.quantity;

    cartSizeMap.set(userChoice.sizeId, {
      ...selectedSize,
      quantity: updatedQuantity,
    });

    cartMap.set(product.id, { ...restProductFields, sizes: cartSizeMap });

    const updatedLocalStorageCart = adaptCartMapToLocalStorageCart(cartMap);
    setLS(LOCAL_STORAGE_KEY.cart, updatedLocalStorageCart);
  };

  return (
    <form
      className={S.container}
      onSubmit={handleClickAddToCart}
    >
      <div className={S.quantity}>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          inputMode="numeric"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          value={userChoice.quantity}
          onChange={(e) => handleChangeQuantity(e.target.value)}
        />
      </div>

      <div className={S.size}>
        <Select
          name="sizeId"
          label="Size"
          defaultValue={userChoice.sizeId}
          options={sizeOptions}
          onChange={handleChangeSize}
        />
      </div>

      <div>
        <Button type="submit">Add to cart</Button>
      </div>
    </form>
  );
}
