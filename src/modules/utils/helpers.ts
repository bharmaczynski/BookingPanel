import moment from 'moment';

export const isBetweenDates = (
    dateStart: string,
    dateEnd: string,
    dateToCheck: string
): boolean => {
    // included dateEnd
    return (
        moment(dateToCheck, 'DD-MM-YYYY').diff(moment(dateStart, 'DD-MM-YYYY'), 'days') > 0 &&
        moment(dateToCheck, 'DD-MM-YYYY').diff(moment(dateEnd, 'DD-MM-YYYY'), 'days') <= 0
    );
};

export const isPastDay = (date: string): boolean => {
    return moment(date, 'DD-MM-YYYY').diff(moment(), 'days') < 0;
};

export const isToday = (date: string): boolean => {
    return date === moment().format('DD-MM-YYYY');
};
