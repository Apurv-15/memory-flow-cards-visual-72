
import React from 'react';

const ResultsTable = ({ results, unallocated }) => {
  if (!results || results.length === 0) {
    return (
      <div className="apple-card flex items-center justify-center p-8">
        <p className="text-gray-500">No results to display</p>
      </div>
    );
  }

  return (
    <div className="apple-card overflow-hidden">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Allocation Results</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left font-medium">Process</th>
              <th className="py-3 px-4 text-left font-medium">Memory Block</th>
              <th className="py-3 px-4 text-left font-medium">Process Size</th>
              <th className="py-3 px-4 text-left font-medium">Block Size</th>
              <th className="py-3 px-4 text-left font-medium">Start Time</th>
              <th className="py-3 px-4 text-left font-medium">End Time</th>
              <th className="py-3 px-4 text-left font-medium">Fragmentation</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.processId.split('-')[1]}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.blockId.split('-')[1]}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.size} MB
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.blockSize} MB
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.startTime}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.endTime}
                </td>
                <td className="py-3 px-4 border-b border-gray-100">
                  {result.fragmentationSize} MB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {unallocated && unallocated.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2 text-red-600">Unallocated Processes</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-red-50 text-red-800">
                  <th className="py-2 px-4 text-left font-medium">Process</th>
                  <th className="py-2 px-4 text-left font-medium">Size</th>
                  <th className="py-2 px-4 text-left font-medium">Burst Time</th>
                  <th className="py-2 px-4 text-left font-medium">Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {unallocated.map((process, index) => (
                  <tr key={index} className="bg-red-50/50">
                    <td className="py-2 px-4 border-b border-red-100">
                      {process.id.split('-')[1]}
                    </td>
                    <td className="py-2 px-4 border-b border-red-100">
                      {process.size} MB
                    </td>
                    <td className="py-2 px-4 border-b border-red-100">
                      {process.burstTime}
                    </td>
                    <td className="py-2 px-4 border-b border-red-100">
                      {process.arrivalTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
