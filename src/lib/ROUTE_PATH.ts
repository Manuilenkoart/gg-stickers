const ROUTE_PATH = {
  ABOUT: {
    INDEX: '/about',
  },
  CART: {
    INDEX: '/cart',
  },
  HOME: '/',
  PRODUCTS: {
    DETAILS: (productId: string | number) => `/products/${productId}`,
    INDEX: '/products',
  },
};

export default ROUTE_PATH;
