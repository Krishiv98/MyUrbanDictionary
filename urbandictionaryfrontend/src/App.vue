<template>
  <div id="app">
    <!--    Add a ProfileButton here -->
    <header>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <router-link to="/" class="navbar-brand d-flex align-items-center p-2">
            <b-icon icon="book-half" >
            </b-icon>
            <strong>Urban Dictionary</strong>
          </router-link>
          <button class="navbar-toggler" type="button">
            <p class="h3 mb-2" >
              <b-icon icon="person-circle" ></b-icon>
            </p>
          </button>

        </div>
      </div>
    </header>
    <div>
      <router-view class="container-xl" v-b-scrollspy/>
      <ParticlesBg type="cobweb" :bg="true" />
    </div>

  </div>
</template>
<script>

import { ParticlesBg } from 'particles-bg-vue';

export default {
  name: 'App',
  components: {
    ParticlesBg,
  },
};
</script>
<style>

</style>
