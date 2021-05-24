<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о занятиях</div>
      <a-select
        show-search
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="selectFacultyId"
        style="width: 100px"
        @change="getGroups"
      >
        <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
          {{ f.shortName }}
        </a-select-option>
      </a-select>
      <a-select
        show-search
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="selectGroupId"
        style="width: 100px"
        @change="getClasses"
      >
        <a-select-option v-for="g in groupsList" :key="g.id" :value="g.id">
          {{ g.shortName }}
        </a-select-option>
      </a-select>
      <a-button type="primary" @click="openStudentDrawer"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="classesList"
        style="padding: 0.5rem 3rem"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">редактировать </a>
          <a slot="actions"> удалить</a>
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
    <a-drawer
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
    </a-drawer>
  </div>
</template>

<script>
import delivery from '@/delivery'
export default {
  asyncData({ store }) {
    return Promise.all([
      delivery.FacultyAction.getList({
        universityId: store.state.user.universityId,
      }),
    ])
      .then((res) => {
        return Promise.all([
          res[0],
          delivery.GroupAction.getList({
            facultyId: res[0].data[0].id,
          }),
        ])
      })
      .then((res) => {
        return Promise.all([
          res[0],
          res[1],
          delivery.ClassAction.getList({
            groupId: res[1].data[0].id,
          }),
          delivery.SubjectAction.getList({
            universityId: store.state.user.universityId,
          }),
          delivery.ProfessorAction.getListByUniversity({
            universityId: store.state.user.universityId,
          }),
        ])
      })

      .then((res) => {
        console.log(res[0].data[0])
        return {
          selectFacultyId: res[0].data[0].id,
          facultyList: res[0].data,
          groupsList: res[1].data,
          selectGroupId: res[1].data[0].id,
          classesList: res[2].data,
          subjectsList: res[3].data,
          professorsList: res[4].data,
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
