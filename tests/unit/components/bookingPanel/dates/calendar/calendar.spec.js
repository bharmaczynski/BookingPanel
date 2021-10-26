import { shallowMount } from '@vue/test-utils';
import { advanceTo, clear } from 'jest-date-mock';
import Calendar from '@/components/bookingPanel/dates/calendar/Calendar.vue';
import * as CalendarService from '@/services/calendar/calendar';
import Vue from 'vue';

describe('Calendar', () => {
    let propsData;

    function createWrapper(propsData = {}, methods = {}) {
        return shallowMount(Calendar, {
            propsData,
            methods,
            stubs: ['Header', 'Weekdays', 'Day', 'ErrorInfo'],
        });
    }

    beforeEach(() => {
        advanceTo('2021-10-10');

        propsData = {
            unavailableDates: ['20-10-2021', '21-10-2021'],
            checkedDate: {
                checkIn: '',
                checkOut: '',
            },
        };
    });

    afterAll(() => {
        clear();
    });

    describe('Snapshots', () => {
        it('should match initial snapshot', () => {
            const wrapper = createWrapper(propsData);

            expect(wrapper.vm.$el).toMatchSnapshot();
        });
    });

    describe('Created hook', () => {
        let setDaysInMonth;
        let setPastDaysTemporaryUnavailable;
        let wrapper;

        beforeEach(() => {
            setDaysInMonth = jest.fn();
            setPastDaysTemporaryUnavailable = jest.fn();
            propsData = {
                unavailableDates: ['20-10-2021', '21-10-2021'],
                checkedDate: {
                    checkIn: '13-10-2021',
                    checkOut: '',
                },
            };
            wrapper = createWrapper(propsData, { setDaysInMonth, setPastDaysTemporaryUnavailable });
        });

        it('should call setDaysInMonth', () => {
            expect(setDaysInMonth).toHaveBeenCalled();
        });

        it('should set clickedDate in case there is this.checkedDate.checkIn and this is not this.checkedDate.checkOut', () => {
            expect(wrapper.vm.clickedDate).toEqual({
                checkIn: '13-10-2021',
                checkOut: '',
            });
        });

        it('should set clickCounter to 1', () => {
            expect(wrapper.vm.clickCounter).toEqual(1);
        });

        it('should call setPastDaysTemporaryUnavailable with proper param', () => {
            expect(setPastDaysTemporaryUnavailable).toHaveBeenCalledWith('13-10-2021');
        });
    });

    describe('Methods', () => {
        describe('setCalendarDate', () => {
            it('should set this.calendarDate to proper value', () => {
                const wrapper = createWrapper(propsData);

                wrapper.vm.setCalendarDate();

                expect(wrapper.vm.calendarDate).toEqual({ month: 10, year: 2021 });
            });
        });

        describe('onPreviousClick', () => {
            let wrapper;
            let setCalendarDate;
            let setDaysInMonth;

            beforeEach(() => {
                setCalendarDate = jest.fn();
                setDaysInMonth = jest.fn();
                wrapper = createWrapper(propsData, { setCalendarDate, setDaysInMonth });
            });

            it('should set this.currentDate to previous month', () => {
                wrapper.vm.onPreviousClick();

                expect(wrapper.vm.currentDate).toMatchInlineSnapshot(`"2021-09-10T00:00:00.000Z"`);
            });

            it('should call setDaysInMonth', () => {
                wrapper.vm.onPreviousClick();

                expect(setCalendarDate).toHaveBeenCalled();
            });

            it('should call setCalendarDate', () => {
                wrapper.vm.onPreviousClick();

                expect(setDaysInMonth).toHaveBeenCalled();
            });
        });

        describe('onNextClick', () => {
            let wrapper;
            let setCalendarDate;
            let setDaysInMonth;
            let checkInvalidPickedDays;
            let resetClickedDate;
            let isValid;
            let isValidMock = false;
            let setPastDaysTemporaryUnavailable;

            beforeEach(() => {
                setCalendarDate = jest.fn();
                setDaysInMonth = jest.fn();
                checkInvalidPickedDays = jest.fn();
                resetClickedDate = jest.fn();
                isValid = jest.fn(() => isValidMock);
                setPastDaysTemporaryUnavailable = jest.fn();

                // wrapper = createWrapper(propsData, {
                //     setCalendarDate,
                //     setDaysInMonth,
                //     checkInvalidPickedDays,
                //     resetClickedDate,
                //     isValid,
                // });
            });

            it('should set this.pickedDateIsValid to false in case isValid returns false', () => {
                wrapper = createWrapper(propsData, { isValid });
                wrapper.vm.onNextClick();

                expect(wrapper.vm.pickedDateIsValid).toEqual(false);
            });

            it('should set this.pickedDateIsValid to true in case isValid returns false', () => {
                isValidMock = true;
                wrapper = createWrapper(propsData, { isValid });
                wrapper.vm.onNextClick();

                expect(wrapper.vm.pickedDateIsValid).toEqual(true);
            });

            it('should call checkInvalidPickedDays in case this.clickCounter = 1', () => {
                wrapper = createWrapper(propsData, { checkInvalidPickedDays });
                wrapper.vm.clickedDate.checkIn = '20-10-2021';
                wrapper.vm.clickCounter = 1;
                wrapper.vm.onNextClick();

                expect(checkInvalidPickedDays).toHaveBeenCalledWith('20-10-2021', '06-11-2021');
            });

            describe('in case this.pickedDateIsValid = true', () => {
                it('should set this.currentDate to next month', () => {
                    isValidMock = true;
                    wrapper = createWrapper(propsData, { isValid });
                    wrapper.vm.onNextClick();

                    expect(wrapper.vm.currentDate).toMatchInlineSnapshot(
                        `"2021-11-10T01:00:00.000Z"`
                    );
                });

                it('should call setDaysInMonth', () => {
                    isValidMock = true;
                    wrapper = createWrapper(propsData, { isValid, setCalendarDate });
                    wrapper.vm.onNextClick();

                    expect(setCalendarDate).toHaveBeenCalled();
                });

                it('should call setCalendarDate', () => {
                    isValidMock = true;
                    wrapper = createWrapper(propsData, { isValid, setDaysInMonth });
                    wrapper.vm.onNextClick();

                    expect(setDaysInMonth).toHaveBeenCalled();
                });

                it('should call setPastDaysTemporaryUnavailable', () => {
                    isValidMock = true;
                    wrapper = createWrapper(propsData, {
                        isValid,
                        setPastDaysTemporaryUnavailable,
                    });
                    wrapper.vm.clickedDate.checkIn = '20-10-2021';
                    wrapper.vm.onNextClick();

                    expect(setPastDaysTemporaryUnavailable).toHaveBeenCalledWith('20-10-2021');
                });
            });

            describe('in case this.pickedDateIsValid = false', () => {
                it('should set this.clickCounter to 0', () => {
                    isValidMock = false;
                    wrapper = createWrapper(propsData, { isValid });
                    wrapper.vm.onNextClick();

                    expect(wrapper.vm.clickCounter).toEqual(0);
                });

                it('should call resetClickedDate', () => {
                    isValidMock = false;
                    wrapper = createWrapper(propsData, { isValid, resetClickedDate });
                    wrapper.vm.onNextClick();

                    expect(resetClickedDate).toHaveBeenCalled();
                });

                it('should call emit with proper params', () => {
                    isValidMock = false;
                    wrapper = createWrapper(propsData, { isValid, resetClickedDate });
                    wrapper.vm.$emit = jest.fn();
                    wrapper.vm.clickedDate.checkIn = '20-10-2021';
                    wrapper.vm.onNextClick();

                    expect(wrapper.vm.$emit).toHaveBeenCalledWith('input', {
                        checkIn: '20-10-2021',
                        checkOut: '',
                    });
                });
            });
        });

        describe('setDaysInMonth', () => {
            let createArrayDaysInMonthMock;
            let setUnavailableDates;
            let setBetweenDays;

            beforeEach(() => {
                setBetweenDays = jest.fn();
                setUnavailableDates = jest.fn();
                createArrayDaysInMonthMock = jest.spyOn(CalendarService, 'createArrayDaysInMonth');
            });

            it('should call setDaysInMonth', () => {
                const wrapper = createWrapper(propsData);

                wrapper.vm.setDaysInMonth();

                expect(createArrayDaysInMonthMock).toHaveBeenCalledWith('10-10-2021', {
                    month: 10,
                    year: 2021,
                });
            });

            it('should call setUnavailableDates', () => {
                const wrapper = createWrapper(propsData, { setUnavailableDates });

                wrapper.vm.setDaysInMonth();

                expect(setUnavailableDates).toHaveBeenCalled();
            });

            it('should call setBetweenDays', () => {
                const wrapper = createWrapper(propsData, { setBetweenDays });

                wrapper.vm.setDaysInMonth();

                expect(setBetweenDays).toHaveBeenCalled();
            });
        });

        describe('setUnavailableDates', () => {
            it('should set unavailble days in weeks array', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [
                        { value: '10-10-2021', unavailable: false },
                        { value: '11-10-2021', unavailable: false },
                    ],
                    [
                        { value: '20-10-2021', unavailable: false },
                        { value: '21-10-2021', unavailable: false },
                        { value: '27-10-2021', unavailable: false },
                    ],
                ];

                wrapper.vm.setUnavailableDates();

                expect(wrapper.vm.weeks).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        Object {
                          "unavailable": false,
                          "value": "10-10-2021",
                        },
                        Object {
                          "unavailable": false,
                          "value": "11-10-2021",
                        },
                      ],
                      Array [
                        Object {
                          "unavailable": true,
                          "value": "20-10-2021",
                        },
                        Object {
                          "unavailable": true,
                          "value": "21-10-2021",
                        },
                        Object {
                          "unavailable": false,
                          "value": "27-10-2021",
                        },
                      ],
                    ]
                `);
            });
        });

        describe('removeBetween', () => {
            it('should set isBetween property to false for all days in weeks array', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ isBetween: false }, { isBetween: true }],
                    [{ isBetween: true }, { isBetween: true }, { isBetween: false }],
                ];

                wrapper.vm.removeBetween();

                expect(wrapper.vm.weeks).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        Object {
                          "isBetween": false,
                        },
                        Object {
                          "isBetween": false,
                        },
                      ],
                      Array [
                        Object {
                          "isBetween": false,
                        },
                        Object {
                          "isBetween": false,
                        },
                        Object {
                          "isBetween": false,
                        },
                      ],
                    ]
                `);
            });
        });

        describe('setPastDaysTemporaryUnavailable', () => {
            it('should set temporaryUnavailable property to true for past days in weeks array from given date', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ value: '10-10-2021' }, { value: '11-10-2021' }],
                    [{ value: '20-10-2021' }, { value: '21-10-2021' }, { value: '27-10-2021' }],
                ];

                wrapper.vm.setPastDaysTemporaryUnavailable('21-10-2021');

                expect(wrapper.vm.weeks).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        Object {
                          "temporaryUnavailable": true,
                          "value": "10-10-2021",
                        },
                        Object {
                          "temporaryUnavailable": true,
                          "value": "11-10-2021",
                        },
                      ],
                      Array [
                        Object {
                          "temporaryUnavailable": true,
                          "value": "20-10-2021",
                        },
                        Object {
                          "temporaryUnavailable": false,
                          "value": "21-10-2021",
                        },
                        Object {
                          "temporaryUnavailable": false,
                          "value": "27-10-2021",
                        },
                      ],
                    ]
                `);
            });
        });

        describe('removePastDaysUnavailable', () => {
            it('should set temporaryUnavailable property to false for all days in weeks array', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ temporaryUnavailable: false }, { temporaryUnavailable: true }],
                    [
                        { temporaryUnavailable: true },
                        { temporaryUnavailable: true },
                        { temporaryUnavailable: false },
                    ],
                ];

                wrapper.vm.removePastDaysUnavailable();

                expect(wrapper.vm.weeks).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        Object {
                          "temporaryUnavailable": false,
                        },
                        Object {
                          "temporaryUnavailable": false,
                        },
                      ],
                      Array [
                        Object {
                          "temporaryUnavailable": false,
                        },
                        Object {
                          "temporaryUnavailable": false,
                        },
                        Object {
                          "temporaryUnavailable": false,
                        },
                      ],
                    ]
                `);
            });
        });

        describe('checkInvalidPickedDays', () => {
            it('should isInvalid property to true for unavailable days between dates', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ value: '10-10-2021' }, { value: '11-10-2021', unavailable: true }],
                    [{ value: '20-10-2021' }, { value: '21-10-2021' }, { value: '27-10-2021' }],
                ];

                wrapper.vm.checkInvalidPickedDays('08-10-2021', '13-10-2021');

                expect(wrapper.vm.weeks).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        Object {
                          "isBetween": true,
                          "isInvalid": undefined,
                          "value": "10-10-2021",
                        },
                        Object {
                          "isBetween": true,
                          "isInvalid": true,
                          "unavailable": true,
                          "value": "11-10-2021",
                        },
                      ],
                      Array [
                        Object {
                          "isBetween": false,
                          "isInvalid": false,
                          "value": "20-10-2021",
                        },
                        Object {
                          "isBetween": false,
                          "isInvalid": false,
                          "value": "21-10-2021",
                        },
                        Object {
                          "isBetween": false,
                          "isInvalid": false,
                          "value": "27-10-2021",
                        },
                      ],
                    ]
                `);
            });
        });

        describe('handleDayClick', () => {
            let removeBetween;
            let setPastDaysTemporaryUnavailable;
            let removePastDaysUnavailable;
            let isValid;
            let isValidMock = false;
            let resetClickedDate;

            beforeEach(() => {
                removeBetween = jest.fn();
                setPastDaysTemporaryUnavailable = jest.fn();
                removePastDaysUnavailable = jest.fn();
                resetClickedDate = jest.fn();
                isValid = jest.fn(() => isValidMock);
            });

            describe('in case clickCounter = 0', () => {
                it('should call removeBetween', () => {
                    const wrapper = createWrapper(propsData, { removeBetween });
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(removeBetween).toHaveBeenCalled();
                });

                it('should call setPastDaysTemporaryUnavailable', () => {
                    const wrapper = createWrapper(propsData, { setPastDaysTemporaryUnavailable });
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(setPastDaysTemporaryUnavailable).toHaveBeenCalledWith('10-10-2021');
                });

                it('should set pickedDateIsValid to true', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.pickedDateIsValid).toEqual(true);
                });

                it('should increment clickCounter', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.clickCounter).toEqual(1);
                });

                it('should set clickedDate to proper value', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.clickedDate).toEqual({ checkIn: '10-10-2021', checkOut: '' });
                });

                it('should emit input event with proper value', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.$emit = jest.fn();
                    wrapper.vm.clickCounter = 0;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.$emit).toHaveBeenCalledWith('input', {
                        checkIn: '10-10-2021',
                        checkOut: '',
                    });
                });
            });

            describe('in case clickCounter = 1', () => {
                it('should call removePastDaysUnavailable', () => {
                    const wrapper = createWrapper(propsData, { removePastDaysUnavailable });
                    wrapper.vm.clickCounter = 1;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(removePastDaysUnavailable).toHaveBeenCalled();
                });

                it('should set this.pickedDateIsValid to true in case isValid returns true', () => {
                    const wrapper = createWrapper(propsData, { isValid });
                    wrapper.vm.clickCounter = 1;
                    isValidMock = true;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.pickedDateIsValid).toEqual(true);
                });

                it('should set this.pickedDateIsValid to false in case isValid returns false', () => {
                    const wrapper = createWrapper(propsData, { isValid });
                    wrapper.vm.clickCounter = 1;
                    isValidMock = false;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.pickedDateIsValid).toEqual(false);
                });

                it('should set clickedDate.checkOut to proper value', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.clickCounter = 1;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.clickedDate.checkOut).toEqual('10-10-2021');
                });

                it('should set this.clickCounter to 0', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.clickCounter = 1;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.clickCounter).toEqual(0);
                });

                it('should emit closeCalendar event in case isValid returns true', () => {
                    const wrapper = createWrapper(propsData, { isValid });
                    wrapper.vm.$emit = jest.fn();
                    wrapper.vm.clickCounter = 1;
                    isValidMock = true;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.$emit).toHaveBeenCalledWith('closeCalendar');
                });

                it('should call resetClickedDate in case isValid returns false', () => {
                    const wrapper = createWrapper(propsData, { isValid, resetClickedDate });
                    wrapper.vm.clickCounter = 1;
                    isValidMock = false;
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(resetClickedDate).toHaveBeenCalled();
                });

                it('should emit input event with proper value', () => {
                    const wrapper = createWrapper(propsData);
                    wrapper.vm.$emit = jest.fn();
                    wrapper.vm.clickCounter = 1;
                    wrapper.vm.clickedDate = { checkIn: '08-10-2021', checkOut: '' };
                    wrapper.vm.handleDayClick('10-10-2021');

                    expect(wrapper.vm.$emit).toHaveBeenCalledWith('input', {
                        checkIn: '08-10-2021',
                        checkOut: '10-10-2021',
                    });
                });
            });
        });

        describe('handleMouseEnter', () => {
            let checkInvalidPickedDays;

            beforeEach(() => {
                checkInvalidPickedDays = jest.fn();
            });

            it('should call checkInvalidPickedDays in case clickCounter = 1', () => {
                const wrapper = createWrapper(propsData, { checkInvalidPickedDays });
                wrapper.vm.clickCounter = 1;
                wrapper.vm.clickedDate.checkIn = '10-10-2021';
                wrapper.vm.handleMouseEnter('20-10-2021');

                expect(checkInvalidPickedDays).toHaveBeenCalledWith('10-10-2021', '20-10-2021');
            });
        });

        describe('isValid', () => {
            it('should return false if any day has isInvalid property set true', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ isInvalid: false }, { isInvalid: true }],
                    [{ isInvalid: false }, { isInvalid: false }],
                ];

                expect(wrapper.vm.isValid()).toEqual(false);
            });

            it('should return true if no day has isInvalid property set true', () => {
                const wrapper = createWrapper(propsData);
                wrapper.vm.weeks = [
                    [{ isInvalid: false }, { isInvalid: false }],
                    [{ isInvalid: false }, { isInvalid: false }],
                ];

                expect(wrapper.vm.isValid()).toEqual(true);
            });
        });

        describe('resetClickedDate', () => {
            let setDaysInMonth;
            let nextTickCallback;
            let wrapper;

            beforeEach(() => {
                setDaysInMonth = jest.fn();
                nextTickCallback = undefined;
                wrapper = createWrapper(propsData, { setDaysInMonth });

                Vue.nextTick = jest.fn((callback) => {
                    nextTickCallback = callback;
                });
            });

            it('should set properties of this.clickedDate to empty string', () => {
                wrapper.vm.clickedDate = {
                    checkIn: 'aaa',
                    checkOut: 'vvvv',
                };

                wrapper.vm.resetClickedDate();

                expect(wrapper.vm.clickedDate).toEqual({ checkIn: '', checkOut: ''});
            });

            it('should set properties of this.clickedDate to empty string', async () => {
                wrapper.vm.resetClickedDate();
                nextTickCallback();

                expect(setDaysInMonth).toHaveBeenCalled();
            });
        });
    });
});
