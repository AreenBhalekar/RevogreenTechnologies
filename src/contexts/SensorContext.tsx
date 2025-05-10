import React, { createContext, useContext, useState, useEffect } from 'react';
import mockServer from '../server/mockServer';

// Define types for our sensor data
export interface SensorData {
  deviceId: string;
  voltage: number;
  current: number;
  temperature: number;
  timestamp: Date;
}

export interface DeviceHistory {
  [deviceId: string]: SensorData[];
}

interface SensorContextType {
  currentData: { [deviceId: string]: SensorData };
  dataHistory: DeviceHistory;
  parseDataString: (dataString: string) => SensorData;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};

export const SensorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentData, setCurrentData] = useState<{ [deviceId: string]: SensorData }>({});
  const [dataHistory, setDataHistory] = useState<DeviceHistory>({});

  // Parse incoming data strings
  const parseDataString = (dataString: string): SensorData => {
    const deviceId = dataString.substring(0, 2);
    const voltage = parseInt(dataString.substring(3, 5), 10);
    const current = parseInt(dataString.substring(6, 8), 10);
    const temperature = parseInt(dataString.substring(9, 11), 10);

    return {
      deviceId,
      voltage,
      current,
      temperature,
      timestamp: new Date()
    };
  };

  useEffect(() => {
    // Handle incoming data from the mock server
    const handleData = (dataString: string) => {
      const parsedData = parseDataString(dataString);
      
      // Update current data
      setCurrentData(prev => ({
        ...prev,
        [parsedData.deviceId]: parsedData
      }));
      
      // Update history data (keeping last 20 entries)
      setDataHistory(prev => {
        const deviceHistory = prev[parsedData.deviceId] || [];
        return {
          ...prev,
          [parsedData.deviceId]: [
            ...deviceHistory.slice(-19),
            parsedData
          ]
        };
      });
    };

    // Start the server and listen for data
    mockServer.on('data', handleData);
    mockServer.start();

    return () => {
      // Clean up
      mockServer.off('data', handleData);
      mockServer.stop();
    };
  }, []);

  return (
    <SensorContext.Provider value={{ currentData, dataHistory, parseDataString }}>
      {children}
    </SensorContext.Provider>
  );
};
