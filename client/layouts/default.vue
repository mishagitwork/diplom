<template>
  <div :class="$style.container">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/section/Header'
export default {
  components: {
    Header,
  },
}
</script>

<style lang="scss" module>
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
