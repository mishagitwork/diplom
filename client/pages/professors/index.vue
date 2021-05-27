<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о преподавателях</div>
      <a-select
        show-search
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="selectFacultyId"
        style="width: 100px"
        @change="getProfessors"
      >
        <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
          {{ f.shortName }}
        </a-select-option>
      </a-select>
      <a-button type="primary" @click="openDrawer"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="professorsList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">редактировать </a>
          <a slot="actions"> удалить</a>
          <a-list-item-meta :description="item.position">
            <span slot="title"> {{ item.user.fullName }}</span>
            <a-avatar slot="avatar" :src="item.user.avatar" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      title="Создать новую группу"
      :width="isMobile ? '100%' : '40%'"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="fullName"
          label="ФИО преподавателя"
          prop="fullName"
        >
          <a-input
            v-model="form.user.fullName"
            @blur="
              () => {
                $refs.fullName.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="position" label="Должность" prop="position">
          <a-input
            v-model="form.position"
            @blur="
              () => {
                $refs.position.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="facultyId" label="Факультет" prop="facultyId">
          <a-select
            disabled
            show-search
            placeholder="Выбрать Факультет"
            option-filter-prop="children"
            :filter-option="filterOption"
            v-model="form.facultyId"
          >
            <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
              {{ f.fullName }}
            </a-select-option>
          </a-select>
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
          Отменить
        </a-button>
        <a-button type="primary" @click="onSubmit"> Создать </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
          res[0].data,
          delivery.ProfessorAction.getList({
            facultyId: res[0].data[0].id,
          }),
        ])
      })

      .then((res) => {
        return {
          selectFacultyId: res[0][0].id,
          facultyList: res[0],
          professorsList: res[1].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  middleware: 'isAdminAuth',
  data() {
    return {
      isOpen: false,
      form: { fullName: '', shortName: '', user: {} },
      selectFacultyId: '',
      facultyList: [],
      professorsList: [],
      rules: {},
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.layout.isMobile,
    }),

    universityId() {
      return this.$store.state.user.universityId
    },
  },

  methods: {
    disabledDate(current) {
      return current && current < this.$moment().endOf('day')
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    openDrawer() {
      this.form.facultyId = this.selectFacultyId
      this.isOpen = true
    },

    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await delivery.ProfessorAction.create(this.form)
          if (res.data) {
            await this.getProfessors(this.form.facultyId)
            this.isOpen = false
          } else {
            this.$message.error('Произошла ошибка. Попробуйте еще раз')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async getProfessors(value) {
      const res = await delivery.ProfessorAction.getList({ facultyId: value })
      this.professorsList = res.data
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
