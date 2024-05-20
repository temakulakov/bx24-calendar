import styles from './Content.module.scss';
import React from "react";
import {useRecoilValue} from "recoil";
import {viewAtom} from "../../store/atoms";
import MonthView from "./Grid/MonthView/MonthView";
import WeekView from "./Grid/WeekView/WeekView";
import DayView from "./Grid/DayView/DayView";

const Content = () => {
    const view = useRecoilValue(viewAtom);
    return <div className={styles.root}>
        {
            view === 'month' && <MonthView/>
        }

        {
            view === 'week' && <WeekView/>
        }

        {
            view === 'day' && <DayView/>
        }
    </div>
}

export default Content;
