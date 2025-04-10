
import React from 'react';

const BlocksTable = ({ blocks, onDeleteBlock }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="apple-card p-4 flex items-center justify-center">
        <p className="text-gray-500">No memory blocks added yet</p>
      </div>
    );
  }

  return (
    <div className="apple-card">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Memory Blocks</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left font-medium">ID</th>
              <th className="py-2 px-4 text-left font-medium">Size</th>
              <th className="py-2 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <tr key={block.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b border-gray-100">
                  Block {block.id.split('-')[1]}
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  {block.size} MB
                </td>
                <td className="py-2 px-4 border-b border-gray-100">
                  <button
                    onClick={() => onDeleteBlock(block.id)}
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

export default BlocksTable;
