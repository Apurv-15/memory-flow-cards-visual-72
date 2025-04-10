
import React, { useState } from 'react';

const MemoryBlockCard = ({ onAddBlock, blockCount }) => {
  const [blockSize, setBlockSize] = useState('');
  
  const handleAddBlock = () => {
    if (blockSize && !isNaN(blockSize) && parseInt(blockSize) > 0) {
      onAddBlock({
        id: `block-${blockCount}`,
        size: parseInt(blockSize),
      });
      setBlockSize('');
    }
  };

  return (
    <div className="apple-card animate-scale-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Memory Block</h3>
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Block Size (MB)
        </label>
        <input
          type="number"
          className="apple-input w-full"
          value={blockSize}
          onChange={(e) => setBlockSize(e.target.value)}
          placeholder="Enter block size"
          min="1"
        />
      </div>
      <button 
        className="apple-button w-full"
        onClick={handleAddBlock}
      >
        Add Memory Block
      </button>
    </div>
  );
};

export default MemoryBlockCard;
