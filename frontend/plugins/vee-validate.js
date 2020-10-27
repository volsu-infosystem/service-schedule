import Vue from 'vue';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  setInteractionMode,
} from 'vee-validate';
import {
  required,
  min,
  email,
  confirmed,
  size,
  ext,
  image,
} from 'vee-validate/dist/rules';

setInteractionMode('eager');
Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);

extend('required', {
  ...required,
  message: 'Поле‎ обязательно',
});

extend('min', {
  ...min,
  message: 'Недостаточно символов',
});

extend('email', {
  ...email,
  message: 'Email некорректен',
});

extend('confirmed', {
  ...confirmed,
  message: 'Пароль должен совпадать',
});

extend('ext', {
  ...ext,
  message: 'Неподходящий тип',
});

extend('size', {
  ...size,
  message: 'Размер файла слишком большой',
});

extend('image', {
  ...image,
  message: 'Файл должен быть изображением',
});
