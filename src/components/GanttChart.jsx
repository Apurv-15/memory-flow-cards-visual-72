
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { generateColorForProcess } from '../utils/memoryAllocationAlgorithms';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GanttChart = ({ results, memoryBlocks }) => {
  if (!results || results.length === 0 || !memoryBlocks || memoryBlocks.length === 0) {
    return (
      <div className="apple-card h-64 flex items-center justify-center">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  // Find the maximum end time for the chart
  const maxEndTime = Math.max(...results.map(result => result.endTime));
  
  // Transform the results into a format suitable for the Gantt chart
  const datasets = memoryBlocks.map((block, blockIndex) => {
    // Find all processes allocated to this block
    const blockProcesses = results.filter(result => result.blockId === block.id);
    
    const data = [];
    const processColors = [];
    const processLabels = [];
    
    // For each process, create a bar segment
    blockProcesses.forEach((process, processIndex) => {
      data.push({
        x: [process.startTime, process.endTime],
        y: block.id,
        processId: process.processId
      });
      
      // Use consistent colors for processes based on their index
      const color = generateColorForProcess(processIndex);
      processColors.push(color);
      processLabels.push(`Process ${process.processId.split('-')[1]}`);
    });
    
    return {
      label: `Block ${block.id.split('-')[1]} (${block.size}MB)`,
      data,
      backgroundColor: processColors,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      borderSkipped: false,
      borderRadius: 4,
      processLabels
    };
  });

  // Chart options
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: maxEndTime + 1,
        title: {
          display: true,
          text: 'Time',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'Memory Blocks',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const dataIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const processLabel = datasets[datasetIndex].processLabels[dataIndex];
            const data = datasets[datasetIndex].data[dataIndex];
            return [
              `${processLabel}`,
              `Start Time: ${data.x[0]}`,
              `End Time: ${data.x[1]}`,
              `Duration: ${data.x[1] - data.x[0]}`
            ];
          }
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Memory Allocation Gantt Chart',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div className="apple-card h-72 sm:h-80 md:h-96">
      <Bar 
        data={{ datasets }} 
        options={options} 
        className="w-full h-full"
      />
    </div>
  );
};

export default GanttChart;
