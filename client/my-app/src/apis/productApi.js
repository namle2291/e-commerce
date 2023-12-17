import { httpRequest } from '../axios/custom-axios';

export const getProductCategory = (params) =>
   httpRequest({
      url: '/products',
      method: 'get',
      params,
   });
export const getProducts = (params) =>
   httpRequest({
      url: '/products',
      method: 'get',
      params,
   });

export const getHighPriceProduct = (params) =>
   httpRequest({
      url: '/products',
      method: 'get',
      params,
   });
export const raitingProduct = (payload) =>
   httpRequest({
      url: '/products/raiting',
      method: 'put',
      data: payload,
   });
