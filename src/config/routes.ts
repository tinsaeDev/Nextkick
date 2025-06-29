export const routes = {
  home: '/',
  product: {
    list: '/product',
    create: '/product/new',
    view: (id: number | string) => `/product/${id}`
  },
  employee: {
    list: '/employee',
    create: '/employee/new'
  }
};
