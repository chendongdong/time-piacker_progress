<template>
  <div class="home">
    <v-progress :gearNum="7" :selectGear="3" style="margin: 30px"></v-progress>
  </div>
</template>

<script>
  // @ is an alias to /src
  import VProgress from '@/components/Progress.vue'

  export default {
    name: 'home',
    components: {
      VProgress
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
