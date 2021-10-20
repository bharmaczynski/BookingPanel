import { shallowMount } from '@vue/test-utils';
import Dates from '@/components/BookingPanel/Dates/Dates.vue';

describe('Dates', () => {
    let propsData;

    beforeEach(() => {
        propsData = {
            date: {
                checkIn: '10-10-2021',
                checkOut: '12-10-2021',
            },
        };
    });

    function createWrapper(propsData = {}) {
        return shallowMount(Dates, {
            propsData,
            stubs: ['Calendar', 'DateInput'],
        });
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        });

        it('should match snapschot in case unavailableDates is given and calendarIsOpen = true', async () => {
            propsData = {
                ...propsData,
                unavailableDates: ['14-10-2021', '16-10-2021']
            };

            const wrapper = createWrapper(propsData);

            await wrapper.setData({ calendarIsOpen: true });

            expect(wrapper.vm.$el).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = createWrapper(propsData);
        });

        describe('openCalendar', () => {
            it('should set calendarIsOpen to true', () => {
                wrapper.vm.openCalendar();

                expect(wrapper.vm.calendarIsOpen).toBe(true);
            });
        });

        describe('closeCalendar', () => {
            it('should set calendarIsOpen to true', () => {
                wrapper.vm.closeCalendar();

                expect(wrapper.vm.calendarIsOpen).toBe(false);
            });
        });

        describe('closeCalendar', () => {
            it('should emit event with proper value', () => {
                wrapper.vm.$emit = jest.fn();
                wrapper.vm.handleCalendarInput({
                    checkIn: '10-10-2021',
                    checkOut: '12-10-2021',
                });

                expect(wrapper.vm.$emit).toHaveBeenCalledWith('dateChanged', {
                    checkIn: '10-10-2021',
                    checkOut: '12-10-2021',
                });
            });
        });
    });
});
