
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AlgorithmSelector = ({ selectedAlgorithm, onSelectAlgorithm }) => {
  const algorithms = [
    { id: 'first-fit', name: 'First Fit' },
    { id: 'best-fit', name: 'Best Fit' },
    { id: 'worst-fit', name: 'Worst Fit' },
  ];
  
  const cardRef = useRef(null);
  const buttonsRef = useRef([]);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
    
    // Animate buttons
    if (buttonsRef.current.length) {
      gsap.fromTo(
        buttonsRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, []);
  
  const handleAlgorithmSelect = (algorithmId) => {
    onSelectAlgorithm(algorithmId);
    
    // Animate selected button
    const selectedButton = buttonsRef.current.find(
      button => button && button.getAttribute('data-algorithm') === algorithmId
    );
    
    if (selectedButton) {
      gsap.fromTo(
        selectedButton,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  };

  return (
    <div ref={cardRef} className="apple-card h-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Memory Allocation Algorithm</h3>
      <div className="flex justify-center space-x-1 bg-gray-100 p-1 rounded-lg">
        {algorithms.map((algorithm, index) => (
          <button
            key={algorithm.id}
            ref={el => buttonsRef.current[index] = el}
            data-algorithm={algorithm.id}
            className={`py-2 px-4 rounded-lg transition-all ${
              selectedAlgorithm === algorithm.id
                ? 'bg-white shadow-md text-apple-blue font-medium'
                : 'text-gray-600 hover:bg-white/50'
            }`}
            onClick={() => handleAlgorithmSelect(algorithm.id)}
          >
            {algorithm.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
