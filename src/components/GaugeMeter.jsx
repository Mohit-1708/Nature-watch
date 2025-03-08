import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import "../styles/GaugeMeter.css";

const GaugeMeter = ({ title, value, unit, min = 0, max = 100 }) => {
  const data = [{ name: title, value }];
  const formattedValue = value.toFixed(1); // Limit decimal places

  return (
    <div className="gauge-card">
      <h3 className="gauge-title">{title}</h3>
      <ResponsiveContainer width={180} height={120}>
        <RadialBarChart
          cx="50%"
          cy="100%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={15}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis
            type="number"
            domain={[min, max]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            fill={value > 75 ? "#ff7300" : value > 50 ? "#ffcc00" : "#4caf50"}
            background={{ fill: "#e0e0e0" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="gauge-value">
        {formattedValue} <span className="gauge-unit">{unit}</span>
      </p>
    </div>
  );
};

export default GaugeMeter;
