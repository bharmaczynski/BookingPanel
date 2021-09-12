<template>
  <div class="booking-panel">
    <div class="booking-panel__content-wrapper">
      <div class="booking-panel__header">
        <span class="booking-panel__price text--bold font-size-xxl">
          {{ price }} zł
        </span>
        <Rating :numberOfRates="123" :rating="4.5" />
      </div>
      <Dates :date="date" @dateChanged="onDateChanged" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Dates from '@/components/BookingPanel/Dates/Dates.vue';
import Rating from '@/components/BookingPanel/Rating/Rating.vue';

@Component({
  components: {
    Dates,
    Rating,
  },
})
export default class BookingPanel extends Vue {
  private date: { checkIn: string; checkOut: string } = {
    checkIn: '',
    checkOut: '',
  };

  @Prop({ required: true })
  price!: number;

  @Prop({ default: 0 })
  numberOfRates!: number;

  onDateChanged(date: { checkIn: string; checkOut: string }): void {
    this.date = date;

    console.log('###onDateChanged this.date', this.date);
  }
}
</script>
<style lang="scss" scoped>
.booking-panel {
  width: 340px;
  padding: 20px 25px;
  margin: 0 auto;
  border: 1px solid $alto;

  &__content-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px solid $alto;
  }
}
</style>
