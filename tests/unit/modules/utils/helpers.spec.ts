import { advanceTo, clear } from 'jest-date-mock';
import { isBetweenDates, isPastDay, isToday } from '@/modules/utils/helpers.ts';

describe('helpers', () => {
    beforeEach(() => {
        advanceTo('2021-10-10');
    });

    afterEach(() => {
        clear();
    });

    describe('isBetweenDates', () => {
        it('should return true in case given date is between given dates', () => {
            expect(isBetweenDates('20-10-2021', '25-10-2021', '22-10-2021')).toBe(true);
        });

        it('should return true in case given date is not between given dates', () => {
            expect(isBetweenDates('20-10-2021', '25-10-2021', '27-10-2021')).toBe(false);
        });
    });

    describe('isPastDay', () => {
        it('should return true in case given date is from past', () => {
            expect(isPastDay('05-10-2021')).toBe(true);
        });

        it('should return false in case given date is not from past', () => {
            expect(isPastDay('15-10-2021')).toBe(false);
        });
    });

    describe('isToday', () => {
        it('should return true in case given date is today', () => {
            expect(isToday('10-10-2021')).toBe(true);
        });

        it('should return false in case given date is not today', () => {
            expect(isToday('15-10-2021')).toBe(false);
        });
    });
});
