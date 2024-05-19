import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        primary: {
            main: '#9D2135', // Основной цвет для вашей темы
        },
        text: {
            primary: '#000', // Основной цвет текста
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: '#DADCE0', // Цвет границы для кнопок
                    color: 'black', // Цвет текста кнопок
                    '&:hover': {
                        backgroundColor: 'rgba(157, 33, 53, 0.04)', // Немного светлее основного цвета при наведении
                    },
                },
            },
        },
    },
});


root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
    <App />
                </ThemeProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
