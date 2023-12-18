import { httpRequest } from '../axios/custom-axios';

export const geCategories = (params) =>
   httpRequest({
      url: '/categories',
      method: 'get',
      params,
});
