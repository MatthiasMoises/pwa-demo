/* eslint-disable */

import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Handler config
const isHandlerEnabled = (config = { handlerEnabled: true }) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
    false : true
}

// Request Handlers
const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    const userData = sessionStorage.getItem('userData')
    const token = JSON.parse(userData).token
    if (userData && token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }
  }
  return request
}

// Response Handlers
const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    if (error.response.status === 400) {
      return Promise.reject(error)
    }
  }
  return Promise.reject({ error })
}

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response
}

// USe Request Handlers
axiosClient.interceptors.request.use(
  request => requestHandler(request)
)

// Use Response Handlers
axiosClient.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)
