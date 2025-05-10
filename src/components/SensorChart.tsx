
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SensorData } from '../contexts/SensorContext';

interface SensorChartProps {
  data: SensorData[];
  type: 'voltage' | 'current' | 'temperature';
}

const SensorChart: React.FC<SensorChartProps> = ({ data, type }) => {
  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center">No data available</div>;
  }
  
  const chartData = data.map((item) => ({
    timestamp: item.timestamp.toLocaleTimeString(),
    value: item[type]
  }));
  
  // Define colors and labels based on the type
  const getChartConfig = () => {
    switch (type) {
      case 'voltage':
        return { color: '#3b82f6', label: 'Voltage (V)' };
      case 'current':
        return { color: '#10b981', label: 'Current (A)' };
      case 'temperature':
        return { color: '#ef4444', label: 'Temperature (°C)' };
      default:
        return { color: '#3b82f6', label: 'Value' };
    }
  };
  
  const { color, label } = getChartConfig();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-700">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="timestamp" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => {
                  const parts = value.split(':');
                  return `${parts[0]}:${parts[1]}`;
                }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'  
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                dot={{ r: 1, strokeWidth: 2, fill: 'white' }} 
                activeDot={{ r: 4 }} 
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorChart;
