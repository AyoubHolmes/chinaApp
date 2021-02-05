import React from 'react';
import Title from '../ClientBoard/Title';
import { BarChart, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Bar, ResponsiveContainer} from 'recharts';

        
const BarCharts = () => {
    const data = [
        {"name": "TST1", "MAD": 120},
        {"name": "TST2", "MAD": 10},
        {"name": "TST3", "MAD": 20}
    ]
    return (
        <>
            <Title>Overview of Products sales</Title>
            <ResponsiveContainer>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="MAD" fill="#DC143C" />
                </BarChart>
        </ResponsiveContainer>
        </>
    );
};

export default BarCharts;