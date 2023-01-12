import { axiosClient } from '@/services/Api'

const notificationEndpoint = 'notification'

export default {

  async getSubscriptionsByUserId (userId, endpoint) {
    const response = await axiosClient.post(notificationEndpoint + '/user/' + userId + '/get-subscriptions', {
      endpoint: endpoint
    })
    return response
  },

  async subscribe (sub) {
    const response = await axiosClient.post(notificationEndpoint + '/subscribe', sub)
    return response
  },

  // Insert in subscriptions table
  async subscribeUserById (userId, sub) {
    const response = await axiosClient.post(notificationEndpoint + '/user/' + userId + '/subscribe', sub)
    return response
  },

  async triggerNotification (userId) {
    const response = await axiosClient.post(notificationEndpoint + '/user/' + userId + '/send-notification', {})
    return response
  },

  async unsubscribeUserById (userId) {
    const response = await axiosClient.delete(notificationEndpoint + '/user/' + userId + '/unsubscribe')
    return response
  }

}
