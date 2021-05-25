<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Аналитика о студенте</div>
    </div>
    <a-row :gutter="[16, 16]" type="flex" justify="space-around">
      <a-col :span="12" style="width: 300px">
        <template>
          <a-card :style="{ width: isMobile ? '100%' : '300px' }">
            <img
              slot="cover"
              alt="example"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <a-card-meta v-if="!!student" :title="student.user.fullName">
              <span slot="description">
                Номер студенческого билета: {{ student.studentCardId }}<br />
                <b v-if="student.isMonitor"> Староста </b>
                <br v-if="student.isMonitor" />
                Группа: {{ student.group.fullName }}
              </span>
            </a-card-meta>
          </a-card>
        </template></a-col
      >
      <a-col :span="12" style="width: 350px">
        <a-statistic title="Количество пропусков" :value="analytic[0].count">
          <template #suffix>
            <span>
              /
              {{
                parseInt(analytic[0].count) + parseInt(analytic[1].count)
              }}</span
            >
          </template>
        </a-statistic>
        <Diagram :chart-data="missClasesDataset" :options="diagramOption" />
      </a-col>
      <a-col :span="24" :style="{ overflow: 'auto' }">
        <BarChart
          :style="{ width: '600px' }"
          :chart-data="barDataset"
          :options="barOptions"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Diagram from '@/components/common/Diagram'
import LineChart from '@/components/common/LineChart'
import BarChart from '@/components/common/BarChart'
import { mapState } from 'vuex'
import delivery from '@/delivery'
export default {
  components: { Diagram, LineChart, BarChart },
  asyncData({ route }) {
    return Promise.all([
      delivery.StudentAction.getByID({
        studentId: route.params.id,
      }),
      delivery.AnalyticAction.countByAttended({
        studentId: route.params.id,
      }),
      delivery.AnalyticAction.countByClassAttended({
        studentId: route.params.id,
      }),
    ])
      .then((res) => {
        return {
          student: res[0].data,
          analytic: res[1].data,
          analyticClases: res[2].data,
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  data() {
    return {
      backgroundColor: [
        '#F4A3D7',
        '#A0BFF3',
        '#48D1D7',
        '#69D596',
        '#B7CB5D',
        '#FFA500',
        '#EE82EE',
        '#CD853F',
        '#20B2AA',
        '#87CEEB',
        '#3CB371',
      ],
      diagramOption: {
        title: {
          display: true,
          text: 'Количество пропущенных занятий по предметам',
          fontSize: 14,
          fontColor: '#6b7280',
        },
      },
      barOptions: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Посещаемость занятий по предметам',
          fontSize: 14,
          fontColor: '#6b7280',
        },
      },
      analytic: [
        { isAttented: false, count: 0 },
        { isAttented: true, count: 0 },
      ],

      analyticClases: [],
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.layout.isMobile,
    }),
    missClasesDataset() {
      return {
        datasets: [
          {
            data: this.analyticClases.map((item) => item.countMiss),
            backgroundColor: this.backgroundColor,
          },
        ],
        labels: this.analyticClases.map((item) => item.shortName),
      }
    },
    barDataset() {
      return {
        datasets: [
          {
            label: 'Пропущено',
            data: this.analyticClases.map((item) => item.countMiss),
            stack: 'Stack 0',
            backgroundColor: this.backgroundColor[0],
          },
          {
            label: 'Посещено',
            data: this.analyticClases.map((item) => item.countPass),
            stack: 'Stack 0',
            backgroundColor: this.backgroundColor[1],
          },
          {
            label: 'Все',
            data: this.analyticClases.map((item) => item.countAll),
            stack: 'Stack 1',
            backgroundColor: this.backgroundColor[2],
          },
        ],

        labels: this.analyticClases.map((item) => item.shortName),
      }
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
</style>
