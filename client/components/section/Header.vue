<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <a-icon type="menu" @click="showDrawer" />

      <div class="logo">Logo</div>
      <div class="back">-</div>
    </div>
    <a-drawer
      title="Меню"
      :placement="placement"
      :closable="true"
      :visible="visible"
      :width="500"
      :bodyStyle="{ padding: 0 }"
      @close="onClose"
    >
      <a-menu mode="inline">
        <a-menu-item v-for="(m, i) in menu" :key="i" @click="onClose">
          <a :href="m.route">
            <a-icon :type="m.icon" />
            <span>{{ m.text }}</span>
          </a>
        </a-menu-item>
        <a-menu-item v-if="isAdmin" @click="onClose">
          <a href="/university">
            <a-icon type="bank" />
            <span>Университеты</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      placement: 'left',
      menu: [
        { icon: 'desktop', text: 'Главная', route: '/' },
        { icon: 'pie-chart', text: 'Личный QR', route: '/coder' },
        { icon: 'pie-chart', text: 'Считать QR', route: '/scaner' },
        { icon: 'pie-chart', text: 'Аналитика', route: '/analitics' },
      ],
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.user.isAdmin
    },
  },

  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onChange(e) {
      this.placement = e.target.value
    },
  },
}
</script>

<style module lang="scss">
.container {
  position: sticky;
  top: 0;
  width: 100%;
  height: 5rem;
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
