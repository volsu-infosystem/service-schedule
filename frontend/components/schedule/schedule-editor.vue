<template>
  <div :class="['schedule-editor', { visible }]">
    <div class="schedule-editor__prev" @click="$emit('close')">
      <a-icon type="close" />
      Закрыть
    </div>
    <ui-form>
      <h4>{{ discipline.header }}</h4>
      <ui-select v-model="discipline.model" :options="discipline.options" />
      <h4>{{ professor.header }}</h4>
      <ui-select v-model="professor.model" :options="professor.options" />
      <h4>{{ room.header }}</h4>
      <ui-select v-model="room.model" :options="room.options" />
      <ui-button type="primary"> Сохранить </ui-button>
    </ui-form>
    <ui-loading :loading="loading" />
  </div>
</template>

<script>
export default {
  name: 'schedule-editor',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: true,
      discipline: {
        type: 'discipline',
        header: 'Выберите дисциплину',
        options: [
          { value: 'Матан' },
          {
            value:
              'Программиирование и программирование и информатикаи программирование и информатикаи программирование и информатикаи программирование и информатика',
          },
          { value: 'Клячин2' },
          { value: 'Клячин3' },
          { value: 'Клячин4' },
          { value: 'Клячин5' },
          { value: 'Клячин6' },
          { value: 'Клячин7' },
        ],
        model: undefined,
      },
      professor: {
        type: 'professor',
        header: 'Выберите преподавателя',
        options: [
          { value: 'Клячин' },
          { value: 'Клячин1' },
          { value: 'Клячин2' },
          { value: 'Клячин3' },
          { value: 'Клячин4' },
          { value: 'Клячин5' },
          { value: 'Клячин6' },
          { value: 'Клячин7' },
        ],
        model: undefined,
      },
      room: {
        type: 'room',
        header: 'Выберите аудиторию',
        options: [
          { value: '1' },
          { value: '3' },
          { value: '2' },
          { value: '5' },
          { value: '6' },
          { value: '7' },
          { value: '8' },
          { value: '9' },
        ],
        model: undefined,
      },
    };
  },
  watch: {
    visible(val) {
      if (!val) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },

  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="scss">
.schedule-editor {
  position: fixed;
  right: 0px;
  width: 600px;
  top: 0px;
  height: 100vh;
  z-index: 30;
  background-color: $white;
  box-shadow: -10px 0px 10px 0px rgba(0, 52, 102, 0.09);
  padding: 15px 20px;
  pointer-events: none;
  opacity: 0;
  transition: opacity ease 0.3s, transform ease 0.3s;
  transform: scaleX(0.95);
  transform-origin: right center;
  &.visible {
    opacity: 1;
    transform: scaleX(1);
    pointer-events: auto;
  }

  &__prev {
    color: $text-light;
    cursor: pointer;
    display: inline-block;
    i {
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .ui-form {
    padding: 0 0;
    h4 {
      margin-top: 20px;
    }
    .ui-button {
      margin-top: 20px;
    }
  }
}
</style>
