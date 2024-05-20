import axios from 'axios';
import {Room, GoogleUrl, DateRange, DateFrom, Holiday, ReportRoom, IEvent, Build} from '../types/type';

const api = axios.create({
    baseURL: 'http://185.247.18.121:8000/calendar/',
    // baseURL: 'http://0.0.0.0:8000/calendar/',
});

export const getRooms = async (): Promise<Room[]> => {
    const response = await api.post<{ data: Room[] }>('/rooms');
    return response.data.data;
};

export const getEvents = async (dateRange: DateRange): Promise<IEvent[]> => {
    const response = await api.post<{ data: IEvent[]}>('/events', dateRange);
    return response.data.data;
};

export const getGoogleCalendar = async (googleUrl: GoogleUrl = { googleUrl: 'https://calendar.google.com/calendar/ical/ru.russian%23holiday%40group.v.calendar.google.com/public/basic.ics' }): Promise<Holiday[]> => {
    const response = await api.post<{ data: Holiday[] }>('/google', googleUrl);
    return response.data.data; // Вернуть данные о праздниках
};

export const getReportDay = async (dateFrom: DateFrom): Promise<ReportRoom[]> => {
    const response = await api.post<{ data: ReportRoom[] }>('/report/day', dateFrom);
    return response.data.data;
};

export const getReportRange = async (dateRange: DateRange): Promise<ReportRoom[]> => {
    const response = await api.post<{ data: ReportRoom[] }>('/report/range', dateRange);
    return response.data.data;
};

export const getBuilds = async (): Promise<Build[]> => {
    const response = await api.post<{ data: Build[] }>('/builds');
    return response.data.data;
};