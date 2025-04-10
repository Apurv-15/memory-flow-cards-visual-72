
import React, { useState } from 'react';

const ProcessCard = ({ onAddProcess, processCount }) => {
  const [processSize, setProcessSize] = useState('');
  const [burstTime, setBurstTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  
  const handleAddProcess = () => {
    if (
      processSize && !isNaN(processSize) && parseInt(processSize) > 0 &&
      burstTime && !isNaN(burstTime) && parseInt(burstTime) > 0 &&
      arrivalTime && !isNaN(arrivalTime) && parseInt(arrivalTime) >= 0
    ) {
      onAddProcess({
        id: `process-${processCount}`,
        name: `P${processCount}`,
        size: parseInt(processSize),
        burstTime: parseInt(burstTime),
        arrivalTime: parseInt(arrivalTime),
      });
      setProcessSize('');
      setBurstTime('');
      setArrivalTime('');
    }
  };

  return (
    <div className="apple-card animate-scale-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Process</h3>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Process Size (MB)
        </label>
        <input
          type="number"
          className="apple-input w-full"
          value={processSize}
          onChange={(e) => setProcessSize(e.target.value)}
          placeholder="Enter process size"
          min="1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Burst Time
        </label>
        <input
          type="number"
          className="apple-input w-full"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
          placeholder="Enter burst time"
          min="1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Arrival Time
        </label>
        <input
          type="number"
          className="apple-input w-full"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          placeholder="Enter arrival time"
          min="0"
        />
      </div>
      <button 
        className="apple-button w-full"
        onClick={handleAddProcess}
      >
        Add Process
      </button>
    </div>
  );
};

export default ProcessCard;
