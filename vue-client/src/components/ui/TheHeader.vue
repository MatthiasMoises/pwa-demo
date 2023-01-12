<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-btn href="/" text>
        PWA Demo
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn href="/" text>
      Home
    </v-btn>

    <v-btn v-if="currentRouteName !== 'home'" href="/register" text>
      Register
    </v-btn>

    <v-btn v-if="currentRouteName !== 'home'" href="/login" text>
      Login
    </v-btn>

    <v-btn v-if="currentRouteName === 'home'" text @click="logoutUser">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'TheHeader',
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    async logoutUser () {
      const response = await AuthService.logout()
      if (response.status === 200) {
        sessionStorage.removeItem('userData')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
