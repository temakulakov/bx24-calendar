import styles from './Header.module.scss';
import {useRecoilState} from "recoil";
import {calendarAtom, currentDateAtom, reportModalAtom, viewAtom} from "../../../store/atoms";
import PieChartIcon from '@rsuite/icons/PieChart';
import React, {useState} from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuIcon from '@rsuite/icons/Menu';
import {Months, MonthsOf} from "../../../consts/date";
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import dayjs from "dayjs";
import {Button, ButtonGroup, ButtonToolbar, Dropdown, Heading, IconButton} from "rsuite";

const Header = () => {
    const [ view, setView ] = useRecoilState(viewAtom);
    const [ currentDate, setCurrentDate ] = useRecoilState(currentDateAtom);
    const [ calendar, setCalendar ] = useRecoilState(calendarAtom);

    const [ anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [ reportModal, setReportModal ] = useRecoilState(reportModalAtom);

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
            <Heading level={3}>
                {
                    currentDateTitle()
                }
            </Heading>
            <Dropdown title={viewTextButton()}>
                <Dropdown.Item shortcut="M" onClick={() => setView('month')}>{'Месяц'}</Dropdown.Item>
                <Dropdown.Item shortcut="W" onClick={() => setView('week')}>{'Неделя'}</Dropdown.Item>
                <Dropdown.Item shortcut="D" onClick={() => setView('day')}>{'День'}</Dropdown.Item>
            </Dropdown>
        </div>


        <div className={styles.row}>
            <IconButton icon={<PieChartIcon />} onClick={() => setReportModal(true)}>Отчеты</IconButton>

                <ButtonToolbar>
                    <ButtonGroup>
                        <IconButton
                            onClick={() => changeTime(false)}
                            icon={<PagePreviousIcon/>}
                        />
                        <Button
                            onClick={() => setCurrentDate(dayjs())}
                        >Сегодня</Button>
                        <IconButton
                            onClick={() => changeTime(true)}
                            icon={<PagePreviousIcon style={{ transform: 'rotate(180deg)'}}/>}
                        />
                    </ButtonGroup>
                </ButtonToolbar>
                <IconButton appearance="link" onClick={() => setCalendar(prev => !prev)} icon={<MenuIcon />} />
        </div>

    </div>
}

export default Header;
