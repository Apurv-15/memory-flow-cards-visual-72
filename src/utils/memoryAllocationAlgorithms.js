
// Memory Allocation Algorithms

// First Fit Algorithm
export const firstFit = (memoryBlocks, processes) => {
  // Create a copy of memory blocks to avoid modifying original
  const blocks = [...memoryBlocks].map(block => ({ ...block, allocated: [] }));
  const results = [];
  const unallocated = [];

  // Sort processes by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  for (const process of sortedProcesses) {
    let allocated = false;
    
    // Find the first block that can accommodate the process
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].size >= process.size) {
        // Calculate start and end times
        const startTime = Math.max(
          process.arrivalTime,
          blocks[i].allocated.length > 0 
            ? Math.max(...blocks[i].allocated.map(p => p.endTime))
            : 0
        );
        const endTime = startTime + process.burstTime;
        
        // Check if the time slot is available
        const isTimeSlotAvailable = blocks[i].allocated.every(allocatedProcess => {
          return (startTime >= allocatedProcess.endTime) || 
                 (endTime <= allocatedProcess.startTime);
        });
        
        if (isTimeSlotAvailable) {
          // Allocate process to this block
          blocks[i].allocated.push({
            ...process,
            blockId: blocks[i].id,
            startTime,
            endTime,
            fragmentationSize: blocks[i].size - process.size
          });
          
          results.push({
            processId: process.id,
            blockId: blocks[i].id,
            startTime,
            endTime,
            fragmentationSize: blocks[i].size - process.size
          });
          
          allocated = true;
          break;
        }
      }
    }
    
    if (!allocated) {
      unallocated.push(process);
    }
  }
  
  return { results, unallocated, blocks };
};

// Best Fit Algorithm
export const bestFit = (memoryBlocks, processes) => {
  // Create a copy of memory blocks to avoid modifying original
  const blocks = [...memoryBlocks].map(block => ({ ...block, allocated: [] }));
  const results = [];
  const unallocated = [];

  // Sort processes by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  for (const process of sortedProcesses) {
    let bestFitIndex = -1;
    let bestFitSize = Infinity;
    
    // Find the smallest block that can accommodate the process
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].size >= process.size) {
        const startTime = Math.max(
          process.arrivalTime,
          blocks[i].allocated.length > 0 
            ? Math.max(...blocks[i].allocated.map(p => p.endTime))
            : 0
        );
        const endTime = startTime + process.burstTime;
        
        // Check if the time slot is available
        const isTimeSlotAvailable = blocks[i].allocated.every(allocatedProcess => {
          return (startTime >= allocatedProcess.endTime) || 
                 (endTime <= allocatedProcess.startTime);
        });
        
        if (isTimeSlotAvailable && blocks[i].size - process.size < bestFitSize) {
          bestFitIndex = i;
          bestFitSize = blocks[i].size - process.size;
        }
      }
    }
    
    if (bestFitIndex !== -1) {
      // Calculate start and end times
      const startTime = Math.max(
        process.arrivalTime,
        blocks[bestFitIndex].allocated.length > 0 
          ? Math.max(...blocks[bestFitIndex].allocated.map(p => p.endTime))
          : 0
      );
      const endTime = startTime + process.burstTime;
      
      // Allocate process to this block
      blocks[bestFitIndex].allocated.push({
        ...process,
        blockId: blocks[bestFitIndex].id,
        startTime,
        endTime,
        fragmentationSize: blocks[bestFitIndex].size - process.size
      });
      
      results.push({
        processId: process.id,
        blockId: blocks[bestFitIndex].id,
        startTime,
        endTime,
        fragmentationSize: blocks[bestFitIndex].size - process.size
      });
    } else {
      unallocated.push(process);
    }
  }
  
  return { results, unallocated, blocks };
};

// Worst Fit Algorithm
export const worstFit = (memoryBlocks, processes) => {
  // Create a copy of memory blocks to avoid modifying original
  const blocks = [...memoryBlocks].map(block => ({ ...block, allocated: [] }));
  const results = [];
  const unallocated = [];

  // Sort processes by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

  for (const process of sortedProcesses) {
    let worstFitIndex = -1;
    let worstFitSize = -1;
    
    // Find the largest block that can accommodate the process
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].size >= process.size) {
        const startTime = Math.max(
          process.arrivalTime,
          blocks[i].allocated.length > 0 
            ? Math.max(...blocks[i].allocated.map(p => p.endTime))
            : 0
        );
        const endTime = startTime + process.burstTime;
        
        // Check if the time slot is available
        const isTimeSlotAvailable = blocks[i].allocated.every(allocatedProcess => {
          return (startTime >= allocatedProcess.endTime) || 
                 (endTime <= allocatedProcess.startTime);
        });
        
        if (isTimeSlotAvailable && blocks[i].size - process.size > worstFitSize) {
          worstFitIndex = i;
          worstFitSize = blocks[i].size - process.size;
        }
      }
    }
    
    if (worstFitIndex !== -1) {
      // Calculate start and end times
      const startTime = Math.max(
        process.arrivalTime,
        blocks[worstFitIndex].allocated.length > 0 
          ? Math.max(...blocks[worstFitIndex].allocated.map(p => p.endTime))
          : 0
      );
      const endTime = startTime + process.burstTime;
      
      // Allocate process to this block
      blocks[worstFitIndex].allocated.push({
        ...process,
        blockId: blocks[worstFitIndex].id,
        startTime,
        endTime,
        fragmentationSize: blocks[worstFitIndex].size - process.size
      });
      
      results.push({
        processId: process.id,
        blockId: blocks[worstFitIndex].id,
        startTime,
        endTime,
        fragmentationSize: blocks[worstFitIndex].size - process.size
      });
    } else {
      unallocated.push(process);
    }
  }
  
  return { results, unallocated, blocks };
};

// Generate random colors
export const generateColorForProcess = (index) => {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#F9CB40", "#8675A9", "#41B3A3",
    "#E27D60", "#85CDCA", "#E8A87C", "#C38D9E", "#32746D",
    "#F6AE2D", "#F26419", "#55DDE0", "#33658A", "#2F4858"
  ];
  return colors[index % colors.length];
};
