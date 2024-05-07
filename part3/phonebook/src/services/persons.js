import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (findPerDel) => {
  const request = axios.delete(`${baseUrl}/${findPerDel.id.toString()}`)
   return request.then((response) => response.data)
    
};

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then( response => {
    return response.data
  })
}

export default {
  getAll,
  create,
  remove,
  update
};
