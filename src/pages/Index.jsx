
import React, { useState, useEffect, useRef } from 'react';
import AlgorithmSelector from '../components/AlgorithmSelector';
import MemoryBlockCard from '../components/MemoryBlockCard';
import ProcessCard from '../components/ProcessCard';
import GanttChart from '../components/GanttChart';
import ResultsTable from '../components/ResultsTable';
import BlocksTable from '../components/BlocksTable';
import ProcessesTable from '../components/ProcessesTable';
import { firstFit, bestFit, worstFit } from '../utils/memoryAllocationAlgorithms';
import { toast } from 'sonner';
import gsap from 'gsap';

const Index = () => {
  const [memoryBlocks, setMemoryBlocks] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('first-fit');
  const [results, setResults] = useState(null);
  const [blockCount, setBlockCount] = useState(1);
  const [processCount, setProcessCount] = useState(1);
  const [showResults, setShowResults] = useState(false);
  
  const cardsRef = useRef(null);
  
  useEffect(() => {
    // Add GSAP animation for cards when component mounts
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleAddBlock = (block) => {
    setMemoryBlocks([...memoryBlocks, block]);
    setBlockCount(blockCount + 1);
    toast.success("Memory block added");
  };

  const handleDeleteBlock = (blockId) => {
    setMemoryBlocks(memoryBlocks.filter(block => block.id !== blockId));
    toast.success("Memory block deleted");
  };

  const handleAddProcess = (process) => {
    setProcesses([...processes, process]);
    setProcessCount(processCount + 1);
    toast.success("Process added");
  };

  const handleDeleteProcess = (processId) => {
    setProcesses(processes.filter(process => process.id !== processId));
    toast.success("Process deleted");
  };

  const runAlgorithm = () => {
    if (memoryBlocks.length === 0) {
      toast.error("Please add at least one memory block");
      return;
    }

    if (processes.length === 0) {
      toast.error("Please add at least one process");
      return;
    }

    let allocationResults;

    switch (selectedAlgorithm) {
      case 'first-fit':
        allocationResults = firstFit(memoryBlocks, processes);
        break;
      case 'best-fit':
        allocationResults = bestFit(memoryBlocks, processes);
        break;
      case 'worst-fit':
        allocationResults = worstFit(memoryBlocks, processes);
        break;
      default:
        allocationResults = firstFit(memoryBlocks, processes);
    }

    // Enhance the results with full process and block info
    const enhancedResults = allocationResults.results.map(result => {
      const process = processes.find(p => p.id === result.processId);
      const block = memoryBlocks.find(b => b.id === result.blockId);
      
      return {
        ...result,
        size: process.size,
        blockSize: block.size
      };
    });

    setResults({
      results: enhancedResults,
      unallocated: allocationResults.unallocated,
      blocks: allocationResults.blocks
    });
    
    setShowResults(true);
    toast.success("Memory allocation complete");
    
    // Scroll to results with GSAP animation
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: resultsSection, offsetY: 50 },
          ease: "power2.inOut"
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-apple-gray pb-16">
      <header className="bg-white py-6 shadow-sm mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Memory Allocation Visualizer</h1>
          <p className="text-gray-600 mt-2">
            Simulate and visualize memory allocation algorithms
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div ref={cardsRef} className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mb-8">
          {/* Cards in the requested order */}
          <div className="w-full md:w-auto flex-1 min-w-[300px]">
            <MemoryBlockCard 
              onAddBlock={handleAddBlock} 
              blockCount={blockCount} 
            />
          </div>
          <div className="w-full md:w-auto flex-1 min-w-[300px]">
            <ProcessCard 
              onAddProcess={handleAddProcess} 
              processCount={processCount}
            />
          </div>
          <div className="w-full md:w-auto flex-1 min-w-[300px]">
            <AlgorithmSelector 
              selectedAlgorithm={selectedAlgorithm} 
              onSelectAlgorithm={setSelectedAlgorithm} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <BlocksTable 
            blocks={memoryBlocks} 
            onDeleteBlock={handleDeleteBlock} 
          />
          <ProcessesTable 
            processes={processes} 
            onDeleteProcess={handleDeleteProcess} 
          />
        </div>
        
        <div className="flex justify-center mb-12">
          <button 
            className="apple-button py-3 px-8 text-lg"
            onClick={runAlgorithm}
          >
            Run Allocation
          </button>
        </div>

        {showResults && (
          <div id="results-section" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Allocation Results</h2>
            
            <div className="mb-8">
              <GanttChart 
                results={results?.results || []} 
                memoryBlocks={memoryBlocks} 
              />
            </div>

            <div className="mb-8">
              <ResultsTable 
                results={results?.results || []} 
                unallocated={results?.unallocated || []} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
