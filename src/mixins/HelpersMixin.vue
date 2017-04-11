<script>
import * as moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')

export default {
  filters: {
    pluralize (value, one, few, many) {
      let cases = [2, 0, 1, 1, 1, 2]
      let after = [one, few, many]
      return value + ' ' + after[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[Math.min(value % 10, 5)]]
    }
  },
  methods: {
    formatDate: (date, format = 'YYYY-MM-DD') => {
      return moment(date).utcOffset(0).format(format)
    }
  }
}
</script>
