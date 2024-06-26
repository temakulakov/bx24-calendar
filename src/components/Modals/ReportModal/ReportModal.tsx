import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getBuilds, getReportRange } from "../../../services/FastApi";
import { Build, ReportRoom } from "../../../types/type";
import dayjs, { Dayjs } from "dayjs";

import styles from './ReportModal.module.scss';
import { motion } from 'framer-motion';
import {
    Modal,
    ButtonToolbar,
    Placeholder,
    Steps,
    IconButton,
    InlineEdit,
    TagPicker,
    DateRangePicker, Button
} from 'rsuite';
import { useRecoilState } from 'recoil';
import { reportModalAtom } from '../../../store/atoms';
import PieChartIcon from '@rsuite/icons/PieChart';
import TimeRoundIcon from '@rsuite/icons/TimeRound';
import FunnelIcon from '@rsuite/icons/Funnel';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import { FaCalendar } from "react-icons/fa";
import HorizontalBarChart from "./HorizontalBarChart/HorizontalBarChart";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportModal = () => {
    const [view, setView] = useRecoilState(reportModalAtom);
    const [step, setStep] = React.useState<1 | 2 | 3>(1);
    const [filters, setFilters] = useState<number[]>([]);
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().subtract(1, 'month'), dayjs().add(1, 'month')]);

    const { data: reportRooms, isLoading: isLoadingReportRooms } = useQuery({
        queryKey: ['report-range', dateRange[0].format('DD-MM-YYYY'), dateRange[1].format('DD-MM-YYYY')],
        queryFn: () => getReportRange({ dateFrom: dateRange[0], dateTo: dateRange[1] }),
    });

    const { data: builds, isLoading: isLoadingBuilds } = useQuery({
        queryKey: ['builds'],
        queryFn: getBuilds,
    });

    useEffect(() => {
        if (builds) {
            setFilters(builds.map((build: Build) => build.id));
        }
    }, [isLoadingReportRooms, builds]);

    const onChange = (nextStep: number) => {
        const validStep = nextStep < 1 ? 1 : nextStep > 3 ? 3 : nextStep;
        setStep(validStep as 1 | 2 | 3);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const handleClose = () => {
        setView(false);
        setStep(1);
    };

    const groupRoomsByBuild = (rooms: ReportRoom[], builds: Build[]) => {
        return builds.reduce((acc: { [key: string]: ReportRoom[] }, build) => {
            acc[build.title] = rooms.filter(room => room.section === build.id);
            return acc;
        }, {});
    };

    const groupedRooms = reportRooms && builds ? groupRoomsByBuild(reportRooms, builds) : {};

    return (
        <Modal size={'full'} open={view} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>{'Формирование отчета'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Steps current={step}>
                    <Steps.Item title="Выберите филиалы" icon={<FunnelIcon style={{ height: '30px', width: '30px' }} />} />
                    <Steps.Item title="Выберите промежуток" icon={<TimeRoundIcon style={{ height: '30px', width: '30px' }} />} />
                    <Steps.Item title="Формирование отчета" icon={<PieChartIcon style={{ height: '30px', width: '30px' }} />} />
                </Steps>

                <div className={styles.rt}>
                    {step === 1 && <motion.div>
                        {builds ? <InlineEdit
                            placeholder="Click to edit ..."
                            style={{ width: 300 }}
                        >
                            <TagPicker
                                value={builds.filter(build => filters.includes(build.id))}
                                onChange={(data: Build[], event) => setFilters(data.map(data => data.id))}
                                data={builds.map(build => ({ label: build.title, value: build.id }))}
                                style={{ width: 500 }}
                            />
                        </InlineEdit> : <Placeholder.Paragraph rows={100} />}
                    </motion.div>}
                    {step === 2 && <>
                        <DateRangePicker
                            value={[dateRange[0].toDate(), dateRange[1].toDate()]}
                            onChange={(date) => date ? setDateRange([dayjs(date[0]), dayjs(date[1])]) : setDateRange([dayjs().subtract(1, 'month'), dayjs().add(1, 'month')])}
                            caretAs={FaCalendar}
                            format={'dd-MM-yyyy'}
                            defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-03-01 23:59:59')]}
                            showMeridian
                            isoWeek />
                    </>}
                    {step === 3 && reportRooms && <HorizontalBarChart groupedRooms={groupedRooms} />}

                    <ButtonToolbar >
                        <Button disabled={step === 1} onClick={onPrevious} startIcon={<PagePreviousIcon />}>{'Назад'}</Button>
                        <Button disabled={step === 3} onClick={onNext} endIcon={<PagePreviousIcon style={{ transform: 'rotate(180deg)' }} />}>{'Далее'}</Button>
                    </ButtonToolbar>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReportModal;