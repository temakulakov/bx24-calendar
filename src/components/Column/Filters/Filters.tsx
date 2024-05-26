import React, { useEffect, useState } from "react";
import styles from './Filters.module.scss';
import { useQuery } from "@tanstack/react-query";
import { getBuilds, getGoogleCalendar, getRooms } from "../../../services/FastApi";
import { useRecoilState } from "recoil";
import { filtersAtom } from "../../../store/atoms";
import { Accordion, Placeholder, Checkbox } from "rsuite";

interface Build {
    id: number;
    title: string;
}

interface Room {
    id: number;
    title: string;
    section: number;
    color: string;
}

const Filters: React.FC = () => {
    const { data: builds, isLoading: isLoadingBuilds, error: errorBuilds } = useQuery<Build[]>({
        queryKey: ['builds'],
        queryFn: getBuilds
    });

    const { data: rooms, isLoading: isLoadingRooms, error: errorRooms } = useQuery<Room[]>({
        queryKey: ['rooms'],
        queryFn: getRooms
    });

    const { data: holidays, isLoading: isLoadingHolidays, error: errorHolidays } = useQuery({
        queryKey: ['google'],
        queryFn: () => getGoogleCalendar({ googleUrl: 'https://calendar.google.com/calendar/ical/ru.russian%23holiday%40group.v.calendar.google.com/public/basic.ics' })
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
                    <Accordion
                    >
                        {
                            builds.map(build =>
                                <Accordion.Panel
                                    key={build.id}
                                    header={build.title}
                                    expanded={viewRooms.includes(build.id)}
                                    defaultExpanded
                                    onSelect={() => viewRooms.includes(build.id) ? setViewRooms(prev => prev.filter(id => id !== build.id)) : setViewRooms(prev => [...prev, build.id])}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {
                                            rooms && rooms.filter(room => room.section === build.id).map(room => (
                                                <div
                                                    key={room.id}
                                                    style={{ '--rs-blue-500': room.color } as React.CSSProperties}
                                                >
                                                    <Checkbox
                                                        color="blue"
                                                        onChange={() => filters.includes(room.id) ? setFilters(prev => prev.filter(id => id !== room.id)) : setFilters(prev => [...prev, room.id])}
                                                        checked={filters.includes(room.id)}
                                                        className={styles.checkboxCustom}
                                                    >
                                                        {room.title}
                                                    </Checkbox>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        rooms === undefined && <Placeholder.Paragraph rows={3} />
                                    }
                                </Accordion.Panel>
                            )
                        }
                        <Accordion.Panel
                            header={'Другие календари'}
                            expanded={viewRooms.includes(0)}
                            defaultExpanded
                            onSelect={() => viewRooms.includes(0) ? setViewRooms(prev => prev.filter(id => id !== 0)) : setViewRooms(prev => [...prev, 0])}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {
                                    rooms && <div
                                            style={{ '--rs-blue-500': '#FA8900' } as React.CSSProperties}
                                        >
                                            <Checkbox
                                                color="blue"
                                                onChange={() => filters.includes(0) ? setFilters(prev => prev.filter(id => id !== 0)) : setFilters(prev => [...prev, 0])}
                                                checked={filters.includes(0)}
                                                className={styles.checkboxCustom}
                                            >
                                                {'Праздники'}
                                            </Checkbox>
                                        </div>

                                }
                            </div>
                            {
                                rooms === undefined && <Placeholder.Paragraph rows={3} />
                            }
                        </Accordion.Panel>
                    </Accordion>
                ) : <Placeholder.Paragraph rows={5} />
            }
        </div>
    );
}

export default Filters;
