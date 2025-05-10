
# Sensor Stream Viewer

A React application that connects to a mock sensor server and displays real-time data from multiple devices.

## Features

- Real-time data streaming from a mock server
- Dashboard view showing data from multiple devices simultaneously
- Detailed view for each individual device
- Historical data visualization using line charts
- Responsive design that works on desktop and mobile

## Project Structure

```
src/
├── components/       # React components
├── contexts/         # Context providers
├── server/           # Mock server implementation
├── lib/              # Utility functions
└── pages/            # Main pages
```

## Data Format

The application receives data in the following format:

```
D1VxxCyyTzz
D2VxxCyyTzz
```

Where:
- D1 / D2: Device ID
- Vxx: Voltage (value between 0–99)
- Cyy: Current (value between 0–99)
- Tzz: Temperature (value between 0–99)

## How to Run

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:8080`

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui for UI components
- Recharts for data visualization
- EventEmitter for the mock server implementation

## Implementation Details

### Mock Server

Instead of setting up a real backend server, this project includes a mock server implementation that:
- Generates random sensor data for two devices (D1 and D2)
- Emits data events every 1-2 seconds
- Formats the data according to the specified format

### Data Flow

1. The `MockSensorServer` generates random data
2. The `SensorProvider` context:
   - Listens for data events
   - Parses the data strings
   - Maintains current and historical data state
3. UI components consume the context and render the data

## Future Improvements

- Add more devices
- Implement data filtering options
- Add alerts for threshold values
- Add data export functionality
- Implement offline storage
