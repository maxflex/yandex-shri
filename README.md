# Тестовое задание #1

Для выполнения задания использовался [Vue.js] как провайдер реактивности и SPA-двигатель, а так же [Webpack] в качестве бандлера модулей. Исходный код находится в папке `src/`

### Функционал
В расписании можно посмотреть:
- школу, для которой читается лекция (или несколько школ для общих лекций)
- тему лекции
- имя лектора
- дату и место проведения лекции
- дополнительную информацию о лекторе или проведённой лекции
- отфильтровать по школам, лекторам и датам

### Компоненты
Приложение построено на [single-file] компонентах с расширением `.vue`

| Компонент | Описание |
| ------ | ------ |
| App | Главный компонент, точка входа |
| Schedule | Страница расписания |
| Lecture | Страница с информацией и материалами проведённой лекции |
| Speaker | Страница с информацией о лекторе |
| NotFound | Страница 404 |


### Структура
| Директория | Описание |
| ------ | ------ |
| assets/ | webpack-processed ассеты |
| mixins/ | Содержит `HelpersMixin.vue` со вспомогательными функциями  |
| router/ | Содержит `index.js` с настройками роутов приложения |
| store/ | Содержит `store.js` [state management] приложения |
| /static/ | static ассеты |
| /docs/ | скомпилированное production-ready приложение |

[Vue.js]: <https://github.com/vuejs/vue>
[Webpack]: <https://github.com/webpack/webpack>
[single-file]: <https://vuejs.org/v2/guide/single-file-components.html>
[state management]: <https://vuex.vuejs.org/en/intro.html>