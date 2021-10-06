interface IWeek {
    number: number;
    outOfMonth: boolean;
    isToday: boolean;
    unavailable: boolean;
    value: string;
    isBetween: boolean;
    temporaryUnavailable: boolean;
    isInvalid: boolean;
}

export default IWeek;
