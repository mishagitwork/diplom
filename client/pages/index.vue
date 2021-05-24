<template>
  <div :class="$style.container">
    <h2>Добро пожаловать,{{ fullName }}</h2>
    <div v-if="studentId" class="student">
      Вы успешно авторизировались в качестве <u> студента</u>. Данная система
      предназначена для учета и контроля посещаемости.
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isAdmin: (state) => state.user.isAdmin,
      universityId: (state) => state.user.universityId,
      professorId: (state) => state.user.professorId,
      studentId: (state) => state.user.studentId,
      isMobile: (state) => state.layout.isMobile,
      fullName: (state) => state.user.fullName,
    }),
  },
}
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1rem;
  height: calc(100% - 10rem);
}
</style>
