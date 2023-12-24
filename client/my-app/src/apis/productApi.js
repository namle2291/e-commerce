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

export const getProductDetail = (id) =>
   httpRequest({
      url: '/products/' + id,
      method: 'get',
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
export const createProductVariant = (payload) =>
   httpRequest({
      url: '/products/variant',
      method: 'put',
      data: payload,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });

export const updateProduct = (id, payload) =>
   httpRequest({
      url: '/products/' + id,
      method: 'put',
      data: payload,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });

export const deleteProduct = (id) =>
   httpRequest({
      url: '/products/' + id,
      method: 'delete',
   });
export const destroyProduct = (id) =>
   httpRequest({
      url: '/products/' + id + '/destroy',
      method: 'delete',
   });

export const restoreProduct = (id) =>
   httpRequest({
      url: '/products/' + id + '/restore',
      method: 'get',
   });

export const getProductDeleted = () =>
   httpRequest({
      url: '/products/recycle-bin',
      method: 'get',
   });

export const updateImagesProduct = (id, payload) =>
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
