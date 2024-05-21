import styles from './Filters.module.scss';
import {useQuery} from "@tanstack/react-query";
import {getBuilds, getGoogleCalendar, getRooms} from "../../../services/FastApi";
import {Button, Checkbox, CircularProgress} from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {filtersAtom} from "../../../store/atoms";

const Filters = () => {
    const { data: builds, isLoading: isLoadingBuilds, error: errorBuilds } = useQuery({ queryKey: ['builds'], queryFn: getBuilds});
    const { data: rooms, isLoading: isLoadingRooms, error: errorRooms } = useQuery({ queryKey: ['rooms'], queryFn: getRooms});
    const { data: holidays, isLoading: isLoadingHolidays, error: errorHoliadays } = useQuery({ queryKey: ['google'], queryFn: () => getGoogleCalendar({googleUrl: 'https://calendar.google.com/calendar/ical/ru.russian%23holiday%40group.v.calendar.google.com/public/basic.ics'}) });

    const [ viewRooms, setViewRooms ] = useState<number[]>([]);
    const [ filters, setFilters ] = useRecoilState(filtersAtom);

    useEffect(() => {
        if (builds) {
            setViewRooms(builds.map(build => build.id));
            setViewRooms(prev => [...prev, 0]);
        }
    }, [isLoadingBuilds]);

    useEffect(() => {
        if (rooms) {
            setFilters(rooms.map(room => room.id));
            setFilters(prev => [...prev, 0]);
        }
    }, [isLoadingRooms]);

    return <div className={styles.root}>
        {
            builds === undefined ? <CircularProgress sx={{margin: '0 auto'}} color="primary" /> : builds.map(build => <div
                className={styles.container}
                key={build.id}>
                <Button
                    onClick={() =>  viewRooms.includes(build.id) ? setViewRooms(prev => prev.filter(prev => prev !== build.id)) : setViewRooms(prev => [...prev, build.id])}
                    className={styles.btnBuild} endIcon={<ArrowDropDownOutlinedIcon sx={{ transform: viewRooms.includes(build.id) ? 'none' : 'rotate(180deg)'}}/>}>
                    {build.title}
                </Button>
                {
                    viewRooms.includes(build.id) && rooms && rooms.filter(room => room.section === build.id).map(room => <Button
                    startIcon={<Checkbox
                        checked={filters.includes(room.id)}
                        sx={{ color: room.color, '&.Mui-checked': {
                                color: room.color,
                            },}}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />}
                    onClick={() => filters.includes(room.id) ? setFilters(prev => prev.filter(prev => prev !== room.id)) : setFilters(prev => [...prev, room.id])}
                    className={styles.btnCheck}
                    key={room.id}>
                        {room.title}
                    </Button>)

                }
                {
                    viewRooms.includes(build.id) && rooms === undefined && <CircularProgress sx={{margin: '0 auto'}} color="primary" />
                }
            </div>)
        }
        {
           <Button
               className={styles.btnBuild}
               onClick={() =>  viewRooms.includes(0) ? setViewRooms(prev => prev.filter(prev => prev !== 0)) : setViewRooms(prev => [...prev, 0])}
               endIcon={<ArrowDropDownOutlinedIcon sx={{ transform: viewRooms.includes(0) ? 'none' : 'rotate(180deg)'}}/>}
           >{'Другие календари'}</Button>
        }

        {
            viewRooms.includes(0) && holidays && <Button
                onClick={() => filters.includes(0) ? setFilters(prev => prev.filter(prev => prev !== 0)) : setFilters(prev => [...prev, 0])}
                className={styles.btnCheck}
                startIcon={<Checkbox
                    checked={filters.includes(0)}
                    sx={{ color: '#d4af37', '&.Mui-checked': {
                            color: '#d4af37',
                        },}}
                    inputProps={{ 'aria-label': 'controlled' }}
                />}
            >{'Праздники'}</Button>
        }
        {
            viewRooms.includes(0) && holidays === undefined && <CircularProgress sx={{margin: '0 auto'}} color="primary" />
        }
    </div>
}

export default Filters;