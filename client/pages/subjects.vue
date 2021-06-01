<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о предметах</div>
      <a-button type="primary" @click="isOpen = true"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="subjectsList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">редактировать </a>
          <a slot="actions" @click="deleteSubject(item.id)"> удалить</a>
          <a-list-item-meta :description="item.fullName">
            <span slot="title"> {{ item.shortName }}</span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      title="Создать новый предмет"
      :width="isMobile ? '100%' : '40%'"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="fullName"
          label="Полное название предмета"
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
          label="Краткое название предмета"
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
      delivery.SubjectAction.getList({
        universityId: store.state.user.universityId,
      }),
    ])
      .then((res) => {
        return { subjectsList: res[0].data }
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
      subjectsList: [],
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

          const res = await delivery.SubjectAction.create(data)
          if (res.data) {
            await this.getSubjects()
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
    async getSubjects() {
      const res = await delivery.SubjectAction.getList({
        universityId: this.universityId,
      })
      this.subjectsList = res.data
    },
    async deleteSubject(subjectId) {
      await delivery.SubjectAction.delete({ subjectId })
      await this.getSubjects()
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
