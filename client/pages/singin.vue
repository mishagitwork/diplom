<template>
  <div :class="$style.container">
    <div :class="$style.wrapper">
      Добро пожаловать в систему
      <a-input v-model="data.login" placeholder="Введите логин">
        <a-icon slot="prefix" type="user" />
        <a-tooltip slot="suffix" title="Extra information">
          <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </a-input>
      <a-input-password v-model="data.password" placeholder="Введите пароль" />
      <a-button :disabled="isDisabled" block type="primary" @click="onSubmit">
        Войти
      </a-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  // middleware: 'isAuth',
  data() {
    return {
      data: {
        login: '',
        password: '',
      },
    }
  },
  computed: {
    isDisabled() {
      return !this.data.login || !this.data.password
    },
  },
  methods: {
    ...mapMutations({
      initUser: 'user/initUser',
    }),
    ...mapActions({
      login: 'auth/login',
    }),
    async onSubmit() {
      const response = await this.login(this.data)
      if (!response) {
        this.$message.error('Произошла ошибка. Попробуйте еще раз')
        return
      }
      this.$message.success('Вы успешно авторизировались')
      this.$router.push('/')
    },
  },
}
</script>

<style module lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 10rem);
  padding: 0 1rem;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 25rem;
    height: 10rem;
  }
}
</style>
