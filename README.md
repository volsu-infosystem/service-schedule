# Volsu-schedule

Для развертки проекта для разработки:
`docker-compose -f docker-compose.dev.yml up --build -V -d`
Для продакшна:
`docker-compose -f docker-compose.dev.yml up --build -V -d`
Для бекенда:
`docker-compose -f docker-compose.backend.yml up --build -V -d`

Установятся все сервисы, базы данных, зависимости и nginx прокси. Дальнейшее взаимодействие осуществляется по адресам

`localhost/*` - фронтенд

`localhost/api/*` - бекенд

Хотрелоадинг для фронта и для бека в коробке.

Вопросы - [сюда](https://vk.com/niqitosiq)
