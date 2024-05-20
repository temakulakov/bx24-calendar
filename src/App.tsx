import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useQuery} from "@tanstack/react-query";
import {Build, Holiday, IEvent, ReportRoom, Room} from "./types/type";
import {getBuilds, getEvents, getGoogleCalendar, getReportDay, getReportRange, getRooms} from "./services/FastApi";
import styles from './App.module.scss';

function App() {
  const { data, error, isLoading } = useQuery<Room[]>({ queryKey: ['rooms'], queryFn: getRooms });
  const { data: holidays, error: errorH, isLoading: isLoadingH } = useQuery<Build[]>({ queryKey: ['holidays'], queryFn: getBuilds })
    console.log(holidays)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <div className={styles.root}>
        {
          holidays && holidays.map(el => <h3 key={el.id}>{el.title}</h3> )
        }
      </div>
  );
};

export default App;

