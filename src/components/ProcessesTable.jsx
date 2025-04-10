
import React from 'react';

const ProcessesTable = ({ processes, onDeleteProcess }) => {
  if (!processes || processes.length === 0) {
    return (
      <div className="apple-card p-4 flex items-center justify-center">
        <p className="text-gray-500">No processes added yet</p>
      </div>
    );
  }

  return (
    <div className="apple-card">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Processes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left font-medium">ID</th>
              <th className="py-2 px-4 text-left font-medium">Size</th>
              <th className="py-2 px-4 text-left font-medium">Burst Time</th>
              <th className="py-2 px-4 text-left font-medium">Arrival Time</th>
              <th className="py-2 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={process.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b border-gray-100">
                  P{process.id.split('-')[1]}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {process.size} MB
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {process.burstTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {process.arrivalTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  <button
                    onClick={() => onDeleteProcess(process.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessesTable;
