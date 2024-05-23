import styles from './Filters.module.scss';
import {useQuery} from "@tanstack/react-query";
import {getBuilds, getGoogleCalendar, getRooms} from "../../../services/FastApi";
import {Button, CircularProgress, Checkbox as MuiCheckbox} from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {filtersAtom} from "../../../store/atoms";
import {Accordion, Placeholder, Checkbox} from "rsuite";

const Filters = () => {
    const {data: builds, isLoading: isLoadingBuilds, error: errorBuilds} = useQuery({
        queryKey: ['builds'],
        queryFn: getBuilds
    });
    const {data: rooms, isLoading: isLoadingRooms, error: errorRooms} = useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms
    });
    const {data: holidays, isLoading: isLoadingHolidays, error: errorHolidays} = useQuery({
        queryKey: ['google'],
        queryFn: () => getGoogleCalendar({googleUrl: 'https://calendar.google.com/calendar/ical/ru.russian%23holiday%40group.v.calendar.google.com/public/basic.ics'})
    });

    const [viewRooms, setViewRooms] = useState<number[]>([]);
    const [filters, setFilters] = useRecoilState(filtersAtom);

    useEffect(() => {
        if (builds) {
            setViewRooms(builds.map(build => build.id));
            setViewRooms(prev => [...prev, 0]);
        }
    }, [isLoadingBuilds, builds]);

    useEffect(() => {
        if (rooms) {
            setFilters(rooms.map(room => room.id));
            setFilters(prev => [...prev, 0]);
        }
    }, [isLoadingRooms, rooms]);

    return (
        <div className={styles.root}>
            {
                builds ? (
                    <Accordion>
                        {
                            builds.map(build =>
                                <Accordion.Panel
                                    key={build.id}
                                    header={build.title}
                                    expanded={viewRooms.includes(build.id)}
                                    defaultExpanded
                                    onSelect={() => viewRooms.includes(build.id) ? setViewRooms(prev => prev.filter(id => id !== build.id)) : setViewRooms(prev => [...prev, build.id])}

                                >
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        {

                                            rooms && rooms.filter(room => room.section === build.id).map(room => (
                                                <Checkbox
                                                    onChange={() => filters.includes(room.id) ? setFilters(prev => prev.filter(id => id !== room.id)) : setFilters(prev => [...prev, room.id])}
                                                    checked={filters.includes(room.id)}
                                                    key={room.id}
                                                >
                                                    {room.title}
                                                </Checkbox>
                                            ))

                                        }
                                    </div>
                                    {
                                        rooms === undefined && <Placeholder.Paragraph rows={3}/>
                                    }
                                </Accordion.Panel>
                            )
                        }
                    </Accordion>
                ) : <Placeholder.Paragraph  rows={5}/>
            }
        </div>
    );
}

export default Filters;