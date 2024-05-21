import React from 'react';
import './App.css';
import styles from './App.module.scss';
import Column from "./components/Column/Column";
import Content from "./components/Content/Content";
import Header from "./components/Content/Header/Header";
import {useRecoilValue} from "recoil";
import {calendarAtom} from "./store/atoms";
import ReportModal from "./components/Modals/ReportModal/ReportModal";

function App() {
    const calendar = useRecoilValue(calendarAtom)
    return (
        <div className={styles.root}>
            <Header/>
            <div className={styles.row}>
                <Content/>
                {
                    calendar && <Column/>
                }
            </div>
            <ReportModal/>
        </div>
    );
};

export default App;

