<template>
  <div class="calendar">
    <div
      class="calendar__overlay"
      @click="$emit('calendarOverlayClicked')"
    ></div>
    <div class="calendar__holder">
      <div class="calendar__header">
        <div
          class="calendar__arrow calendar__arrow--previous"
          @click="onPreviousClick"
        ></div>
        <span class="calendar__header-label">{{ headerLabel }}</span>
        <div
          class="calendar__arrow calendar__arrow--next"
          @click="onAddClick"
        ></div>
      </div>
      <div class="calendar__weekdays">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="calendar__weekday"
        >
          {{ weekday }}
        </div>
      </div>
      <div class="calendar__grid">
        <div class="calendar__week" v-for="(week, index) in weeks" :key="index">
          <div
              class="calendar__day"
              v-for="(day, index) in week"
              :key="index"
              :class="{
                'calendar__day--inactive' : day.outOfMonth,
                'calendar__day--today' : day.isToday
              }"
          >
            {{ day.number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

const MAX_NUMBER_OF_WEEKS_IN_MONTH = 6;
const NUMBER_OF_DAYS_IN_WEEK = 7;

interface Week {
  number: number;
  outOfMonth: boolean;
  isToday: boolean;
}

@Component
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
    return`${moment(this.calendarDate.month, 'M').format('MMMM')} - ${this.calendarDate.year}`;
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

  onAddClick(): void {
    this.currentDate.add(1, 'M');
    this.setCalendarDate();
    this.setDaysInMonth();
  }

  createArrayDaysInMonth(): Week[][] {
    let today = parseInt(moment().format('D'));
    let momentDate = moment(this.currentDate);
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
          isToday: monthDay === today,
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

  &__header {
    display: flex;
    height: 50px;
    background: $oceanGreen;
  }

  &__arrow {
    width: 30px;
    height: 30px;
    background: #000;
  }

  &__weekdays {
    display: flex;
    justify-content: center;
  }

  &__weekday {
    width: 14%;
  }

  &__grid {
    display: flex;
    flex-direction: column;
  }

  &__week {
    height: 50px;
    display: flex;
    justify-content: center;
  }

  &__day {
    width: 14%;

    &--inactive {
      color: #999;
    }

    &--today {
      color: $oceanGreen;
    }
  }
}
</style>
