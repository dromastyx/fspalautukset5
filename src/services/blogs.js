import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const delObject = async (delObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  await axios.delete(`${baseUrl}/${delObject.id}`, config, delObject)
}


export default { getAll, create, update, delObject }