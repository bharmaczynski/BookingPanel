<template>
  <div class="calendar">
    <div
      class="calendar__overlay"
      @click="$emit('calendarOverlayClicked')"
    ></div>
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
              :key="index"

          >
            <div
              class="calendar__day-holder"
              :class="{
                'calendar__day-holder--inactive' : day.outOfMonth,
                'calendar__day-holder--today' : day.isToday
              }"
            >
              <span class="calendar__day-text font-size-s">{{ day.number }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import Header from '@/components/BookingPanel/Dates/Calendar/Header/Header.vue'
import Weekdays from "@/components/BookingPanel/Dates/Calendar/Weekdays/Weekdays.vue";

const MAX_NUMBER_OF_WEEKS_IN_MONTH = 6;
const NUMBER_OF_DAYS_IN_WEEK = 7;

interface Week {
  number: number;
  outOfMonth: boolean;
  isToday: boolean;
}

@Component({
  components: {
    Header,
    Weekdays,
  }
})
export default class Calendar extends Vue {
  private currentDate = moment();
  private calendarDate = {
    month: this.currentDate.month() + 1,
    year: this.currentDate.year(),
  };
  private weekdays = moment.weekdaysShort();
  private weeks: Week[][] = [];

  created(): void {
    this.setDaysInMonth();
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
    this.currentDate.add(1, 'M');
    this.setCalendarDate();
    this.setDaysInMonth();
  }

  createArrayDaysInMonth(): Week[][] {
    const today = moment().format('DD-MM-YYYY');
    let momentDate = moment(this.currentDate);
    const currentMonthYeay = momentDate.format('MM-YYYY');
    let monthEnded = false;
    let monthStarted = false;
    let monthDay = 0;
    let outOfMonthDay = 0;

    const weeks = [];
    const numberOfWeekdayForFirstDayInMonth = momentDate.startOf('month').weekday() + 1;
    const numberOfWeekdayForLastDayInMonth = momentDate.endOf('month').weekday() + 1;
    const daysInMonth = momentDate.daysInMonth();

    // prepare array of weeks in month
    for (let weekNumber = 1; weekNumber <= MAX_NUMBER_OF_WEEKS_IN_MONTH && !monthEnded; weekNumber++) {
      const weekArray = [];

      // prepare array of days in week
      for (let day = 1; day <= NUMBER_OF_DAYS_IN_WEEK; day++) {
        if (!monthStarted && day >= numberOfWeekdayForFirstDayInMonth) {
          monthDay++;
          monthStarted = true;
        } else if (monthStarted && !monthEnded) {
          monthDay++;
        }

        // set days that are out of month
        if (weekNumber === 1 && day < numberOfWeekdayForFirstDayInMonth) {
          const numberOfDayBeforeThisMonth = numberOfWeekdayForFirstDayInMonth - day;

          outOfMonthDay =
              moment(this.calendarDate.month, 'M')
                  .subtract(numberOfDayBeforeThisMonth, 'days')
                  .format('D');

        } else if (monthEnded && day > numberOfWeekdayForLastDayInMonth) {
          const numberOfDayAfterThisMonth = day - numberOfWeekdayForLastDayInMonth;

          outOfMonthDay =
              moment(this.calendarDate.month, 'M')
                  .endOf('month')
                  .add(numberOfDayAfterThisMonth, 'days')
                  .format('D');
        }

        weekArray.push({
          number: monthDay !== 0 ? monthDay : outOfMonthDay,
          outOfMonth: monthDay === 0,
          isToday: moment(`${monthDay}-${currentMonthYeay}`, 'DD-MM-YYYY').format('DD-MM-YYYY') === today,
        })

        if (monthStarted && !monthEnded && monthDay >= daysInMonth) {
          monthDay = 0;
          monthEnded = true;
        }
      }

      weeks.push(weekArray);
    }

    return weeks;
  }

  setDaysInMonth(): void {
    this.weeks = this.createArrayDaysInMonth();
  }
}
</script>
<style lang="scss" scoped>
.calendar {
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
    background: rgb(#000, 0.8);
  }

  &__grid {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
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

  }

  &__day-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
      //border: 1px solid $downy;

    &--inactive {
      color: #999;
    }

    &--today {
      color: $downy;
      //color: #fff;
      border: 1px solid $downy;
      //background: $downy;
    }
  }

  &__day-text {
    font-weight: 500;
  }
}
</style>
