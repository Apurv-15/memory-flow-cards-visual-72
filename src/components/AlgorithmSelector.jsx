
import React from 'react';

const AlgorithmSelector = ({ selectedAlgorithm, onSelectAlgorithm }) => {
  const algorithms = [
    { id: 'first-fit', name: 'First Fit' },
    { id: 'best-fit', name: 'Best Fit' },
    { id: 'worst-fit', name: 'Worst Fit' },
  ];

  return (
    <div className="apple-card animate-scale-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Memory Allocation Algorithm</h3>
      <div className="flex justify-center space-x-1 bg-gray-100 p-1 rounded-lg">
        {algorithms.map((algorithm) => (
          <button
            key={algorithm.id}
            className={`py-2 px-4 rounded-lg transition-all ${
              selectedAlgorithm === algorithm.id
                ? 'bg-white shadow-md text-apple-blue font-medium'
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => onSelectAlgorithm(algorithm.id)}
          >
            {algorithm.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
