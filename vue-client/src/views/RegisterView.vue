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
                <v-toolbar-title>PWA Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field id="name" v-model="registerData.name" prepend-icon="mdi-account" name="name"
                    label="Name" type="text" :rules="[rules.required]"></v-text-field>
                  <v-text-field id="email" v-model="registerData.email" prepend-icon="mdi-mail" name="login"
                    label="E-Mail" type="text" :rules="[rules.required]"></v-text-field>
                  <v-text-field id="password" v-model="registerData.password" prepend-icon="mdi-lock" name="password"
                    label="Password" type="password" :rules="[rules.required]"></v-text-field>
                  <v-text-field id="password-repeat" v-model="registerData.repeatPassword" prepend-icon="mdi-lock"
                    name="password-repeat" label="Repeat Password" type="password"
                    :rules="[rules.required]"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit">
                  Register
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
  name: 'RegisterView',
  data () {
    return {
      error: false,
      errorMsg: '',
      registerData: {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
      },
      rules: validationRules
    }
  },
  methods: {
    async handleSubmit () {
      this.error = false
      this.errorMsg = ''

      if (this.registerData.email && this.registerData.password && this.registerData.repeatPassword) {
        if (this.registerData.password === this.registerData.repeatPassword) {
          const response = await AuthService.register(this.registerData)
          if (response.status === 201) {
            alert('Success!')
            this.$router.push('/login')
          } else {
            this.error = true
            this.errorMsg = 'An error occured!'
          }
        } else {
          this.error = true
          this.errorMsg = 'Passwords do not match!'
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
