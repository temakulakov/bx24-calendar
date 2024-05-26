import React, {useEffect, useRef, useState} from 'react';
import styles from './CellRender.module.scss';
import dayjs from "dayjs";
import {animate} from "framer-motion";
import {useRecoilState} from "recoil";
import {IEvent, Room} from "../../../../../types/type";
import {currentDateAtom, viewAtom} from "../../../../../store/atoms";
import {Months} from "../../../../../consts/date";

interface ICellRenderProps {
    date: string;
    events: IEvent[];
    current: boolean;
    elements: Room[]
}

const CellRender = ({date, events, current, elements}: ICellRenderProps) => {
    const moment = dayjs(date, 'D.M.YYYY');
    const [showMore, setShowMore] = useState(5);
    const containerRef = useRef<HTMLDivElement>(null);
    const [date_, setDate] = useRecoilState(currentDateAtom);
    const [view, setView] = useRecoilState(viewAtom);
    console.log(date)
    console.log(moment)

    useEffect(() => {
        const checkOverflow = () => {
            const container = containerRef.current;
            if (container) {
                // const isOverflowing = (events.length * 45) > container.clientHeight;
                setShowMore(container.clientHeight / 32);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [events]);

    return <div className={`${styles.cell} ${current ? '' : styles.unCurrent}`} ref={containerRef}>
        <div className={styles.root}>
            <div
                onClick={() => {
                    setDate(dayjs(moment));
                    setView('day');
                }}
                className={`${styles.number} ${moment.format('DD.MM.YYYY') === dayjs().format('DD.MM.YYYY') ? styles.current : null} ${moment.date() === 1 ? styles.monthStart : null}`}>
                {
                    moment.date() === 1 ? `${moment.date()} ${Months[moment.month()]}` : moment.date()
                }
            </div>
            <div className={styles.containerEvents}>
                {
                    events.map((el, ind) => {
                        return showMore > (ind + 2.2) && <p key={el.id} className={styles.event}
                                                            style={{backgroundColor: elements.find(ele => ele.id === Number(el.rooms))?.color}}>{el.title}</p>
                    })
                }
                {
                    showMore < events.length + 0.9 &&
                    <button onClick={() => console.log('Show all events')} className={styles.showMoreButton}>Посмотреть
                        все</button>
                }
            </div>
        </div>
    </div>
};

export default CellRender;