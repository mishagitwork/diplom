<template>
  <div :class="$style.container">
    <div :class="$style.mainInfo">
      <div>Название предмета: {{ classInfo.subject.fullName }}</div>
      <div>Название группы: {{ classInfo.group.fullName }}</div>
      <div>Имя преподавателя: {{ classInfo.professor.user.fullName }}</div>
      <vue-qrcode :options="{ width: 250 }" :value="'1111-' + classInfo.id">
      </vue-qrcode>
    </div>

    <div :class="$style.header">
      <div :class="$style.title">Информация о занятиях</div>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="classesList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="openDrawer(item)">Посещаемость</a>
          <a
            slot="actions"
            v-if="professorId"
            :disabled="$moment().isAfter(item.expiredAt)"
            @click="addStudentAttented(item)"
          >
            Отметить студента
          </a>
          <a-list-item-meta
            :description="`${$moment(item.createdAt).format(
              'D/MM/YYYY H:mm'
            )} - ${$moment(item.expiredAt).format('D/MM/YYYY H:mm')}`"
          >
            <span slot="title"> Дата проведения </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      title="Посещение"
      :width="isMobile ? `100%` : `40%`"
      :visible="isOpen"
      @close="isOpen = false"
    >
      <div class="list">
        <a-list
          :item-layout="isMobile ? 'vertical' : 'horizontal'"
          :data-source="attendanceList"
          :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <span slot="description">
                Местоположение:
                <a
                  v-if="item.coords"
                  :href="`http://maps.google.com/maps?q=${converGeoPlace(
                    item.coords
                  )}`"
                  target="_blank"
                >
                  {{ converGeoPlace(item.coords) }}
                </a>
                <span v-else>Не указано</span>
              </span>
              <span slot="title">
                {{ item.student.user.fullName }}
                <span
                  :class="[
                    $style.success,
                    { [$style.error]: !item.isAttended },
                  ]"
                >
                  {{ item.isAttended ? 'Присутсвовал' : 'Пропустил' }}
                </span>
              </span>
              <a-avatar slot="avatar" :src="item.student.user.avatar" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import delivery from '@/delivery'
export default {
  asyncData({ route }) {
    return Promise.all([
      delivery.AttendanceAction.getUniqueList({
        classId: route.params.id,
      }),
      delivery.ClassAction.getListById({ classId: route.params.id }),
    ])
      .then((res) => {
        return {
          classesList: res[0].data,
          classInfo: res[1].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      isOpen: false,
      classInfo: {},
      classesList: [],
      attendanceList: [],
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.layout.isMobile,
      professorId: (state) => state.user.professorId,
    }),
  },
  methods: {
    ...mapMutations({
      setAttendance: 'attendance/setAttendance',
    }),
    converGeoPlace(value) {
      const coords = JSON.parse(value)
      return coords.latitude + ',' + coords.longitude
    },
    async openDrawer(item) {
      const attendance = await delivery.AttendanceAction.getList({
        classId: item.classId,
        expiredAt: item.expiredAt,
      })
      this.attendanceList = attendance.data
      this.isOpen = true
    },
    addStudentAttented(item) {
      this.setAttendance({
        classId: item.classId,
        expiredAt: item.expiredAt,
      })
      this.$router.push('/scaner')
    },
  },
}
</script>

<style module lang="scss">
@import '/assets/styles/breakpoints.scss';
.container {
  .mainInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    @include tablet {
      padding: 0 1rem;
    }
  }
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
.success {
  color: green;
}
.error {
  color: red;
}
</style>
