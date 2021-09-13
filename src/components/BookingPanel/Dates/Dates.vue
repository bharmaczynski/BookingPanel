<template>
  <div class="dates-input">
    <span class="dates-input__title text--bold">Dates</span>
    <div class="dates-input__dates-holder">
      <div class="dates-input__arrow">
        <ArrowIcon />
      </div>
      <div class="dates-input__input-holder">
        <DateInput
          :value="date.checkIn"
          @input="onInputCheckIn"
          @click.native="openCalendar"
        />
      </div>
      <div class="dates-input__input-holder dates-input__input-holder--checkout font-size-l">
        <DateInput
          :value="date.checkOut"
          @input="onInputCheckOut"
          @click.native="openCalendar"
        />
      </div>
    </div>
    <Calendar
      class="dates-input__calendar"
      v-if="calendarIsOpen"
      @calendarOverlayClicked="closeCalendar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ArrowIcon from '@/assets/icons/arrow-right.svg';
import DateInput from '@/components/BookingPanel/Dates/DateInput/DateInput.vue';
import Calendar from '@/components/BookingPanel/Dates/Calendar/Calendar.vue';

@Component({
  components: {
    ArrowIcon,
    DateInput,
    Calendar,
  },
})
export default class Dates extends Vue {
  private calendarIsOpen = false;

  @Prop({ required: true })
  date!: {
    checkIn: string;
    checkOut: string;
  };

  onInputCheckIn(value: string): void {
    this.$emit('dateChanged', {
      checkIn: value,
      checkOut: this.date.checkOut,
    });
  }

  onInputCheckOut(value: string): void {
    this.$emit('dateChanged', {
      checkIn: this.date.checkIn,
      checkOut: value,
    });
  }

  openCalendar(): void {
    this.calendarIsOpen = true;
  }

  closeCalendar(): void {
    this.calendarIsOpen = false;
  }
}
</script>
<style lang="scss" scoped>
.dates-input {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: flex-start;

  &__dates-holder {
    position: relative;
    display: flex;
    width: 100%;
    border: 1px solid $alto;
    margin-top: 10px;
    transition: border 0.5s ease;

    &:hover {
      border: 1px solid $oceanGreen;
    }
  }

  &__arrow {
    position: absolute;
    z-index: -1;
    top: 9px;
    left: 44%;
    width: 20px;
    height: 17px;

    svg {
      width: 100%;
      height: auto;
    }
  }

  &__input-holder {
    width: 50%;

    &--checkout {
      padding-left: 10px;
    }
  }

  &__calendar {
    position: absolute;
    z-index: 0;
    top: calc(100% + 10px);
    right: 0;
    left: 0;
  }
}
</style>
