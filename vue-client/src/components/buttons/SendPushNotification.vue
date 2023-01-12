<template>
  <div class="text-center">
    <v-btn rounded color="primary" dark @click="sendNotification">
      Send Push Notification
    </v-btn>
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService';

export default {
  name: 'SendPushNotification',
  methods: {
    async sendNotification () {
      const userData = sessionStorage.getItem('userData')
      const userId = JSON.parse(userData).id
      await NotificationService.triggerNotification(userId)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
