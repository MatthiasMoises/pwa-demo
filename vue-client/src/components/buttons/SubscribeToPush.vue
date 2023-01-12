<template>
  <div class="text-center">
    <v-btn rounded color="primary" dark @click="subscribeUserToPushService">
      Subscribe to Push Service
    </v-btn>
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService'
import { urlBase64ToUint8Array } from '@/helpers/PushEncoding'

export default {
  name: 'SubscribeToPush',
  methods: {
    async subscribeUserToPushService () {
      const currentUser = JSON.parse(sessionStorage.getItem('userData'))
      const register = await navigator.serviceWorker.register(`${process.env.BASE_URL}service-worker.js`)
      const alreadySubscribed = await register.pushManager.getSubscription()
      if (!alreadySubscribed) {
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.VUE_APP_PUBLIC_VAPID_KEY)
        })
        await NotificationService.subscribeUserById(currentUser.id, subscription)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
