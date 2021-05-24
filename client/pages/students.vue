<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о студентах</div>
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
        @change="getStudents"
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
        :data-source="studentsList"
        style="padding: 0.5rem 3rem"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">редактировать </a>
          <a slot="actions"> удалить</a>
          <a-list-item-meta :description="item.user.fullName">
            <span slot="title">
              {{ item.studentCardId }}
              <span v-if="item.isMonitor">Староста</span>
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
        <a-form-model-item ref="fullName" label="ФИО студента" prop="fullName">
          <a-input
            v-model="form.user.fullName"
            @blur="
              () => {
                $refs.fullName.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item
          ref="studentCardId"
          label="Номер студенческого билета"
          prop="studentCardId"
        >
          <a-input
            v-model="form.studentCardId"
            @blur="
              () => {
                $refs.studentCardId.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item
          ref="facultyId"
          label="Факультет и группа студента"
          prop="facultyId"
        >
          <a-select
            disabled
            option-filter-prop="children"
            :filter-option="filterOption"
            v-model="form.facultyId"
          >
            <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
              {{ f.fullName }}
            </a-select-option>
          </a-select>

          <a-select disabled v-model="form.groupId">
            <a-select-option v-for="g in groupsList" :key="g.id" :value="g.id">
              {{ g.fullName }}
            </a-select-option>
          </a-select>
          <a-checkbox v-model="form.isMonitor">Староста группы</a-checkbox>
        </a-form-model-item>
        <a-form-model-item ref="birthday" label="День рождения" prop="birthday">
          <a-date-picker
            v-model="form.user.birthday"
            format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :show-time="{ defaultValue: $moment('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-model-item>
        <a-form-model-item ref="login" label="Логин" prop="login">
          <a-input
            v-model="form.user.login"
            @blur="
              () => {
                $refs.login.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="password" label="Пароль" prop="password">
          <a-input
            v-model="form.user.password"
            @blur="
              () => {
                $refs.password.onFieldBlur()
              }
            "
          />
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
          delivery.StudentAction.getList({
            groupId: res[1].data[0].id,
          }),
        ])
      })

      .then((res) => {
        return {
          selectFacultyId: res[0].data[0].id,
          facultyList: res[0].data,
          groupsList: res[1].data,
          selectGroupId: res[1].data[0].id,
          studentsList: res[2].data,
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
          await delivery.StudentAction.create(this.form)
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
      this.getStudents(this.selectGroupId)
    },
    async getStudents(value) {
      const res = await delivery.StudentAction.getList({ groupId: value })
      this.studentsList = res.data
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
