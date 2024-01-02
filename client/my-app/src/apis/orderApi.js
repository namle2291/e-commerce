import { httpRequest } from '../axios/custom-axios';

export const createOrder = (payload) =>
  httpRequest({ url: '/orders', method: 'post', data: payload });
