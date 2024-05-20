import styles from './Column.module.scss';
import Filters from "./Filters/Filters";
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarAtom, currentDateAtom, viewAtom} from "../../store/atoms";
import {AnimatePresence, motion} from "framer-motion";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';


const Column = () => {
    const [ visible, setVisible ] = useRecoilState(calendarAtom);
    const [ selectedDate, setSelectedDate ] = useRecoilState(currentDateAtom);
    const view = useRecoilValue(viewAtom);
    return <AnimatePresence>
        {
            visible && <motion.div key={String(visible)} className={styles.root}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <DateCalendar
                        sx={{transform: 'scale(0.9)', width: '270px'}}
                        value={selectedDate}
                        onChange={(newValue) => {
                            newValue ? setSelectedDate(newValue) : setSelectedDate(prev => prev);
                        }}
                        showDaysOutsideCurrentMonth
                        fixedWeekNumber={6}
                        views={['day', 'month']}
                    />
                </LocalizationProvider>
                {
                    view !== 'day' && <Filters/>
                }
            </motion.div>
        }
    </AnimatePresence>
}

export default Column;
