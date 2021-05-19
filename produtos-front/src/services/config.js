import axios from 'axios'

export const http = axios.create({
  // baseURL:'https://localhost:8080/api/'
  baseURL:'https://produtos-apirest.herokuapp.com/api/produtos'
})
