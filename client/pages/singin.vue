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
      <a-button :disabled="isDisabled" block type="primary" @click="login">
        Войти
      </a-button>
    </div>
  </div>
</template>

<script>
import delivery from '@/delivery'
import { mapMutations } from 'vuex'
export default {
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
    async login() {
      const response = await delivery.AuthAction.login(this.data)
      console.log(response)
      if (!response) return
      this.initUser(response)
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
  height: calc(100% - 5rem);
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
