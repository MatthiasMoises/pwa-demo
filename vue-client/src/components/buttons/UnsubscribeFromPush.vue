<template>
  <div class="text-center">
    <v-btn rounded color="primary" dark @click="unsubscribeFromPushService">
      Unsubscribe from Push Service
    </v-btn>
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService';

export default {
  name: 'UnsubscribeFromPush',
  methods: {
    async unsubscribeFromPushService () {
      const currentUser = JSON.parse(sessionStorage.getItem('userData'))
      const response = await NotificationService.unsubscribeUserById(currentUser.id)
      if (response.status === 200) {
        alert('Successfully unsubscribed!')
      } else {
        alert('An error occurred!')
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
