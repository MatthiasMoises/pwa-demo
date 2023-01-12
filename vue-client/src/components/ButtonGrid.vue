<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <SubscribeToPush />
      </v-col>
      <v-col cols="6">
        <SendPushNotification />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <UnsubscribeFromPush />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SubscribeToPush from '@/components/buttons/SubscribeToPush.vue'
import UnsubscribeFromPush from '@/components/buttons/UnsubscribeFromPush.vue';
import SendPushNotification from '@/components/buttons/SendPushNotification.vue';

export default {
  name: 'ButtonGrid',
  components: {
    SubscribeToPush,
    UnsubscribeFromPush,
    SendPushNotification
  }
}
</script>
