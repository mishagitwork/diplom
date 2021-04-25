<template>
  <div :class="$style.container">
    <div>Личный QR-код: Панасюк Михаил Александрович</div>
    <vue-qrcode :options="{ width: 250 }" :value="obj"></vue-qrcode>
    <!-- <vue-qrcode value="https://fengyuanchen.github.io/vue-qrcode"></vue-qrcode>
    <vue-qrcode
      value="https://fengyuanchen.github.io/vue-qrcode"
      tag="img"
    ></vue-qrcode>
    <vue-qrcode
      value="https://fengyuanchen.github.io/vue-qrcode"
      tag="svg"
      :options="{ width: 148 }"
    ></vue-qrcode> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: { id: '1', name: 'Vasya' },
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
}
</style>
