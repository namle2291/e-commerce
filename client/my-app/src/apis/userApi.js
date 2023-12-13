import { httpRequest } from '../axios/custom-axios'

const getUsers = async (params) => {
  const response = await httpRequest.get('/users', { params })
  return response
}

export { getUsers }
