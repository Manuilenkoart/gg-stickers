const ROUTE_PATH = {
  HOME: '/',
  PRODUCTS: {
    INDEX: '/products',
    DETAILS: (productId: string | number) => `/products/${productId}`,
  },
  CART: {
    INDEX: '/cart',
  },
  ABOUT: {
    INDEX: '/about',
  },
};

export default ROUTE_PATH;
