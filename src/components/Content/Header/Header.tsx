import styles from './Header.module.scss';
import {useRecoilState} from "recoil";
import {calendarAtom, currentDateAtom, viewAtom} from "../../../store/atoms";
import {Button, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Months, MonthsOf} from "../../../consts/date";
import dayjs from "dayjs";

const Header = () => {
    const [ view, setView ] = useRecoilState(viewAtom);
    const [ currentDate, setCurrentDate ] = useRecoilState(currentDateAtom);
    const [ calendar, setCalendar ] = useRecoilState(calendarAtom);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const viewTextButton = () => {
        switch (view) {
            case "day":
                return 'День'
            case "week":
                return 'Неделя'
            case "month":
                return 'Месяц'
        }
    }


    const currentDateTitle = () => {
        switch (view) {
            case "month":
                return `${Months[currentDate.month()]} ${currentDate.year()}`;
            case "week":
                return `${currentDate.startOf('week').date() + 1} - ${currentDate.endOf('week').date() + 1} ${MonthsOf[currentDate.month()]} ${currentDate.year()}`;
            case "day":
                return `${currentDate.date()} ${MonthsOf[currentDate.month()]} ${currentDate.year()}`;
        }
    }

    const changeTime = (type: boolean) => {
        switch (view) {
            case "month":
                type ? setCurrentDate(prev => prev.add(1, 'month')) : setCurrentDate(prev => prev.subtract(1, 'month'))
                break;
            case "week":
                type ? setCurrentDate(prev => prev.add(1, 'week')) : setCurrentDate(prev => prev.subtract(1, 'week'))
                break;
            case "day":
                type ? setCurrentDate(prev => prev.add(1, 'day')) : setCurrentDate(prev => prev.subtract(1, 'day'))
                break;
        }
    }


    return <div className={styles.root}>
        <div className={styles.row}>
            <div className={styles.title}>
                {
                    currentDateTitle()
                }
            </div>
            <Button
                endIcon={<ArrowDropDownOutlinedIcon/>}
                className={styles.btnMenu}
                onClick={handleClick}
            >{viewTextButton()}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    setView('month')
                    handleClose()
                }}>{'M - Месяц'}</MenuItem>
                <MenuItem onClick={() => {
                    setView('week')
                    handleClose()
                }}>{'W - Неделя'}</MenuItem>
                <MenuItem onClick={() => {
                    setView('day')
                    handleClose()
                }}>{'D - День'}</MenuItem>
            </Menu>
        </div>


        <div className={styles.row}>
            <Button className={styles.btnMenu} onClick={() => setCurrentDate(dayjs())}>
                {'Сегодня'}
            </Button>
            <Button
                onClick={() => changeTime(false)}>
                <ArrowBackIosNewOutlinedIcon/>
            </Button>
            <Button
                onClick={() => changeTime(true)}>
                <ArrowBackIosNewOutlinedIcon sx={{transform: 'rotate(180deg)', height: '70%'}}/>
            </Button>
            <Button onClick={() => setCalendar(prev => !prev)}><MenuOutlinedIcon/></Button>
        </div>

    </div>
}

export default Header;
