import { axiosClient } from '@/services/Api'

const authEndpoint = 'auth'

export default {

  async register (user) {
    const response = await axiosClient.post(`${authEndpoint}/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
      repeatPassword: user.repeatPassword
    }, {
      handlerEnabled: false
    })
    return response
  },

  async login (user) {
    const response = await axiosClient.post(`${authEndpoint}/login`, {
      email: user.email,
      password: user.password
    }, {
      handlerEnabled: false
    })
    return response
  },

  async logout () {
    const response = await axiosClient.post(`${authEndpoint}/logout`)
    return response
  }
}
