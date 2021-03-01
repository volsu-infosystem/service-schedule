<template>
  <div class="container">
    <nuxt-link to="/edit">Редактирование расписания</nuxt-link>
  </div>
</template>

<script>
import auth from '@/middleware/auth';

export default {
  name: 'index-page',
  middleware: [auth],
};
</script>

<style lang="scss">
.index-page {
}
</style>
