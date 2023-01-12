<template>
  <v-app>
    <v-main>
      <v-container>
        <v-layout align-center justify-center>
          <ButtonGrid />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ButtonGrid from '../components/ButtonGrid'

export default {
  name: 'HomeView',
  components: {
    ButtonGrid,
  },
}
</script>
