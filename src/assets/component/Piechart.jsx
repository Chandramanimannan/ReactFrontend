import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Succeed", value: 358 },
  { name: "Pending", value: 124 },
  { name: "Failed", value: 98 },
];

const COLORS = ["#3CB371", "#ffc125", "#F08080"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div className="piecustomTooltip">
        <p>{`${dataPoint.value}`}</p>
      </div>
    );
  }
  return null;
};

export default class Piechart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="50%">
        <PieChart className="pieContainer">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} cursor={false}></Tooltip>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
