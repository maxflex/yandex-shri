<template>
  <div>
    <h1>404</h1>
  </div>
</template>

<script>

export default {
  created () {
    this.$store.commit('title', 'Страница не найдена')
  }
}
</script>
