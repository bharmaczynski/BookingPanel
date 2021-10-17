import { shallowMount } from "@vue/test-utils";
import Dates from '@/components/BookingPanel/Dates/Dates.vue'

describe('Dates', () => {
    let propsData: {
        date: {
            checkIn: string;
            checkOut: string;
        };
        unavailableDates?: string[] | [];
    }

    beforeEach(() => {
        propsData = {
            date: {
                checkIn: '10-10-2021',
                checkOut: '12-10-2021',
            },
        }
    });

    function createWrapper(propsData = {}) {
        return shallowMount(Dates,  {
            propsData
        })
    }

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        })

        it('should match snapschot in case unavailableDates is given and calendarIsOpen = true', () => {
            propsData = {
                ...propsData,
                unavailableDates: ['14-10-2021', '16-10-2021']
            }

            const wrapper = createWrapper(propsData);
            wrapper.setData({ calendarIsOpen: true });

            expect(wrapper.vm.calendarIsOpen).toMatchSnapshot();
        })
    });
})
