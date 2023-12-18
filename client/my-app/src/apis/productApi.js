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

export const createProduct = (payload) =>
   httpRequest({
      url: '/products',
      method: 'post',
      data: payload,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
   
export const updateImagesProduct = (id,payload) =>
   httpRequest({
      url: '/products/' + id + '/upload-image',
      method: 'put',
      data: payload,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
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
