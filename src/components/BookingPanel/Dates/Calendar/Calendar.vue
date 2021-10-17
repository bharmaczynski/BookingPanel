<template>
  <div class="calendar">
    <div
      class="calendar__overlay"
      @click="$emit('calendarOverlayClicked')"
    />
    <div class="calendar__holder">
      <Header
        :headerLabel="headerLabel"
        @previousArrowClicked="onPreviousClick"
        @nextArrowClicked="onNextClick">
      </Header>
      <Weekdays :weekdays="weekdays" />
      <div class="calendar__grid">
        <div class="calendar__week" v-for="(week, index) in weeks" :key="index">
          <div
              class="calendar__day"
              v-for="(day, index) in week"
              :key="index">
            <div
              class="calendar__day-holder"
              :class="{
                'calendar__day-holder--inactive' : day.outOfMonth,
                'calendar__day-holder--today' : day.isToday,
                'calendar__day-holder--unavailable' : setPastDay(day.value) || day.unavailable || day.temporaryUnavailable,
                'calendar__day-holder--start' : day.value === checkedDate.checkIn,
                'calendar__day-holder--end' : day.value === checkedDate.checkOut,
                'calendar__day-holder--between' : day.isBetween,
                'calendar__day-holder--invalid' : day.isInvalid,
              }"
              @click="handleClick(day.value)"
              @mouseenter="handleMouseEnter(day.value)">
              <span class="calendar__day-text font-size-s">{{ day.number }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!pickedDateIsValid" class="calendar__validation">
        <p>Select other days</p>
        <span>Selected date includes unavailable days</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import moment from 'moment';
import Header from '@/components/BookingPanel/Dates/Calendar/Header/Header.vue'
import Weekdays from "@/components/BookingPanel/Dates/Calendar/Weekdays/Weekdays.vue";
import { createArrayDaysInMonth } from "@/services/calendar/calendar";
import { isBetweenDates, isPastDay } from "@/modules/utils/helpers";
import IWeek from "@/ts/types/week.type";

@Component({
  components: {
    Header,
    Weekdays,
  }
})
export default class Calendar extends Vue {
  @Prop({ default: [] })
  unavailableDates!: string[];

  @Prop({ default: { checkIn: '', checkOut: ''} })
  checkedDate!: {
    checkIn: string;
    checkOut: string;
  };

  private currentDate = moment();
  private calendarDate = {
    month: this.currentDate.month() + 1,
    year: this.currentDate.year(),
  };
  private weekdays = moment.weekdaysShort();
  private weeks: IWeek[][] = [];
  private clickCounter = 0;
  private clickedDate: { checkIn: string; checkOut: string} = { checkIn: '', checkOut: ''}
  private pickedDateIsValid = true;

  created(): void {
    this.setDaysInMonth();
    if (this.checkedDate.checkIn && !this.checkedDate.checkOut) {
      this.clickedDate = { ...this.checkedDate };
      this.clickCounter = 1;
      this.setPastDaysTemporaryUnavailable(this.clickedDate.checkIn);
    }
  }

  get headerLabel(): string {
    return`${moment(this.calendarDate.month, 'M').format('MMMM')} ${this.calendarDate.year}`;
  }

  setCalendarDate(): void {
    this.calendarDate.month = this.currentDate.month() + 1;
    this.calendarDate.year = this.currentDate.year();
  }

  onPreviousClick(): void {
    this.currentDate.subtract(1, 'M');
    this.setCalendarDate();
    this.setDaysInMonth();
  }

  onNextClick(): void {
    if (this.clickCounter === 1) {
      this.checkInvalidPickedDays(this.clickedDate.checkIn, this.weeks[this.weeks.length - 1][6].value);
      this.clickCounter = 0;
      this.resetClickedDate()
      this.$emit('input', this.clickedDate)
    }

    this.pickedDateIsValid = this.isValid();

    if (this.pickedDateIsValid) {
      this.currentDate.add(1, 'M');
      this.setCalendarDate();
      this.setDaysInMonth();
    }
  }

  setDaysInMonth(): void {
    this.weeks = createArrayDaysInMonth(this.currentDate, this.calendarDate);
    this.setUnavailableDates();
    this.setBetweenDays();
  }

  setUnavailableDates(): void {
    this.weeks.map(week => {
      week.map(day => {
        if (this.unavailableDates.includes(day.value)) day.unavailable = true;
      });
    });
  }

  removeBetween(): void {
    this.weeks.map(week => {
      week.map(day => {
        day.isBetween = false;
      });
    });
  }

  setPastDaysTemporaryUnavailable(fromDate: string): void {
    this.weeks.map(week => {
      week.map(day => {
        day.temporaryUnavailable = moment(day.value, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') < 0;
      });
    });
  }

  removePastDaysUnavailable(): void {
    this.weeks.map(week => {
      week.map(day => {
        day.temporaryUnavailable = false;
      });
    });
  }

  checkInvalidPickedDays(fromDate: string, toDate: string): void {
    this.weeks.map(week => {
      week.map(day => {
        day.isBetween = isBetweenDates(fromDate, toDate, day.value);
        day.isInvalid = isBetweenDates(fromDate, toDate, day.value) && day.unavailable;
      });
    });
  }

  handleClick(value: string): void {
    if (this.clickCounter === 0) {
      this.pickedDateIsValid = true;
      this.clickCounter++;
      this.removeBetween();
      this.setPastDaysTemporaryUnavailable(value);
      this.clickedDate = {
        checkIn: value,
        checkOut: '',
      }
    } else if (this.clickCounter === 1) {
      this.pickedDateIsValid = this.isValid();
      this.clickedDate.checkOut = value
      this.clickCounter = 0;
      this.removePastDaysUnavailable();
      this.pickedDateIsValid ? this.$emit('closeCalendar') : this.resetClickedDate();
    }

    this.$emit('input', this.clickedDate)
  }

  handleMouseEnter(value: string): void {
    if (this.clickCounter === 1) {
      this.checkInvalidPickedDays(this.clickedDate.checkIn, value);
    }
  }

  setBetweenDays(): void {
    this.weeks.map(week => {
      week.map(day => {
        day.isBetween = isBetweenDates(this.checkedDate.checkIn, this.checkedDate.checkOut, day.value);
      });
    });
  }

  setPastDay(date: string): boolean {
    return isPastDay(date);
  }

  isValid(): boolean {
    return !this.weeks.some(week => week.some(day => day.isInvalid))
  }

  resetClickedDate(): void {
    this.clickedDate = { checkIn: '', checkOut: ''}
    Vue.nextTick(this.setDaysInMonth);
  }
}
</script>
<style lang="scss" scoped>
.calendar {
  $root: &;

  &__holder {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 100;
    width: 100%;
    background: #ddd;
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: rgb(#000, 0.5);
    cursor: pointer;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    overflow: hidden;
  }

  &__week {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  &__day {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:last-child {
      #{$root}__day-holder--between {
        &::before {
          right: -2px;
        }

        &#{$root}__day-holder--end {
          &::before {
            right: 19px;
          }
        }
      }
    }
  }

  &__day-holder {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
      background: #CFFCF8;
      color: $downy;

      &::before {
        right: 19px !important;
      }
    }

    &--inactive {
      color: #888;
    }

    &--today {
      color: $downy;
      border: 2px solid $downy;
    }

    &--unavailable {
      color: rgba(#333, .3);
      pointer-events: none;
    }

    &--between {
      color: $downy;
      background: #CFFCF8;

      &::before {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        top: -2px;
        right: 19px;
        bottom: -2px;
        left: -19px;
        background: #CFFCF8;
      }
    }

    &--start, &--end {
      background: $downy;
      color: #fff;
    }

    &--invalid {
      color: #CA0B00;
      border: 2px solid red;
    }
  }

  &__day-text {
    font-weight: 500;
  }

  &__validation {
    padding: 10px 10px 20px;
    color: #CA0B00;
    p {
      text-transform: uppercase;
      margin-bottom: 5px;
    }
  }
}
</style>
