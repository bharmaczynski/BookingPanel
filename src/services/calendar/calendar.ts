import moment, { Moment } from 'moment';
import IWeek from '@/ts/types/day.type';
import ICalendarDate from '@/ts/types/calendarDate.type.ts';
import { isToday } from '@/modules/utils/helpers.ts';

const MAX_NUMBER_OF_WEEKS_IN_MONTH = 6;
const NUMBER_OF_DAYS_IN_WEEK = 7;

function getDayFromPreviousMonth(
    dayNumberBeforeStartOfMonth: number,
    numberOfMonth: number
): string {
    return moment(numberOfMonth, 'M')
        .subtract(dayNumberBeforeStartOfMonth, 'days')
        .format('DD-MM-YYYY');
}

function getDayFromNextMonth(dayNumberAfterEndOfMonth: number, numberOfMonth: number): string {
    return moment(numberOfMonth, 'M')
        .endOf('month')
        .add(dayNumberAfterEndOfMonth, 'days')
        .format('DD-MM-YYYY');
}

function setDayNumber(monthDay: number, dayOutsideOfMonth: string): number {
    return monthDay !== 0 ? monthDay : parseInt(dayOutsideOfMonth.toString().substring(0, 2));
}

function setFormattedDate(
    monthDay: number,
    currentMonthYear: string,
    dayOutsideOfMonth: string
): string {
    return monthDay !== 0
        ? moment(`${monthDay}-${currentMonthYear}`, 'D-MM-YYYY').format('DD-MM-YYYY')
        : `${dayOutsideOfMonth}`;
}

export const createArrayDaysInMonth = (
    currentDate: string,
    calendarDate: ICalendarDate
): IWeek[][] => {
    const momentDate: Moment = moment(currentDate, 'DD-MM-YYYY');
    const currentMonthYear: string = momentDate.format('MM-YYYY');
    let monthEnded: boolean = false;
    let monthStarted: boolean = false;
    let monthDay: number = 0;
    let dayOutsideOfMonth: string = '';

    const weeks = [];
    const numberOfWeekdayForFirstDayInMonth = momentDate.startOf('month').weekday() + 1;
    const numberOfWeekdayForLastDayInMonth = momentDate.endOf('month').weekday() + 1;
    const daysInMonth = momentDate.daysInMonth();

    // prepare array of weeks in month
    for (
        let weekNumber = 1;
        weekNumber <= MAX_NUMBER_OF_WEEKS_IN_MONTH && !monthEnded;
        weekNumber++
    ) {
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

                dayOutsideOfMonth = getDayFromPreviousMonth(
                    numberOfDayBeforeThisMonth,
                    calendarDate.month
                );
            } else if (monthEnded && day > numberOfWeekdayForLastDayInMonth) {
                const numberOfDayAfterThisMonth = day - numberOfWeekdayForLastDayInMonth;

                dayOutsideOfMonth = getDayFromNextMonth(
                    numberOfDayAfterThisMonth,
                    calendarDate.month
                );
            }

            weekArray.push({
                number: setDayNumber(monthDay, dayOutsideOfMonth),
                outOfMonth: monthDay === 0,
                isToday: isToday(
                    moment(`${monthDay}-${currentMonthYear}`, 'D-MM-YYYY').format('DD-MM-YYYY')
                ),
                unavailable: false,
                value: setFormattedDate(monthDay, currentMonthYear, dayOutsideOfMonth),
                isBetween: false,
                temporaryUnavailable: false,
                isInvalid: false,
            });

            if (monthStarted && !monthEnded && monthDay >= daysInMonth) {
                monthDay = 0;
                monthEnded = true;
            }
        }

        weeks.push(weekArray);
    }

    return weeks;
};
