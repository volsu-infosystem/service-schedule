<template>
  <div class="container">
    <schedule-table v-if="schedule" :schedule="schedule" />

    <ui-form v-else class="edit-page__form" ref="form" @submit="getTimetable">
      <h4>Выбрать расписание</h4>

      <ui-select
        v-model="selected.institute"
        :options="institutes"
        placeholder="Выберите институт"
        @input="instituteChanged"
      />

      <ui-select
        v-if="isYearAbleToInput"
        v-model="selected.year"
        :options="years"
        placeholder="Выберите год поступления"
      />

      <ui-button v-if="isFormAbleToSend" type="primary" @click="getTimetable">
        Выбрать
      </ui-button>
    </ui-form>
  </div>
</template>

<script>
import { schedule } from '@/consts/schedule';

export default {
  name: 'edit-page',

  middleware: 'auth',

  asyncData({ params }) {
    const timetable = params.timetable;

    const data = timetable ? schedule : null;

    const institutes = [{ value: 'ИМИТ' }];

    return {
      schedule: data,
      institutes,
      years: [],
      selected: {
        year: undefined,
        institute: undefined,
      },
    };
  },

  computed: {
    isYearAbleToInput() {
      return this.years.length;
    },

    isFormAbleToSend() {
      return this.isYearAbleToInput && this.selected.year;
    },
  },

  methods: {
    instituteChanged() {
      this.years = [{ value: '2019Б' }, { value: '2020Б' }, { value: '2019М' }];
    },

    getTimetable() {
      if (!this.isFormAbleToSend) return;

      this.$router.push('/edit/timetableId');
    },
  },
};
</script>

<style lang="scss">
.edit-page {
  &__form {
    margin: 30px auto;
    width: 400px;
  }
}
</style>
