<template>
  <div class='speaker-wrapper' v-if='speaker !== null'>
    <div class='speaker-info'>
      <div>
        <img class='speaker-info__photo' :src='speaker.photo_url'>
      </div>
      <div>
        <div class='speaker-info__workplace'>
          <div>{{ speaker.description }}</div>
          <div>{{ speaker.workplace }}</div>
        </div>
      </div>
    </div>
    <div class="speaker-lectures" ng-show='speaker'>
      <h2>Доклады:</h2>
      <ul>
          <li v-for='lecture in speaker.lectures'>
            <router-link v-if='lecture.conducted' :to="{name: 'lectures', params: {id: lecture.id}}">{{ lecture.topic }}</router-link>
            <span v-else>{{ lecture.topic }}</span>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      speaker: null
    }
  },
  created () {
    this.$http.get(process.env.API_HOST + 'speakers/' + this.$route.params.id).then(response => {
      this.speaker = response.body
      this.$store.commit('title', this.speaker.name)
    }, error => {
      this.$router.push('/' + error.status)
    })
  }
}
</script>

<style lang='scss' scoped>
  .speaker-info {
    width: 60%;
    float: left;
    display: flex;
    align-items: center;
  }
  .speaker-wrapper {
    margin: 0 auto;
    padding: 40px 100px;
    line-height: 25px;
  }
  .speaker-info__photo {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid $gray;
    margin-right: 30px;
  }
  .speaker-info__workplace {
    color: $gray;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 1000px) {
    .speaker-wrapper {
      padding: 20px;
      & > div {
        width: 100%;
      }
    }
    .speaker-info {
      border-bottom: 1px solid rgba($gray, .5);
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
  }
</style>
