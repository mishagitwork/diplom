<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о занятиях</div>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="classesList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="$router.push(`/analitics/class/${item.id}`)"
            >Список занятий
          </a>
          <a slot="actions">
            <a-popover v-model="item.start" trigger="click">
              <a slot="content" @click="startClassAll(item)">Для всех</a>
              <div slot="content" class="empty"></div>
              <a slot="content" @click="openStartClassDrawer(item)"
                >Для некоторых</a
              >
              Начать
            </a-popover></a
          >
          <a-list-item-meta :description="item.professor.user.fullName">
            <span slot="title">
              {{ item.subject.fullName + ' ' }}<b>{{ item.group.shortName }}</b>
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      title="Создать занятия для определенных студентов"
      :width="isMobile ? '100%' : '40%'"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-checkbox-group v-model="studentsList" :options="students" />
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="resetForm">
          Cancel
        </a-button>
        <a-button
          :disabled="!studentsList.length"
          type="primary"
          @click="startClass"
        >
          Submit
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import delivery from '@/delivery'
import { mapState } from 'vuex'
export default {
  asyncData({ store }) {
    return Promise.all([
      delivery.ClassAction.getList({
        professorId: store.state.user.professorId,
      }),
    ])
      .then((res) => {
        return {
          classesList: res[0].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      isOpen: false,

      students: [],
      studentsList: [],
      classesList: [],
      selectedClassId: null,
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.layout.isMobile,
    }),
  },

  methods: {
    async openStartClassDrawer(item) {
      const students = await delivery.StudentAction.getList({
        groupId: item.groupId,
      })
      this.selectedClassId = item.id
      this.students = students.data.map((item) => {
        return { label: item.user.fullName, value: item.id }
      })
      item.start = false
      this.isOpen = true
    },

    resetForm() {
      this.selectedClassId = null
      this.studentsList = []
      this.isOpen = false
    },

    async startClassAll(data) {
      const res = await delivery.AttendanceAction.create({ classId: data.id })
      data.start = false
    },
    async startClass(item) {
      const res = await delivery.AttendanceAction.create({
        classId: this.selectedClassId,
        students: this.studentsList,
      })
      this.isOpen = false
    },
  },
}
</script>

<style module lang="scss">
@import '/assets/styles/breakpoints.scss';
.container {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3rem;
    @include tablet {
      padding: 0 1rem;
    }
  }
}
</style>
