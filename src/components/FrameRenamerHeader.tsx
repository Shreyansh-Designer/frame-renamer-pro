
import React from 'react';
import { Separator } from '@/components/ui/separator';

const FrameRenamerHeader = () => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div className="bg-figma-blue w-6 h-6 rounded mr-2 flex items-center justify-center">
          <span className="text-white font-semibold text-xs">F</span>
        </div>
        <h1 className="text-lg font-semibold text-figma-text">Frame Renamer Pro</h1>
      </div>
      <Separator className="my-2" />
      <p className="text-sm text-gray-600">
        Automatically rename frames based on title text
      </p>
    </div>
  );
};

export default FrameRenamerHeader;
