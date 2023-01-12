<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-alert v-if="error" type="error">
              {{ errorMsg }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>PWA Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field id="email" v-model="loginData.email" prepend-icon="mdi-mail" name="login" label="Login"
                    type="text" :rules="[rules.required]"></v-text-field>
                  <v-text-field id="password" v-model="loginData.password" prepend-icon="mdi-lock" name="password"
                    label="Password" :rules="[rules.required]" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthService from '@/services/AuthService'
import { validationRules } from '@/helpers/ValidationRules'

export default {
  name: 'LoginView',
  data () {
    return {
      error: false,
      errorMsg: '',
      loginData: {
        email: '',
        password: ''
      },
      rules: validationRules
    }
  },
  methods: {
    async handleSubmit () {
      this.error = false
      this.errorMsg = ''

      if (this.loginData.email && this.loginData.password) {
        const response = await AuthService.login(this.loginData)
        if (response.status === 200) {
          const userData = {
            id: response.data.user.id,
            email: response.data.user.email,
            token: response.data.token
          }

          sessionStorage.setItem('userData', JSON.stringify(userData))
          this.$router.push('/')
        } else {
          this.error = true
          this.errorMsg = 'An error occured!'
        }
      } else {
        this.error = true
        this.errorMsg = 'Please fill out all the fields!'
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
