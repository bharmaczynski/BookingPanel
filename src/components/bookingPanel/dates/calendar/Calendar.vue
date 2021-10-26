<template>
    <div class="calendar">
        <div class="calendar__overlay" @click="$emit('calendarOverlayClicked')" />
        <div class="calendar__holder">
            <Header
                :headerLabel="headerLabel"
                @previousArrowClicked="onPreviousClick"
                @nextArrowClicked="onNextClick"
            />
            <Weekdays :weekdays="weekdays" />
            <div class="calendar__grid">
                <div v-for="(week, index) in weeks" :key="index" class="calendar__week">
                    <div
                        v-for="(day, dayIndex) in week"
                        :key="`${day.value}-${dayIndex}`"
                        class="calendar__day"
                    >
                        <Day
                            :day="day"
                            :checkedDate="checkedDate"
                            @click="handleDayClick"
                            @mouseEnter="handleMouseEnter"
                        />
                    </div>
                </div>
            </div>
            <ErrorInfo v-if="!pickedDateIsValid" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment, { Moment } from 'moment';
import Header from '@/components/bookingPanel/dates/calendar/header/Header.vue';
import Weekdays from '@/components/bookingPanel/dates/calendar/weekdays/Weekdays.vue';
import Day from '@/components/bookingPanel/dates/calendar/day/Day.vue';
import ErrorInfo from '@/components/bookingPanel/dates/calendar/errorInfo/ErrorInfo.vue';
import { createArrayDaysInMonth } from '@/services/calendar/calendar';
import { isBetweenDates } from '@/modules/utils/helpers';
import IDay from '@/ts/types/day.type';
import IDate from '@/ts/types/date.type.ts';
import ICalendarDate from '@/ts/types/calendarDate.type.ts';

@Component({
    components: {
        Header,
        Weekdays,
        Day,
        ErrorInfo,
    },
})
export default class Calendar extends Vue {
    @Prop({ default: [] })
    unavailableDates!: string[];

    @Prop({ default: { checkIn: '', checkOut: '' } })
    checkedDate!: IDate;

    private currentDate: Moment = moment();
    private calendarDate: ICalendarDate = {
        month: this.currentDate.month() + 1,
        year: this.currentDate.year(),
    };

    private weekdays: string[] = moment.weekdaysShort();
    private weeks: IDay[][] = [];
    private clickCounter: number = 0;
    private clickedDate: IDate = { checkIn: '', checkOut: '' };
    private pickedDateIsValid: boolean = true;

    created(): void {
        this.setDaysInMonth();
        if (this.checkedDate.checkIn && !this.checkedDate.checkOut) {
            this.clickedDate = { ...this.checkedDate };
            this.clickCounter = 1;
            this.setPastDaysTemporaryUnavailable(this.clickedDate.checkIn);
        }
    }

    get headerLabel(): string {
        return `${moment(this.calendarDate.month, 'M').format('MMMM')} ${this.calendarDate.year}`;
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
            this.checkInvalidPickedDays(
                this.clickedDate.checkIn,
                this.weeks[this.weeks.length - 1][6].value
            );
        }

        this.pickedDateIsValid = this.isValid();

        if (this.pickedDateIsValid) {
            this.currentDate.add(1, 'M');
            this.setCalendarDate();
            this.setDaysInMonth();
            this.setPastDaysTemporaryUnavailable(this.clickedDate.checkIn);
        } else {
            this.clickCounter = 0;
            this.resetClickedDate();
            this.$emit('input', this.clickedDate);
        }
    }

    setDaysInMonth(): void {
        this.weeks = createArrayDaysInMonth(
            this.currentDate.format('DD-MM-YYYY'),
            this.calendarDate
        );
        this.setUnavailableDates();
        this.setBetweenDays();
    }

    setUnavailableDates(): void {
        this.weeks.map((week) => {
            week.map((day) => {
                if (this.unavailableDates.includes(day.value)) day.unavailable = true;
            });
        });
    }

    removeBetween(): void {
        this.weeks.map((week) => {
            week.map((day) => {
                day.isBetween = false;
            });
        });
    }

    setPastDaysTemporaryUnavailable(fromDate: string): void {
        this.weeks.map((week) => {
            week.map((day) => {
                day.temporaryUnavailable =
                    moment(day.value, 'DD-MM-YYYY').diff(moment(fromDate, 'DD-MM-YYYY'), 'days') <
                    0;
            });
        });
    }

    removePastDaysUnavailable(): void {
        this.weeks.map((week) => {
            week.map((day) => {
                day.temporaryUnavailable = false;
            });
        });
    }

    checkInvalidPickedDays(fromDate: string, toDate: string): void {
        this.weeks.map((week) => {
            week.map((day) => {
                day.isBetween = isBetweenDates(fromDate, toDate, day.value);
                day.isInvalid = isBetweenDates(fromDate, toDate, day.value) && day.unavailable;
            });
        });
    }

    handleDayClick(value: string): void {
        if (this.clickCounter === 0) {
            this.removeBetween();
            this.setPastDaysTemporaryUnavailable(value);

            this.pickedDateIsValid = true;
            this.clickCounter++;
            this.clickedDate = {
                checkIn: value,
                checkOut: '',
            };
        } else if (this.clickCounter === 1) {
            this.removePastDaysUnavailable();
            this.pickedDateIsValid = this.isValid();
            this.clickedDate.checkOut = value;
            this.clickCounter = 0;
            this.pickedDateIsValid ? this.$emit('closeCalendar') : this.resetClickedDate();
        }

        this.$emit('input', this.clickedDate);
    }

    handleMouseEnter(value: string): void {
        if (this.clickCounter === 1) {
            this.checkInvalidPickedDays(this.clickedDate.checkIn, value);
        }
    }

    setBetweenDays(): void {
        this.weeks.map((week) => {
            week.map((day) => {
                day.isBetween = isBetweenDates(
                    this.checkedDate.checkIn,
                    this.checkedDate.checkOut,
                    day.value
                );
            });
        });
    }

    isValid(): boolean {
        return !this.weeks.some((week) => week.some((day) => day.isInvalid));
    }

    resetClickedDate(): void {
        this.clickedDate = { checkIn: '', checkOut: '' };
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
        background: $alto;
    }

    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: rgb($black, 0.5);
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
            background: $foam;
            color: $downy;

            &::before {
                right: 19px !important;
            }
        }

        &--inactive {
            color: $gray;
        }

        &--today {
            color: $downy;
            border: 2px solid $downy;
        }

        &--unavailable {
            color: rgba(#333, 0.3);
            pointer-events: none;
        }

        &--between {
            color: $downy;
            background: $foam;

            &::before {
                content: '';
                display: block;
                position: absolute;
                z-index: -1;
                top: -2px;
                right: 19px;
                bottom: -2px;
                left: -19px;
                background: $foam;
            }
        }

        &--start,
        &--end {
            background: $downy;
            color: $white;
        }

        &--invalid {
            color: $guardsman;
            border: 2px solid red;
        }
    }
}
</style>
