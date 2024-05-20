import dayjs, {Dayjs} from "dayjs";
import {atom} from "recoil";

export const currentDateAtom = atom<Dayjs>({
    key: 'currentDateAtom',
    default: dayjs(),
});

export const viewAtom = atom<'day'| 'week'| 'month'>({
    key: 'viewAtom',
    default: 'month',
});


export const filtersAtom = atom<number[]>({
    key: 'filtersAtom',
    default: [],
});

export const calendarAtom = atom<boolean>({
    key: 'calendarAtom',
    default: true,
});

export const rangeAtom = atom<{from: Dayjs, to: Dayjs}>({
    key: 'rangeAtom',
    default: {from: dayjs(), to: dayjs()},
});