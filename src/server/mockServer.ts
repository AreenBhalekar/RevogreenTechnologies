
import { EventEmitter } from 'events';

// Mock server to generate sensor data
class MockSensorServer extends EventEmitter {
  private interval: NodeJS.Timeout | null = null;
  private isRunning = false;
  
  constructor() {
    super();
  }

  // Start generating random sensor data
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.interval = setInterval(() => {
      // Generate data for Device 1
      const d1Voltage = Math.floor(Math.random() * 100);
      const d1Current = Math.floor(Math.random() * 100);
      const d1Temp = Math.floor(Math.random() * 100);
      
      // Generate data for Device 2
      const d2Voltage = Math.floor(Math.random() * 100);
      const d2Current = Math.floor(Math.random() * 100);
      const d2Temp = Math.floor(Math.random() * 100);

      // Format data strings
      const d1Data = `D1V${d1Voltage.toString().padStart(2, '0')}C${d1Current.toString().padStart(2, '0')}T${d1Temp.toString().padStart(2, '0')}`;
      const d2Data = `D2V${d2Voltage.toString().padStart(2, '0')}C${d2Current.toString().padStart(2, '0')}T${d2Temp.toString().padStart(2, '0')}`;

      // Emit the data events
      this.emit('data', d1Data);
      setTimeout(() => {
        this.emit('data', d2Data);
      }, 500); // Stagger the events a bit
      
    }, 1500); // Generate data every 1.5 seconds
  }

  // Stop generating data
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
  }
}

const mockServer = new MockSensorServer();
export default mockServer;
