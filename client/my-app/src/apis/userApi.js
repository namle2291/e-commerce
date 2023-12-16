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
const deleteUser = async (id) => {
   const response = await httpRequest({
      url: '/users/' + id,
      method: 'delete',
   });
   return response;
};

export { getUsers, updateUser, deleteUser };
