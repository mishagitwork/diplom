<template>
  <div :class="$style.container">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/section/Header'
import { mapMutations } from 'vuex'
export default {
  components: {
    Header,
  },
  mounted() {
    this.$store.dispatch('auth/initial')
    this.setIsMobile({ isMobile: window.innerWidth < 700 })
    window.onresize = (event) => {
      this.windowWidth = window.innerWidth
      this.setIsMobile({ isMobile: this.windowWidth < 700 })
    }
  },
  data() {
    return {
      windowWidth: 0,
    }
  },
  methods: {
    ...mapMutations({
      setIsMobile: 'layout/setIsMobile',
    }),
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
