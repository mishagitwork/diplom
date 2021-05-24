<template>
  <div :class="$style.container">
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
          <a slot="actions" @click="$router.push(`class/${item.id}`)">
            Список занятий
          </a>
          <a-list-item-meta :description="item.professor.user.fullName">
            <span slot="title">
              {{ item.subject.fullName + ' ' }}<b>{{ item.group.shortName }}</b>
            </span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import delivery from '@/delivery'
import { mapState } from 'vuex'
export default {
  asyncData({ store }) {
    return Promise.all([
      delivery.ClassAction.getList({
        groupId: store.state.user.groupId,
      }),
    ])
      .then((res) => {
        return {
          classesList: res[0].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      classesList: [],
    }
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
</style>
