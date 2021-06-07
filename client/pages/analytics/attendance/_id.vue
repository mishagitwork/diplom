<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о занятиях</div>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="attendanceList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="`${$moment(item.createdAt).format(
              'D/MM/YYYY H:mm'
            )} - ${$moment(item.expiredAt).format('D/MM/YYYY H:mm')}`"
          >
            <span slot="title">
              <span
                :class="[$style.success, { [$style.error]: !item.isAttended }]"
                >{{ item.isAttended ? 'Посещено' : 'Пропущено' }}
              </span>
              на данную дату
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import delivery from '@/delivery'
export default {
  data() {
    return {
      attendanceList: [],
    }
  },
  async mounted() {
    const classes = await delivery.AttendanceAction.getList({
      studentId: this.$route.params.id,
    })
    this.attendanceList = classes.data ? classes.data : []
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.layout.isMobile,
    }),
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
.success {
  color: green;
}
.error {
  color: red;
}
</style>
