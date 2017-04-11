<template>
  <div id="app">
    <div class="header">
      <router-link v-if="$route.name != 'schedule'" class='header__go-home' :to="{name: 'schedule'}">
        <span class='header__go-home--text'>на главную</span>
        <span class='header__go-home--image'></span>
      </router-link>
      <h1>{{ title }}</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    title () {
      return this.$store.state.title
    }
  }
}
</script>

<style lang='scss'>
  #app {
    min-width: $min-width;
    max-width: $max-width;
  }
  h1 {
    text-align: center;
    padding: 20px;
    margin: 0;
  }
  .header {
    width: 100%;
    text-align: center;
    background-color: $red;
    color: white;
    padding: 0 100px;
    height: 78px;
    position: relative;
    box-sizing: border-box;
    &__go-home {
      color: white;
      text-transform: uppercase;
      opacity: .6;
      float: left;
      position: absolute;
      display: flex;
      align-items: center;
      height: 100%;
      transition: opacity .15s ease-in-out;
      &:hover {
        color: white;
        opacity: 1;
      }
      &--image {
        background: url('/static/img/back.svg');
        width: 30px;
        height: 30px;
        background-size: 30px;
        display: none;
      }
    }
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 1024px) {
    html, body {
      overflow-x: hidden;
    }
    body {
      position: relative;
      font-size: 16px;
    }
    h1 {
      padding: 20px 25px;
      font-size: 30px;
    }
    #app {
      min-width: auto;
    }
    .header {
      padding: 0;
      height: auto;
      &__go-home {
        &--text {
          display: none;
        }
        &--image {
          display: block;
        }
      }
    }
  }
</style>
