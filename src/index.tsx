import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RecoilRoot} from "recoil";
import 'rsuite/dist/rsuite.min.css';
import './theme.scss'
import ruRu from 'date-fns/locale/ru';
import {CustomProvider} from "rsuite";


const Calendar = {
    sunday: 'Вс',
    monday: 'Пн',
    tuesday: 'Вт',
    wednesday: 'Ср',
    thursday: 'Чт',
    friday: 'Пт',
    saturday: 'Сб',
    ok: 'Хорошо',
    today: 'Сегодня',
    yesterday: 'Вчера',
    hours: 'Часов',
    minutes: 'Минут',
    seconds: 'Секунд',
    /**
     * Format of the string is based on Unicode Technical Standard #35:
     * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     **/
    formattedMonthPattern: 'MMM-yyyy',
    formattedDayPattern: 'dd-MMM-yyyy',
    dateLocale: ruRu
};

const locale = {
    Calendar,
    DatePicker: {
        ...Calendar
    }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();



root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CustomProvider locale={locale}>
                <RecoilRoot>
                        <App/>
                </RecoilRoot>
            </CustomProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
