import { httpRequest } from '../axios/custom-axios';

export const getCategories = (params) =>
   httpRequest({
      url: '/categories',
      method: 'get',
      params,
   });

export const createCategory = (payload) =>
   httpRequest({
      url: `/categories${payload.id ? '/' + payload.id : ''}`,
      method: payload.isUpdate ? 'put' : 'post',
      data: payload.formData,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });

export const deleteCategory = (id) =>
   httpRequest({
      url: '/categories/' + id,
      method: 'delete',
   });
