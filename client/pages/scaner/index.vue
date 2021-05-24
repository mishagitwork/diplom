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
      <p>
        Разрешить доступ к геолокации <a @click="getGeoLocation">Разрешить </a>
      </p>
    </a-modal>
    <p class="error">{{ error }}</p>
    <!-- 
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p> -->

    <qrcode-stream
      v-if="isAgree"
      :camera="camera"
      @decode="onDecode"
      @init="onInit"
    >
      <div v-if="validationSuccess" :class="$style.validationSuccess">
        Операция прошла успешно
      </div>

      <div v-if="validationFailure" :class="$style.validationFailure">
        Произошла ошибка
        <div class="buttons">
          <a-button type="default">На главную</a-button>
          <span> </span>
          <a-button type="primary">Повторить</a-button>
        </div>
      </div>

      <div v-if="validationPending" :class="$style.validationPending">
        Ожидание...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
// import { QrcodeStream } from '../../../../src'
import delivery from '@/delivery'
import { mapState } from 'vuex'
export default {
  //   components: { QrcodeStream },

  data() {
    return {
      result: '',
      error: '',
      isOpen: true,
      isAgree: false,
      coords: '',
      camera: 'auto',
      isValid: undefined,
    }
  },
  computed: {
    ...mapState({
      // isAdmin: (state) => state.user.isAdmin,
      // universityId: (state) => state.user.universityId,
      // professorId: (state) => state.user.professorId,
      studentId: (state) => state.user.studentId,
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
      // this.getGeoLocation()
      this.isOpen = false
      this.isAgree = true
    },
    getGeoLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        },
        (error) => {
          this.coords = false
          console.log(error.message)
        }
      )
    },

    async onDecode(result) {
      this.camera = 'off'
      this.result = result
      if (result.startsWith('1111')) {
        const res = await delivery.AttendanceAction.updateByStudent({
          classId: result.slice(5),
          studentId: this.studentId,
          coords: this.coords,
        })
        this.isValid = !!res
        console.log(res)
        // this.isValid = true
      } else {
        this.isValid = false
      }
      await setTimeout(() => {}, 5000)
      console.log(this.result)
      //this.camera = 'auto'
    },

    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
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
