<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о занятиях</div>

      <!-- <a-button type="primary" @click="openStudentDrawer"> Создать </a-button> -->
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="classesList"
        style="padding: 0.5rem 3rem"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">Список занятий </a>
          <a slot="actions">
            <a-popover v-model="item.start" trigger="click">
              <a slot="content" @click="startClass(item.id)">Для всех</a>
              <div slot="content" class="empty"></div>
              <a slot="content" @click="item.start = false">Для некоторых</a>
              Начать
            </a-popover></a
          >
          <a-list-item-meta :description="item.professor.user.fullName">
            <span slot="title">
              {{ item.subject.fullName + ' ' }}<b>{{ item.group.shortName }}</b>
            </span>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <!-- <a-drawer
      title="Создать нового студента"
      :width="450"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="groupId"
          label="Группа студентов"
          prop="groupId"
        >
          <a-select v-model="form.groupId">
            <a-select-option v-for="g in groupsList" :key="g.id" :value="g.id">
              {{ g.fullName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          ref="professorId"
          label="Преподаватель"
          prop="professorId"
        >
          <a-select v-model="form.professorId">
            <a-select-option
              v-for="p in professorsList"
              :key="p.id"
              :value="p.id"
            >
              {{ p.user.fullName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="subjectId" label="Предмет" prop="subjectId">
          <a-select v-model="form.subjectId">
            <a-select-option
              v-for="s in subjectsList"
              :key="s.id"
              :value="s.id"
            >
              {{ s.fullName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
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
        <a-button type="primary" @click="onSubmit"> Submit </a-button>
      </div>
    </a-drawer> -->
  </div>
</template>

<script>
import delivery from '@/delivery'
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
      form: { fullName: '', facultyId: '', groupId: '', user: {} },
      selectFacultyId: '',
      selectGroupId: '',
      facultyList: [],
      groupsList: [],
      studentsList: [],
      classesList: [],
      subjectsList: [],
      professorsList: [],
      rules: {},
      start: false,
    }
  },
  computed: {
    isMobile() {
      if (process.client) {
        return window.innerWidth < 700
      }
    },
    universityId() {
      return this.$store.state.user.universityId
    },
  },

  methods: {
    disabledDate(current) {
      return current && current > this.$moment().endOf('day')
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    openStudentDrawer() {
      this.form.facultyId = this.selectFacultyId
      this.form.groupId = this.selectGroupId
      this.isOpen = true
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await delivery.ClassAction.create(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async getGroups(value) {
      const res = await delivery.GroupAction.getList({ facultyId: value })
      this.groupsList = res.data
      this.selectGroupId = this.groupsList[0] ? this.groupsList[0].id : ''
      this.getClasses(this.selectGroupId)
    },
    async getClasses(value) {
      const res = await delivery.ClassAction.getList({ groupId: value })
      this.classesList = res.data
    },
    async startClass(value) {
      const res = await delivery.ClassAction.start({ classId: value })
      // this.classesList = res.data
      console.log(res.data)
    },
  },
}
</script>

<style module lang="scss">
.container {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3rem;
  }
}
</style>
