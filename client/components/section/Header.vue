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
          <nuxt-link :to="m.route">
            <a-icon :type="m.icon" />
            <span>{{ m.text }}</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item v-if="isAdmin" @click="onClose">
          <nuxt-link to="/university">
            <a-icon type="bank" />
            <span>Университеты</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item
          v-for="a in adminMenu"
          v-show="universityId"
          :key="a.route"
          @click="onClose"
        >
          <nuxt-link :to="a.route">
            <a-icon :type="a.icon" />
            <span>{{ a.text }}</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item
          v-for="a in professorMenu"
          v-show="professorId"
          :key="a.route"
          @click="onClose"
        >
          <nuxt-link :to="a.route">
            <a-icon :type="a.icon" />
            <span>{{ a.text }}</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      adminMenu: [
        { icon: 'bank', text: 'Факультеты', route: '/faculty' },
        { icon: 'bank', text: 'Группы', route: '/groups' },
        { icon: 'bank', text: 'Преподаватели', route: '/professors' },
        { icon: 'bank', text: 'Предметы', route: '/subjects' },
        { icon: 'bank', text: 'Занятия', route: '/class' },
      ],
      professorMenu: [
        { icon: 'bank', text: 'Занятия', route: '/professors/class' },
      ],
    }
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
      universityId: (state) => state.user.universityId,
      professorId: (state) => state.user.professorId,
      studentId: (state) => state.user.studentId,
    }),
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
