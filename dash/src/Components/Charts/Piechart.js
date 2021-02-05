import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Tooltip
} from 'recharts';
import Title from '../ClientBoard/Title';

const data = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = '//jsfiddle.net/alidingling/6okmehja/';

  render() {
    return (
      <>
        <Title>TEST</Title>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
               <Pie data={data} innerRadius={70} outerRadius={100} fill="#82ca9d"/>  
               <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  }
}
