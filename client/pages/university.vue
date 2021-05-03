<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div class="title">Информация о университетах</div>
      <a-button type="primary" @click="isOpen = true"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="universityList"
        style="padding: 0.5rem 3rem"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions">редактировать </a>
          <a slot="actions" @click="test"> удалить</a>
          <a-list-item-meta :description="item.fullName">
            <a slot="title" href="https://www.antdv.com/">{{
              item.shortName
            }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <!-- <div>content</div> -->
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      title="Создать новый университет"
      :width="450"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="fullName"
          label="Полное название университета"
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
          label="Краткое название университе"
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
        <a-form-model-item
          ref="login"
          label="Логин администратора университета"
          prop="login"
        >
          <a-input
            v-model="form.login"
            @blur="
              () => {
                $refs.login.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item
          ref="password"
          label="Пароль администратора"
          prop="password"
        >
          <a-input
            v-model="form.password"
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
  asyncData() {
    return Promise.all([delivery.UniversityAction.getList()])
      .then((res) => {
        return { universityList: res[0].data }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      isOpen: false,
      form: { fullName: '', shortName: '', login: '', password: '' },
      universityList: [],
      rules: {},
    }
  },
  computed: {
    isMobile() {
      if (process.client) {
        return window.innerWidth < 700
      }
    },
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = {
            fullName: this.form.fullName,
            shortName: this.form.shortName,
            user: {
              fullName: this.form.login,
              login: this.form.login,
              password: this.form.password,
            },
          }
          await delivery.UniversityAction.create(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    async getUniversity() {
      const res = await delivery.UniversityAction.getList()
      this.universityList = res.data
    },
    test() {
      console.log(this.universityList)
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
@include mobile() {
  .ant-drawer-content-wrapper {
    width: 100%;
  }
}
</style>
