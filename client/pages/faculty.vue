<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о факультетах</div>
      <a-button type="primary" @click="isOpen = true"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="facultyList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="updateDrawer(item)">редактировать </a>
          <a slot="actions" @click="deleteFaculty(item.id)"> удалить</a>
          <a-list-item-meta :description="item.fullName">
            <span slot="title"> {{ item.shortName }}</span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      :title="
        this.form.id ? 'Редактировать факультет' : 'Создать новый факультет'
      "
      :width="isMobile ? '100%' : '40%'"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="fullName"
          label="Полное название факультета"
          prop="fullName"
        >
          <a-input
            v-model="form.fullName"
            @blur="
              () => {
                $refs.fullName.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item
          ref="shortName"
          label="Краткое название факультета"
          prop="shortName"
        >
          <a-input
            v-model="form.shortName"
            @blur="
              () => {
                $refs.shortName.onFieldBlur()
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
        <a-button v-if="!this.form.id" type="primary" @click="onSubmit">
          Создать
        </a-button>
        <a-button v-else type="primary" @click="updateFaculty">
          Редактировать
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
      delivery.FacultyAction.getList({
        universityId: store.state.user.universityId,
      }),
    ])
      .then((res) => {
        return { facultyList: res[0].data }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  middleware: 'isAdminAuth',
  data() {
    return {
      isOpen: false,
      form: { fullName: '', shortName: '' },
      facultyList: [],
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
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = {
            fullName: this.form.fullName,
            shortName: this.form.shortName,
            universityId: this.universityId,
          }
          const res = await delivery.FacultyAction.create(data)
          if (res.data) {
            await this.getFaculty()
            this.isOpen = false
            this.resetForm()
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
    async getFaculty() {
      const res = await delivery.FacultyAction.getList({
        universityId: this.universityId,
      })
      this.facultyList = res.data
    },
    async deleteFaculty(facultyId) {
      await delivery.FacultyAction.delete({ facultyId })
      await this.getFaculty()
    },
    updateDrawer(item) {
      this.form = { ...item }
      this.isOpen = true
    },
    async updateFaculty() {
      const res = await delivery.FacultyAction.update(this.form)
      if (res.data) {
        await this.getFaculty()
        this.form = {}
        this.isOpen = false
      }
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
