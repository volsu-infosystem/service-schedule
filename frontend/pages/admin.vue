<template>
  <div class="admin">
    <div class="admin__row">
      <ui-autocomplete
        v-model="institute"
        :dataSource="institutes"
        @search="searchInstitute"
      />
      <ui-button @click="getInsititute" />
    </div>
  </div>
</template>

<script>
import auth from '@/middleware/auth';

export default {
  name: 'admin',

  middleware: [auth],

  data() {
    return {
      institute: '',
      institutes: [],
    };
  },

  async created() {
    const { data } = await this.$api.institute.institutes();
    this.institutes = data;
  },

  methods: {
    searchInstitute(query) {
      this.institutes.filter(i =>
        i.name.toLowerCase().includes(query.toLowerCase()),
      );
    },
    getInsititute() {},
  },
};
</script>

<style></style>
