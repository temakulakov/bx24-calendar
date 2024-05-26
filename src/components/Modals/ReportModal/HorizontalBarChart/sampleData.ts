import dayjs from 'dayjs';
import {ReportRoom} from "../../../../types/type";

export const sampleRooms: ReportRoom[] = [
    {
        id: 1,
        color: 'rgba(255, 99, 132, 0.2)',
        title: 'Room 1',
        section: 1,
        dateFrom: dayjs('2023-01-01'),
        dateTo: dayjs('2023-12-31'),
        hours: 100,
        percents: 75,
    },
    {
        id: 2,
        color: 'rgba(54, 162, 235, 0.2)',
        title: 'Room 2',
        section: 1,
        dateFrom: dayjs('2023-01-01'),
        dateTo: dayjs('2023-12-31'),
        hours: 200,
        percents: 50,
    },
    // Добавьте больше комнат по мере необходимости
];
