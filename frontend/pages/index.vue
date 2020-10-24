<template>
  <div class="container">
    <schedule-table :schedule="schedule" />
  </div>
</template>

<script>
import { schedule } from '@/consts/schedule';

export default {
  name: 'index-page',
  data() {
    return {
      schedule,
    };
  },
};
</script>

<style lang="scss">
.index-page {
}
</style>
