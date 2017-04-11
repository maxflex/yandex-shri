<template>
  <div ng-if='lecture !== null'>
    <div class='youtube-video'>
      <iframe :src="'https://www.youtube.com/embed/' + lecture.material.video + '?rel=0&amp;controls=0&amp;showinfo=0'" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="lecture-wrapper">
      <div class='speaker-info'>
        <div>
          <img class='speaker-info__photo' :src='lecture.speaker.photo_url'>
        </div>
        <div>
          <div>
            <router-link :to="{name: 'speakers', params: {id: lecture.speaker.id}}">
              {{ lecture.speaker.name }}
            </router-link>
          </div>
          <div class='speaker-info__workplace'>
            <div>{{ lecture.speaker.description }}</div>
            <div>{{ lecture.speaker.workplace }}</div>
          </div>
        </div>
      </div>
      <div class="lecture-info">
        <div>
          {{ formatDate(lecture.date, 'D MMMM') }}
          <span class='dot-separator'></span>
          с {{ formatDate(lecture.time_start, 'HH:mm') }} по {{ formatDate(lecture.time_end, 'HH:mm') }}
          <span class='dot-separator'></span>
          {{ lecture.students_count | pluralize('человек', 'человека', 'человек')}}
        </div>
        <div>
          Аудитория «{{ lecture.auditorium.name }}»
        </div>
        <div>
          {{ lecture.auditorium.address }}
        </div>
      </div>
      <div class="school-info">
        <div v-for='school in lecture.schools'>
          {{ school.name }}
        </div>
      </div>
      <div class='material'>
        <a :href='lecture.material.link' target='_blank' title='скачать материалы лекции'>
          <img class='material-download' src='static/img/pdf.png'>
          <span>Cкачать материалы</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HelpersMixin from '@/mixins/HelpersMixin'

export default {
  mixins: [HelpersMixin],
  data () {
    return {
      lecture: null
    }
  },
  created () {
    this.$http.get(process.env.API_HOST + 'lectures/' + this.$route.params.id).then(response => {
      this.lecture = response.body
      this.$store.commit('title', this.lecture.topic)
    }, error => {
      this.$router.push('/' + error.status)
    })
  }
}
</script>

<style lang='scss' scoped>
  .speaker-info {
    width: 35%;
    float: left;
    display: flex;
    // align-items: center;
    &__photo{
      height: 100px;
      width: 100px;
      border-radius: 50%;
      border: 1px solid $gray;
      margin-right: 30px;
    }
    &__workplace {
      color: $gray;
    }
  }
  .youtube-video {
    text-align: center;
    background: black;
    padding: 25px 0;
    & iframe {
      width: 853px;
      height: 480px;
    }
  }
  .material {
    float: left;
    width: 10%;
    & span {
      display: none;
    }
  }
  .material-download {
    height: 100px;
    width: 100px;
  }
  .dot-separator {
    color: $gray;
    &:after {
      content: ' • ';
    }
  }
  .lecture-wrapper {
    margin: 0 auto;
    padding: 40px 100px;
    line-height: 25px;
  }
  .lecture-info {
    float: left;
    width: 30%;
  }
  .school-info {
    float: left;
    width: 25%;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 1000px) {
    .speaker-info {
      align-items: center;
      border-bottom: 1px solid rgba($gray, .5);
      text-align: left !important;
      padding-bottom: 10px;
    }
    .youtube-video {
      padding: 0;
      & iframe {
        width: 100%;
        height: calc(100vw*9/16);
      }
    }
    .material {
      & img {
        display: none;
      }
      & span {
        display: block;
      }
    }
    .lecture-wrapper {
      padding: 20px;
      & > div {
        text-align: center;
        width: 100%;
        float: none;
        margin-bottom: 20px;
      }
    }
  }
  @media (max-device-width: 1024px) {
    .lecture-wrapper {
      padding: 20px;
    }
  }
</style>
