import { advanceTo, clear } from 'jest-date-mock';
import { createArrayDaysInMonth } from '@/services/calendar/calendar.ts';

describe('calendar', () => {
    beforeEach(() => {
        advanceTo('2021-10-10');
    });

    afterEach(() => {
        clear();
    });

    describe('createArrayDaysInMonth', () => {
        it('should prepare weeks arrays of days array', () => {
            expect(createArrayDaysInMonth('20-10-2021', { month: 10, year: 2021 }))
                .toMatchInlineSnapshot(`
                Array [
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 26,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "26-09-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 27,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "27-09-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 28,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "28-09-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 29,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "29-09-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 30,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "30-09-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 1,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "01-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 2,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "02-10-2021",
                    },
                  ],
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 3,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "03-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 4,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "04-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 5,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "05-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 6,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "06-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 7,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "07-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 8,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "08-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 9,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "09-10-2021",
                    },
                  ],
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": true,
                      "number": 10,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "10-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 11,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "11-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 12,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "12-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 13,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "13-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 14,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "14-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 15,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "15-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 16,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "16-10-2021",
                    },
                  ],
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 17,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "17-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 18,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "18-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 19,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "19-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 20,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "20-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 21,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "21-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 22,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "22-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 23,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "23-10-2021",
                    },
                  ],
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 24,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "24-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 25,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "25-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 26,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "26-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 27,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "27-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 28,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "28-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 29,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "29-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 30,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "30-10-2021",
                    },
                  ],
                  Array [
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 31,
                      "outOfMonth": false,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "31-10-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 1,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "01-11-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 2,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "02-11-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 3,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "03-11-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 4,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "04-11-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 5,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "05-11-2021",
                    },
                    Object {
                      "isBetween": false,
                      "isInvalid": false,
                      "isToday": false,
                      "number": 6,
                      "outOfMonth": true,
                      "temporaryUnavailable": false,
                      "unavailable": false,
                      "value": "06-11-2021",
                    },
                  ],
                ]
            `);
        });
    });
});