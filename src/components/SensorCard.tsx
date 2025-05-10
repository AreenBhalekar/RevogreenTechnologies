
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Gauge, Thermometer, Database } from "lucide-react";

import { SensorData } from '../contexts/SensorContext';

interface SensorCardProps {
  data: SensorData;
}

const SensorCard: React.FC<SensorCardProps> = ({ data }) => {
  return (
    <Card className="shadow-lg border-2 overflow-hidden">
      <CardHeader className="bg-slate-800 text-white pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {data.deviceId === 'D1' ? 'Device 1' : 'Device 2'}
          </span>
          <span className="text-sm text-slate-300">
            {data.timestamp.toLocaleTimeString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Voltage */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-blue-500" />
              <span className="text-slate-500 font-medium">Voltage:</span>
            </div>
            <span className="text-xl font-bold">{data.voltage} V</span>
          </div>
          <Progress value={data.voltage} className="h-2" />
        </div>
        
        <Separator />
        
        {/* Current */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-500" />
              <span className="text-slate-500 font-medium">Current:</span>
            </div>
            <span className="text-xl font-bold">{data.current} A</span>
          </div>
          <Progress value={data.current} className="h-2" />
        </div>
        
        <Separator />
        
        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <span className="text-slate-500 font-medium">Temperature:</span>
            </div>
            <span className="text-xl font-bold">{data.temperature} °C</span>
          </div>
          <Progress 
            value={data.temperature} 
            className={`h-2 ${data.temperature > 80 ? 'bg-red-500' : data.temperature > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
