<template>
  <div :class="$style.container">
    <div>
      Студент группы <b> {{ student.group.fullName }}</b> <br />
      {{ student.user.fullName }} <br />
      Номер студенческого билета: {{ student.studentCardId }}
    </div>
    <vue-qrcode
      :options="{ width: 250 }"
      :value="'0000-' + student.id"
    ></vue-qrcode>
  </div>
</template>

<script>
import delivery from '@/delivery'
export default {
  middleware: 'isStudentAuth',
  asyncData({ store }) {
    return Promise.all([
      delivery.StudentAction.getByID({
        studentId: store.state.user.studentId,
      }),
    ])
      .then((res) => {
        return {
          student: res[0].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      student: { user: {}, group: {} },
    }
  },
}
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: calc(100% - 5rem);
  text-align: center;
}
</style>
