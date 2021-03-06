<template>
  <div :class="$style.container">
    <div :class="$style.header">
      <div :class="$style.title">Информация о группах</div>
      <a-select
        show-search
        option-filter-prop="children"
        :filter-option="filterOption"
        v-model="selectFacultyId"
        style="width: 100px"
        @change="getGroups"
      >
        <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
          {{ f.shortName }}
        </a-select-option>
      </a-select>
      <a-button type="primary" @click="openDrawer"> Создать </a-button>
    </div>
    <div class="list">
      <a-list
        :item-layout="isMobile ? 'vertical' : 'horizontal'"
        :data-source="groupsList"
        :style="`padding: 0.5rem ${isMobile ? '1rem' : '3rem'}`"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="updateDrawer(item)">редактировать </a>
          <a slot="actions" @click="deleteGroup(item.id)"> удалить</a>
          <a-list-item-meta :description="item.fullName">
            <span slot="title"> {{ item.shortName }}</span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <a-drawer
      :title="this.form.id ? 'Редактировать группу' : 'Создать новую группу'"
      :width="isMobile ? '100%' : '40%'"
      :visible="isOpen"
      :body-style="{ paddingBottom: '80px' }"
      @close="isOpen = false"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item
          ref="fullName"
          label="Полное название группы"
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
          label="Краткое название группы"
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
        <a-form-model-item ref="facultyId" label="Факультет" prop="facultyId">
          <a-select
            :disabled="!this.form.id"
            show-search
            placeholder="Выбрать Факультет"
            option-filter-prop="children"
            :filter-option="filterOption"
            v-model="form.facultyId"
          >
            <a-select-option v-for="f in facultyList" :key="f.id" :value="f.id">
              {{ f.fullName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          ref="graduationDate"
          label="Дата выпуска"
          prop="graduationDate"
        >
          <a-date-picker
            v-model="form.graduationDate"
            format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :show-time="{ defaultValue: $moment('00:00:00', 'HH:mm:ss') }"
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
        <a-button v-if="!this.form.id" type="primary" @click="onSubmit">
          Создать
        </a-button>
        <a-button v-else type="primary" @click="updateGroup">
          Редактировать
        </a-button>
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
      delivery.FacultyAction.getList({
        universityId: store.state.user.universityId,
      }),
    ])
      .then((res) => {
        return Promise.all([
          res[0].data,
          delivery.GroupAction.getList({
            facultyId: res[0].data[0].id,
          }),
        ])
      })

      .then((res) => {
        return {
          selectFacultyId: res[0][0].id,
          facultyList: res[0],
          groupsList: res[1].data,
        }
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
      selectFacultyId: '',
      facultyList: [],
      groupsList: [],
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
    disabledDate(current) {
      return current && current < this.$moment().endOf('day')
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    openDrawer() {
      this.form.facultyId = this.selectFacultyId
      this.isOpen = true
    },

    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const data = {
            fullName: this.form.fullName,
            shortName: this.form.shortName,
            facultyId: this.facultyId,
          }
          const res = await delivery.GroupAction.create(this.form)
          if (res.data) {
            await this.getGroups(this.selectFacultyId)
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
    async getGroups(value) {
      const res = await delivery.GroupAction.getList({ facultyId: value })
      this.groupsList = res.data
    },
    async deleteGroup(groupId) {
      await delivery.GroupAction.delete({ groupId })
      await this.getGroups(this.selectFacultyId)
    },
    updateDrawer(item) {
      this.form = { ...item }
      this.isOpen = true
    },
    async updateGroup() {
      const res = await delivery.GroupAction.update(this.form)
      if (res.data) {
        await this.getGroups(this.selectFacultyId)
        this.form = {}
        this.isOpen = false
      }
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
