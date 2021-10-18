import moment from 'moment';
import IWeek from '@/ts/types/day.type';

const MAX_NUMBER_OF_WEEKS_IN_MONTH = 6;
const NUMBER_OF_DAYS_IN_WEEK = 7;

export const createArrayDaysInMonth = (
    currentDate: moment,
    calendarDate: { month: string; year: string }
): IWeek[][] => {
    const today = moment().format('DD-MM-YYYY');
    const momentDate = moment(currentDate);
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

                outOfMonthDay = moment(calendarDate.month, 'M')
                    .subtract(numberOfDayBeforeThisMonth, 'days')
                    .format('DD-MM-YYYY');
            } else if (monthEnded && day > numberOfWeekdayForLastDayInMonth) {
                const numberOfDayAfterThisMonth = day - numberOfWeekdayForLastDayInMonth;

                outOfMonthDay = moment(calendarDate.month, 'M')
                    .endOf('month')
                    .add(numberOfDayAfterThisMonth, 'days')
                    .format('DD-MM-YYYY');
            }

            weekArray.push({
                number:
                    monthDay !== 0 ? monthDay : parseInt(outOfMonthDay.toString().substring(0, 2)),
                outOfMonth: monthDay === 0,
                isToday:
                    moment(`${monthDay}-${currentMonthYeay}`, 'DD-MM-YYYY').format('DD-MM-YYYY') ===
                    today,
                unavailable: false,
                value:
                    monthDay !== 0
                        ? `${monthDay.toString().padStart(2, '0')}-${currentMonthYeay}`
                        : `${outOfMonthDay}`,
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
