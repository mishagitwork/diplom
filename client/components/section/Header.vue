<template>
  <div :class="$style.container">
    <div v-if="!isSingInPage" :class="$style.header">
      <a-icon type="menu" @click="showDrawer" />

      <a-icon type="logout" @click="logout" />
    </div>
    <a-drawer
      title="Меню"
      :placement="placement"
      :closable="true"
      :visible="visible"
      :width="isMobile ? `100%` : `30%`"
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
        <a-menu-item v-if="studentId" @click="onClose">
          <nuxt-link to="/personal">
            <a-icon type="qrcode" />
            <span>Личный QR</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item v-if="studentId" @click="onClose">
          <nuxt-link :to="`/analytics/student/` + studentId">
            <a-icon type="pie-chart" />
            <span>Аналитика</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item v-if="studentId" @click="onClose">
          <nuxt-link :to="`/analytics/attendance/` + studentId">
            <a-icon type="file" />
            <span>Список занятий</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item v-if="isMonitor" @click="onClose">
          <nuxt-link to="/analytics/group">
            <a-icon type="bar-chart" />
            <span>О группе</span>
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
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      placement: 'left',
      menu: [
        { icon: 'desktop', text: 'Главная', route: '/' },
        { icon: 'scan', text: 'Считать QR', route: '/scaner' },
      ],
      adminMenu: [
        { icon: 'bank', text: 'Факультеты', route: '/faculty' },
        { icon: 'team', text: 'Группы', route: '/groups' },
        { icon: 'smile', text: 'Студенты', route: '/students' },
        { icon: 'solution', text: 'Преподаватели', route: '/professors' },
        { icon: 'read', text: 'Предметы', route: '/subjects' },
        { icon: 'file-add', text: 'Занятия', route: '/class' },
      ],
      professorMenu: [
        { icon: 'file-add', text: 'Занятия', route: '/professors/class' },
      ],
    }
  },
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
      universityId: (state) => state.user.universityId,
      professorId: (state) => state.user.professorId,
      studentId: (state) => state.user.studentId,
      isMobile: (state) => state.layout.isMobile,
      isMonitor: (state) => state.user.isMonitor,
    }),

    isSingInPage() {
      return this.$route.name === 'singin'
    },
  },

  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
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
  background: white;
  z-index: 1000;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: white;
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
}
</style>
