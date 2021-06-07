<template>
  <div>
    <a-result
      status="404"
      title="404"
      sub-title="К сожалению, данная страница не существует."
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">
          Вернуться на главную
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import Header from '~/components/section/Header'
export default {
  components: {
    Header,
  },
}
</script>
