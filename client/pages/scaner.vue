<template>
  <div :class="$style.container">
    <a-modal
      v-model="isOpen"
      title="Предупреждение"
      :ok-button-props="{ props: { disabled: !coords } }"
      @ok="agree"
    >
      <p>
        Для продолжения необходимо дать приложению разрешение на доступ к камере
        и геолокации.
      </p>

      <a-spin :spinning="spinning" :class="$style.spinning" tip="Loading...">
        <p>
          Разрешить доступ к геолокации
          <a @click="getGeoLocation">Разрешить </a>
        </p>
      </a-spin>
    </a-modal>
    <p v-if="error" class="error">{{ error }}</p>

    <qrcode-stream
      v-if="isAgree"
      :camera="camera"
      @decode="onDecode"
      @init="onInit"
    >
      <div v-if="validationSuccess" :class="$style.validationSuccess">
        Операция прошла успешно
        <a-button type="default" @click="$router.push('/')">
          На главную
        </a-button>
      </div>

      <div v-if="validationFailure" :class="$style.validationFailure">
        Произошла ошибка
        <div class="buttons">
          <a-button type="default" @click="$router.push('/')">
            На главную
          </a-button>
          <span> </span>
          <a-button type="primary" @click="retry">Повторить</a-button>
        </div>
      </div>

      <div v-if="validationPending" :class="$style.validationPending">
        Ожидание...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import delivery from '@/delivery'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      result: '',
      error: '',
      isOpen: true,
      isAgree: false,
      coords: '',
      camera: 'auto',
      isValid: undefined,
      isPending: false,
      spinning: false,
    }
  },
  computed: {
    ...mapState({
      studentId: (state) => state.user.studentId,
      attendenceClassId: (state) => state.attendance.classId,
    }),
    validationPending() {
      return this.isValid === undefined && this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    },
  },

  methods: {
    agree() {
      this.isOpen = false
      this.isAgree = true
    },
    getGeoLocation() {
      this.spinning = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
          this.spinning = false
        },
        (error) => {
          this.coords = false
          this.spinning = false
          this.$message.error(error.message)
          console.log(error.message)
        }
      )
    },
    retry() {
      this.isValid = undefined
      this.camera = 'auto'
    },
    async onDecode(result) {
      this.camera = 'off'
      this.result = result
      if (result.startsWith('0000')) {
        if (this.attendenceClassId) {
          const res = await delivery.AttendanceAction.updateByStudent({
            classId: this.attendenceClassId,
            studentId: result.slice(5),
            coords: this.coords,
          })
          this.isValid = !!res.data ? res.data.isAttended : false
        } else {
          this.$router.push(`analytics/student/${result.slice(5)}`)
        }
      }
      if (result.startsWith('1111')) {
        if (this.studentId) {
          const res = await delivery.AttendanceAction.updateByStudent({
            classId: result.slice(5),
            studentId: this.studentId,
            coords: this.coords,
          })
          this.isValid = !!res.data ? res.data.isAttended : false
        } else {
          this.$router.push(`analytics/class/${result.slice(5)}`)
        }
      }
      if (result.startsWith('0000') && result.startsWith('1111')) {
        this.isValid = undefined
        this.camera = 'auto'
      }
    },

    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'Ошибка: вы не дали разрешения для доступа к камере'
        } else if (error.name === 'NotFoundError') {
          this.error = 'Ошибка: отсутсвует камера'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'Ошибка: необхлдимо безопасное соединение(HTTPS)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'Ошибка: камера уже используется?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'Ошибка: установленная камера не подходит'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'Ошибка: Stream API не поддерживается данным браузером'
        }
      }
    },
  },
}
</script>

<style module lang="scss">
.error {
  font-weight: bold;
  color: red;
}
.container {
  .spinning {
    position: absolute;
    top: 50%;

    width: 100vw;
    height: 100vh;
    z-index: 5000;
  }
  .validationSuccess,
  .validationFailure,
  .validationPending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  .validationSuccess {
    color: green;
  }
  .validationFailure {
    color: red;
  }
}
</style>
