import { shallowMount } from '@vue/test-utils';
import Day from '@/components/bookingPanel/dates/calendar/day/Day.vue';
import * as helpers from '@/modules/utils/helpers';

describe('Day', () => {
    let propsData;

    beforeEach(() => {
        propsData = {
            day: {
                number: 2,
                outOfMonth: false,
                isToday: false,
                unavailable: false,
                value: '02-02-2021',
                isBetween: false,
                temporaryUnavailable: false,
                isInvalid: false,
            },
            checkedDate: {
                checkIn: '10-10-2021',
                checkOut: '12-10-2021',
            },
        };
    });

    function createWrapper(propsData = {}) {
        return shallowMount(Day, {
            propsData,
        });
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        let wrapper;
        let isPastDayMock = true;

        beforeEach(() => {
            wrapper = createWrapper(propsData);
            wrapper.vm.$emit = jest.fn();
            helpers.isPastDay = jest.fn(() => isPastDayMock);
        });

        describe('handleDayClick', () => {
            it('should emit event with proper value', () => {
                wrapper.vm.handleDayClick('02-02-2021');

                expect(wrapper.vm.$emit).toHaveBeenCalledWith('click', '02-02-2021');
            });
        });

        describe('handleMouseEnter', () => {
            it('should emit event with proper value', () => {
                wrapper.vm.handleMouseEnter('02-02-2021');

                expect(wrapper.vm.$emit).toHaveBeenCalledWith('mouseEnter', '02-02-2021');
            });
        });

        describe('setPastDay', () => {
            it('should return true in case helpers.isPastDay is true', () => {
                expect(wrapper.vm.setPastDay('12-12-2002')).toBe(true);
            });

            it('should return proper value', () => {
                isPastDayMock = false;
                expect(wrapper.vm.setPastDay('12-12-2002')).toBe(false);
            });
        });
    });
});
