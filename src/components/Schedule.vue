<template>
  <div>
    <div class='filter'>
      <div class='filter__elem'>
        <div class="select-wrapper">
          <select v-model='search.school_id'>
            <option :value='null'>Любая школа</option>
            <option v-for='school in schools' :value='school.id'>{{ school.name }}</option>
          </select>
        </div>
      </div>
      <div class='filter__elem'>
        <input placeholder='лектор' v-model='search.speaker'>
      </div>
      <div class='filter__elem'>
        <datepicker v-model='search.date' placeholder='дата лекции' language='ru' :monday-first='true' wrapper-class='datepicker'></datepicker>
      </div>
    </div>
    <table class='schedule' v-if='lectures.length'>
      <tr v-for='lecture in filteredLectures'>
        <td style='width: 43%'>
          <router-link v-if='lecture.conducted' :to="{name: 'lectures', params: {id: lecture.id}}">{{ lecture.topic }}</router-link>
          <span v-else>{{ lecture.topic }}</span>
          <div class='school-list'>
            <span v-for='(school, index) in lecture.schools'>{{ school.name }}{{ index === (lecture.schools.length - 1) ? '' : ', '}}</span>
          </div>
        </td>
        <td style='width: 25%'>
          <router-link :to="{name: 'speakers', params: {id: lecture.speaker.id}}">{{ lecture.speaker.name }}</router-link>
          <span class='workplace'>{{ lecture.speaker.workplace }}</span>
        </td>
        <td style='width: 20%'>
          {{ lecture.auditorium.name }}
        </td>
        <td style='width: 12%'>
          {{ formatDate(lecture.date, 'D MMMM') }}
        </td>
      </tr>
    </table>
    <div v-else class='loading-wrapper'>
      <div class='loading'>
        <div class='loading-inner'></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HelpersMixin from '@/mixins/HelpersMixin'
import Datepicker from 'vuejs-datepicker'
import * as _ from 'lodash'

export default {
  data () {
    return {
      // параметры фильтра
      search: {
        school_id: null,
        speaker: null,
        date: null
      }
    }
  },
  components: { Datepicker },
  mixins: [HelpersMixin],
  created () {
    this.$store.commit('title', 'Расписание')
    this.$store.dispatch('loadLectures')
  },
  computed: {
    // лекции после применения фильтров
    filteredLectures () {
      return this.lectures.filter(lecture => {
        // фильтр по школе
        let schoolCondition = lecture.schools.filter(school => {
          return !this.search.school_id || school.id === this.search.school_id
        }).length > 0

        // фильтр по лектору
        let speakerCondition = !this.search.speaker || lecture.speaker.name.indexOf(this.search.speaker) >= 0

        // фильтр по дате
        // + (86400000 * 2) – для фикса бага библиотеки
        // https://github.com/charliekassel/vuejs-datepicker/issues/118
        let dateCondition = !this.search.date || lecture.date === this.formatDate(this.search.date.getTime() + (86400000 * 2))

        return schoolCondition && speakerCondition && dateCondition
      })
    },
    // получить уникальные школы из расписания для генерации опций в select-фильтре
    schools () {
      return _.uniqBy(_.flatten(this.lectures.map(lecture => lecture.schools)), 'id')
    },
    ...mapState(['lectures', 'title'])
  }
}
</script>

<style lang='scss'>
  .schedule {
    width: 90%;
    margin: 20px auto;
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    td {
      text-overflow: ellipsis;
      padding: 10px 15px;
      border-bottom: 1px solid #CCCCCC;
    }
  }
  .school-list {
    color: #BDBDBD;
    font-size: 10px;
  }
  .workplace {
    color: $gray;
    margin-left: 3px;
  }
  .filter {
    max-width: 830px;
    margin: 0 auto;
    padding: 20px 100px;
    display: flex;
    &__elem {
      flex: 1;
      margin-right: 10px;
    }
  }
  input {
    box-sizing: border-box;
    font-size: 14px;
    width: 100%;
    border: 1px solid $gray;
    padding: .4em 10px;
    outline: 0;
    border-radius: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-appearance: none;
    &:focus {
      border-color: #d0ba65;
      -webkit-box-shadow: 0 0 10px #fc0;
      box-shadow: 0 0 10px #fc0;
    }
  }
  .select-wrapper {
    padding: 0;
    margin: 0;
    padding: 3px 10px;
    border: 1px solid $gray;
    overflow: hidden;
    background-color: #fff;
    background: url("/static/img/dropdown.svg") no-repeat 98% 50%;
  }
  select {
    font-size: 14px;
    padding-bottom: 2px;
    width: 130%;
    border: none;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    &:focus {
      outline: none;
    }
  }
  .datepicker {
    & .calendar {
      & .cell:not(.blank):not(.disabled).day:hover {
        border-color: $yellow;
      }
      & .cell.selected {
        background-color: $yellow;
        color: white;
      }
    }
  }
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  .loading {
    display: inline-block;
    width: 50px;
    height: 50px;
    -webkit-animation-name: spin;
    animation-name: spin;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    &-wrapper {
      text-align: center;
      padding: 120px 0;
    }
    &-inner {
      position: absolute;
      top: 0;
      left: 50%;
      overflow: hidden;
      width: 100%;
      height: 100%;
      &:before {
        position: absolute;
        top: 0;
        left: -50%;
        width: 100%;
        height: 100%;
        content: '';
        border-radius: 100%;
        box-shadow: inset 0 0 0 2px #fc0;
      }
    }
  }
  @media only screen and (min-device-width : 320px) and (max-device-width : 1000px) {
    .filter {
      padding: 20px;
      width: 100%;
      box-sizing: border-box;
      display: block;
      &__elem {
        width: 100%;
        margin-bottom: 10px;
      }
    }
    .schedule {
      font-size: 12px;
      width: auto;
    }
    .workplace {
      display: none;
    }
  }
  @media (max-device-width: 1024px) {
    .schedule {
      width: auto;
    }
  }
  /* Portrait */
  @media only screen
    and (min-device-width: 320px)
    and (max-device-width: 480px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) {
      .schedule {
        td {
          padding: 10px;
        }
      }
  }
</style>
