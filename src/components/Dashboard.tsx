
import React from 'react';
import { useSensorContext } from '../contexts/SensorContext';
import SensorCard from './SensorCard';
import SensorChart from './SensorChart';
import { Card, CardContent } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const { currentData, dataHistory } = useSensorContext();

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">Revogreen Technologies Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device 1 Data Card */}
        {currentData.D1 ? (
          <SensorCard data={currentData.D1} />
        ) : (
          <Card className="flex items-center justify-center h-64">
            <p className="text-slate-500">Waiting for Device 1 data...</p>
          </Card>
        )}
        
        {/* Device 2 Data Card */}
        {currentData.D2 ? (
          <SensorCard data={currentData.D2} />
        ) : (
          <Card className="flex items-center justify-center h-64">
            <p className="text-slate-500">Waiting for Device 2 data...</p>
          </Card>
        )}
      </div>
      
      {/* Charts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Trends</h2>
        
        {/* Device 1 Charts */}
        {dataHistory.D1 && dataHistory.D1.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Device 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SensorChart data={dataHistory.D1} type="voltage" />
              <SensorChart data={dataHistory.D1} type="current" />
              <SensorChart data={dataHistory.D1} type="temperature" />
            </div>
          </div>
        )}
        
        {/* Device 2 Charts */}
        {dataHistory.D2 && dataHistory.D2.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Device 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SensorChart data={dataHistory.D2} type="voltage" />
              <SensorChart data={dataHistory.D2} type="current" />
              <SensorChart data={dataHistory.D2} type="temperature" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
