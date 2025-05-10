
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSensorContext } from '../contexts/SensorContext';
import SensorCard from './SensorCard';
import SensorChart from './SensorChart';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from "@/components/ui/card";

const DeviceDetail: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { currentData, dataHistory } = useSensorContext();
  
  // Format device ID to match the data format (D1, D2)
  const formattedDeviceId = `D${deviceId}`;
  const deviceData = currentData[formattedDeviceId];
  const deviceHistoryData = dataHistory[formattedDeviceId] || [];
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">
          {formattedDeviceId === 'D1' ? 'Device 1' : 'Device 2'} Details
        </h1>
      </div>
      
      {/* Device Data Card */}
      <div className="max-w-md mx-auto">
        {deviceData ? (
          <SensorCard data={deviceData} />
        ) : (
          <Card className="flex items-center justify-center h-64">
            <p className="text-slate-500">Waiting for {formattedDeviceId} data...</p>
          </Card>
        )}
      </div>
      
      {/* Charts */}
      {deviceHistoryData.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center">Historical Data</h2>
          
          {/* Large charts for better visualization */}
          <div className="space-y-6">
            <SensorChart data={deviceHistoryData} type="voltage" />
            <SensorChart data={deviceHistoryData} type="current" />
            <SensorChart data={deviceHistoryData} type="temperature" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;
