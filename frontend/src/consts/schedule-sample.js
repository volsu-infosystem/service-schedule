const times = [
  { order: 0, label: '№1', time: '8:30 - 10:00' },
  { order: 1, label: '№2', time: '10:10 - 11:40' },
  { order: 2, label: '№3', time: '12:00 - 13:30' },
  { order: 3, label: '№4', time: '13:50 - 15:20' },
  { order: 4, label: '№5', time: '15:20 - 16:50' },
  { order: 5, label: '№6', time: '17:00 - 18:30' },
];

const days = [
  { day: 0, label: 'Понедельник', times: [...times] },
  { day: 1, label: 'Вторник', times: [...times] },
  { day: 2, label: 'Среда', times: [...times] },
  { day: 3, label: 'Четверг', times: [...times] },
  { day: 4, label: 'Пятница', times: [...times] },
  { day: 5, label: 'Суббота', times: [...times] },
];

const sampleLesson = {
  discipline: {},
  professor: {},
  room: {},
  periodicity: 'alw',
};

const sampleCell = {
  subCells: [
    {
      subGroup: {
        id: 1,
      },
      lessons: [sampleLesson],
    },
  ],
};
export { days, sampleLesson, sampleCell };
