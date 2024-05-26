import styles from './Content.module.scss';
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentDateAtom, rangeAtom, viewAtom} from "../../store/atoms";
import MonthView from "./Grid/MonthView/MonthView";
import WeekView from "./Grid/WeekView/WeekView";
import DayView from "./Grid/DayView/DayView";
import {useQuery} from "@tanstack/react-query";
import {getEvents} from "../../services/FastApi";
import {IEvent} from "../../types/type";
import { Placeholder } from 'rsuite'

const Content = () => {
    const view = useRecoilValue(viewAtom);
    const currentDate = useRecoilValue(currentDateAtom);
    const { data: events } = useQuery<IEvent[]>({ queryKey: ['events', ], queryFn: () => getEvents({ dateFrom: currentDate.startOf('month'), dateTo: currentDate.endOf('month') }) });

    return <div className={styles.root}>
        {
            view === 'month' &&
                events ? <MonthView events={events}/> : <>
                <Placeholder.Graph active className={styles.month} /></>

        }

        {
            // view === 'week' && <WeekView/>
        }

        {
            // view === 'day' && <DayView/>
        }
    </div>
}

export default Content;
