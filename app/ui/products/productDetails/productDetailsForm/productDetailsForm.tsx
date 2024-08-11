'use client';

import { LOCAL_STORAGE_KEY } from 'app/lib/constants';
import { Product, ProductCart, ProductSize, LocalStorageCart } from 'app/lib/definitions';
import { LocalStorage } from 'app/lib/utils';
import { Button, Select } from 'app/ui/components';
import { useMemo, useState } from 'react';

import S from './productDetailsForm.module.scss';

interface ProductDetailsFormProps {
  product: Product;
}

export default function ProductDetailsForm({ product }: ProductDetailsFormProps) {
  const [cart, setCart] = useState<{ quantity: number; sizeId: ProductSize['id'] }>(() => {
    const sizeId = product.size.length ? product.size[1].id : '';

    return { quantity: 1, sizeId };
  });

  const sizeOptions = useMemo(() => product.size.map(({ id, name }) => ({ label: name, value: id })), [product.size]);

  const handleChangeQuantity = (quantity: string) => {
    setCart((prev) => ({
      ...prev,
      quantity: quantity.trim() ? Math.floor(Number(quantity)) : 0,
    }));
  };

  const handleChangeSize = (sizeId: ProductSize['id']) => {
    setCart((prev) => ({ ...prev, sizeId }));
  };

  const handleClickAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { description: _description, price: _price, ...restProductFields } = product;

    const productsInCart = LocalStorage().get<LocalStorageCart>(LOCAL_STORAGE_KEY.cart) ?? {};
    const hasProductInCart = !!productsInCart[product.id];

    const selectedSize = product.size.find(({ id }) => id === cart.sizeId);
    if (!selectedSize) {
      console.error('The selected size was not found');
      return;
    }

    const newSize = {
      [cart.sizeId]: {
        ...selectedSize,
        quantity: cart.quantity,
      },
    };
    const updateLocalStorageCart = (product: ProductCart) => {
      LocalStorage().set(LOCAL_STORAGE_KEY.cart, { ...productsInCart, [restProductFields.id]: product });
    };

    if (!hasProductInCart) {
      const newProduct = { ...restProductFields, size: newSize };
      return updateLocalStorageCart(newProduct);
    }

    const productInCard = productsInCart[product.id];

    const hasProductSize = !!productInCard.size[cart.sizeId];

    if (hasProductSize) {
      const sizeToUpdate = productInCard.size[cart.sizeId];
      const newQuantity = cart.quantity + sizeToUpdate.quantity;

      const newSize = {
        [cart.sizeId]: {
          ...sizeToUpdate,
          quantity: newQuantity,
        },
      };

      const updatedProduct = { ...productInCard, size: { ...productInCard.size, ...newSize } };
      return updateLocalStorageCart(updatedProduct);
    } else {
      const updatedProduct = { ...productInCard, size: { ...productInCard.size, ...newSize } };
      return updateLocalStorageCart(updatedProduct);
    }
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
          value={cart.quantity}
          onChange={(e) => handleChangeQuantity(e.target.value)}
        />
      </div>

      <div className={S.size}>
        <Select
          name="sizeId"
          label="Size"
          defaultValue={cart.sizeId}
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
