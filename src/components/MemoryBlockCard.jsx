
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const MemoryBlockCard = ({ onAddBlock, blockCount }) => {
  const [blockSize, setBlockSize] = useState('');
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);
  
  const handleAddBlock = () => {
    if (blockSize && !isNaN(blockSize) && parseInt(blockSize) > 0) {
      // Animate the button press
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          onAddBlock({
            id: `block-${blockCount}`,
            size: parseInt(blockSize),
          });
          setBlockSize('');
        }
      });
    }
  };

  return (
    <div ref={cardRef} className="apple-card h-full">
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
