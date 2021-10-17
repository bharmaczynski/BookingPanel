<template>
  <div id="app">
    <BookingPanel
      :price="298"
      :number-of-rates="123"
      :rating="4.5"
      :unavailableDates="['21-10-2021', '30-10-2021', '15-11-2021']"
      :pickedDate="date"
      @dateChanged="onDateChanged"
      @bookButtonClicked="handleBookButtonClick"
    />
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
export default class App extends Vue {
  private date: { checkIn: string; checkOut: string } = {
    checkIn: '',
    checkOut: '',
  };

  onDateChanged(date: { checkIn: string; checkOut: string }): void {
    this.date = date;
  }

  handleBookButtonClick(): void {
    (this.date.checkIn && this.date.checkOut)
        ? alert(`Selected dates: ${this.date.checkIn} - ${this.date.checkOut}`)
        : alert('Please select date')
  }
}
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
