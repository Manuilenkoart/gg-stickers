import { CartMap, ProductCart, LocalStorageCart } from '../definitions';

export const adaptCartMapToLocalStorageCart = (cartMap: CartMap): LocalStorageCart => {
  const localStorageCart = Array.from(cartMap).reduce((acc, [productId, product]) => {
    acc[productId] = {
      ...product,
      sizes: Array.from(product.sizes).reduce(
        (sizeAcc, [sizeKey, sizeValue]) => {
          sizeAcc[sizeKey] = sizeValue;
          return sizeAcc;
        },
        {} as ProductCart['sizes'],
      ),
    };
    return acc;
  }, {} as LocalStorageCart);

  return localStorageCart;
};

export const adaptLocalStorageCartToCartMap = (localStorageCart: LocalStorageCart | null): CartMap => {
  const cartMap: CartMap = new Map();

  if (!localStorageCart) return cartMap;

  Object.entries(localStorageCart).forEach(([productKey, productValues]) => {
    const cartSizeMap = new Map(Object.entries(productValues.sizes));

    cartMap.set(productKey, { ...productValues, sizes: cartSizeMap });
  });

  return cartMap;
};
