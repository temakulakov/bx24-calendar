import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ReportRoom } from "../../../../types/type";

interface HorizontalBarChartProps {
    groupedRooms: {
        [buildTitle: string]: ReportRoom[];
    };
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ groupedRooms }) => {
    const data = Object.entries(groupedRooms).flatMap(([buildTitle, rooms]) =>
        rooms.map(room => ({
            buildTitle,
            title: room.title,
            hours: room.hours,
            percents: room.percents,
            color: room.color,
        }))
    );

    const groupedData = Object.entries(groupedRooms).map(([buildTitle, rooms]) => ({
        buildTitle,
        rooms: rooms.map(room => ({
            title: room.title,
            hours: room.hours,
            percents: room.percents,
            color: room.color,
        })),
    }));

    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="buildTitle" />
                <Tooltip formatter={(value, name, props) => {
                    const { title, hours, percents } = props.payload;
                    return [`${hours} hours, ${(percents * 100).toFixed(2)}%`, title];
                }} />
                {groupedData.map(group => (
                    <Bar
                        key={group.buildTitle}
                        dataKey="percents"
                        data={group.rooms.map(room => ({
                            ...room,
                            buildTitle: group.buildTitle,
                        }))}
                        barSize={20}
                    >
                        {group.rooms.map((room, index) => (
                            <Cell key={`cell-${index}`} fill={room.color} />
                        ))}
                    </Bar>
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HorizontalBarChart;
