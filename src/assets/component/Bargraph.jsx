import React, { PureComponent } from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Page A", uv: 4000 },
  { name: "Page B", uv: 3000 },
  { name: "Page C", uv: 2000 },
  { name: "Page D", uv: 2780 },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0];
    return (
      <div className="barcustomTooltip">
        <p>{`${label}`}</p>
        <p>{`${dataPoint.name} : ${dataPoint.value}`}</p>
      </div>
    );
  }
  return null;
};

class Bargraph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer className="barContainer" width="50%">
        <BarChart data={data}>
          <Bar
            dataKey="uv"
            fill="#ffffff"
            maxBarSize={8}
            activeBar={{ strokeWidth: 0.5, fill: "#9375fc" }}
            animationDuration={1500}
          />
          <Tooltip content={<CustomTooltip />} cursor={false}></Tooltip>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Bargraph;
