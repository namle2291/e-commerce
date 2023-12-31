import { httpRequest } from '../axios/custom-axios';

const getUsers = async (params) => {
   const response = await httpRequest.get('/users', { params });
   return response;
};

const updateUser = async (id, payload) => {
   const response = await httpRequest({
      url: '/users/' + id,
      method: 'put',
      data: payload,
   });
   return response;
};

const updateCurrentUser = async (payload) => {
   const response = await httpRequest({
      url: '/users/current',
      method: 'put',
      data: payload,
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   });
   return response;
};

const updateCart = async (payload) => {
   const response = await httpRequest({
      url: '/users/cart',
      method: 'put',
      data: payload,
   });
   return response;
};

const updateCurrentCart = async (payload) => {
   const response = await httpRequest({
      url: '/users/cart/update',
      method: 'put',
      data: payload,
   });
   return response;
};

const removeCartItem = async (payload) => {
   const response = await httpRequest({
      url: '/users/cart/remove',
      method: 'put',
      data: payload,
   });
   return response;
};
const deleteUser = async (id) => {
   const response = await httpRequest({
      url: '/users/' + id,
      method: 'delete',
   });
   return response;
};

const addToWishList = async (payload) => {
   const response = await httpRequest({
      url: '/users/wishlist',
      method: 'put',
      data: payload,
   });
   return response;
};

export {
   getUsers,
   updateUser,
   deleteUser,
   updateCart,
   removeCartItem,
   updateCurrentCart,
   updateCurrentUser,
   addToWishList
};
