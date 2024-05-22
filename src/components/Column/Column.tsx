import React from 'react';
import styles from './Column.module.scss';
import Filters from "./Filters/Filters";
import { useRecoilState, useRecoilValue } from "recoil";
import { calendarAtom, currentDateAtom, viewAtom } from "../../store/atoms";
import { AnimatePresence, motion } from "framer-motion";
import 'dayjs/locale/ru';
import { Badge, Calendar } from "rsuite";
import dayjs, { Dayjs } from 'dayjs';

interface Todo {
    time: string;
    title: string;
}

function getTodoList(date: Date): Todo[] {
    const day = date.getDate();

    switch (day) {
        case 10:
            return [
                { time: '10:30 am', title: 'Meeting' },
                { time: '12:00 pm', title: 'Lunch' }
            ];
        case 15:
            return [
                { time: '09:30 pm', title: 'Products Introduction Meeting' },
                { time: '12:30 pm', title: 'Client entertaining' },
                { time: '02:00 pm', title: 'Product design discussion' },
                { time: '05:00 pm', title: 'Product test and acceptance' },
                { time: '06:30 pm', title: 'Reporting' },
                { time: '10:00 pm', title: 'Going home to walk the dog' }
            ];
        default:
            return [];
    }
}

const Column = () => {
    const [visible, setVisible] = useRecoilState(calendarAtom);
    const [selectedDate, setSelectedDate] = useRecoilState<Dayjs>(currentDateAtom);
    const view = useRecoilValue(viewAtom);

    function renderCell(date: Date): React.ReactNode {
        const list = getTodoList(date);

        if (list.length) {
            return <Badge color={'orange'} className="calendar-todo-item-badge" />;
        }

        return null;
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div key={String(visible)} className={styles.root}>
                    <Calendar
                        compact
                        bordered
                        renderCell={renderCell}
                        style={{ width: '300px'}}
                        isoWeek
                        value={selectedDate.toDate()} // Set the Calendar value
                        onSelect={(date) => setSelectedDate(dayjs(date))} // Handle date selection
                    />
                    {view !== 'day' && <Filters />}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Column;
