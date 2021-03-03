const times = [
  { number: '8:30-10:00', label: '№1', time: '8:30 - 10:00' },
  { number: '10:10 - 11:40', label: '№2', time: '10:10 - 11:40' },
  { number: '12:00 - 13:30', label: '№3', time: '12:00 - 13:30' },
  { number: '13:50 - 15:20', label: '№4', time: '13:50 - 15:20' },
  { number: '15:20 - 16:50', label: '№5', time: '15:20 - 16:50' },
  { number: '17:00 - 18:30', label: '№6', time: '17:00 - 18:30' },
];

const days = [
  { day: 'Mon', label: 'Понедельник', times: [...times] },
  { day: 'Tue', label: 'Вторник', times: [...times] },
  { day: 'Wed', label: 'Среда', times: [...times] },
  { day: 'Thu', label: 'Четверг', times: [...times] },
  { day: 'Fri', label: 'Пятница', times: [...times] },
  { day: 'Sat', label: 'Суббота', times: [...times] },
];

export { days };
