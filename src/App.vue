<template>
  <div id="app">
    <BookingPanel
        :price="298"
        :number-of-rates="123"
        :rating="4.5" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookingPanel from '@/components/BookingPanel/BookingPanel.vue';

@Component({
  components: {
    BookingPanel,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: $font-size-base;
  box-sizing: border-box;
}
</style>
