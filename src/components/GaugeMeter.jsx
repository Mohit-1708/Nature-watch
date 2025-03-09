import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import "../styles/GaugeMeter.css";

const GaugeMeter = ({ title, value, unit, min = 0, max = 100 }) => {
  const data = [{ name: title, value }];
  const formattedValue = value.toFixed(1); // Limit decimal places

  // Define max scale for AQI separately (0-500)
  const isAQI = title.toLowerCase().includes("aqi");
  const gaugeMax = isAQI ? 500 : max;

  // Define color based on AQI severity
  const getColor = (val) => {
    if (!isAQI) return val > 75 ? "#ff7300" : val > 50 ? "#ffcc00" : "#4caf50";

    if (val <= 50) return "#4caf50";  // Good
    if (val <= 100) return "#ffcc00"; // Moderate
    if (val <= 150) return "#ff9900"; // Unhealthy for sensitive groups
    if (val <= 200) return "#ff0000"; // Unhealthy
    if (val <= 300) return "#990099"; // Very Unhealthy
    return "#660000"; // Hazardous
  };

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
            domain={[min, gaugeMax]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            fill={getColor(value)}
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
