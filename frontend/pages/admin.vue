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
export default {
  name: 'admin',

  data() {
    return {
      institute: '',
      institutes: [],
    };
  },

  async created() {
    this.institutes = await this.$api.institute.institutes();
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
