
import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface ProgressChartProps {
  percentage: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ percentage }) => {
  const data = [
    {
      name: 'التقدم',
      uv: percentage,
      fill: '#3b82f6',
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart 
        cx="50%" 
        cy="50%" 
        innerRadius="60%" 
        outerRadius="80%" 
        barSize={20} 
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
        />
        <RadialBar
          background
          dataKey="uv"
          angleAxisId={0}
          cornerRadius={10}
        />
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-gray-800 dark:text-white text-4xl font-bold"
        >
            {`${Math.round(percentage)}%`}
        </text>
         <text
            x="50%"
            y="65%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-gray-500 dark:text-gray-400 text-lg"
        >
            إنجاز
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
