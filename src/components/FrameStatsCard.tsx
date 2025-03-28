
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FrameStatsCardProps {
  totalFrames: number;
  selectedFrames: number;
}

const FrameStatsCard = ({ totalFrames, selectedFrames }: FrameStatsCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between">
          <div className="text-sm">
            <p className="text-gray-500">Total Frames</p>
            <p className="font-medium text-figma-text">{totalFrames}</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Selected</p>
            <p className="font-medium text-figma-text">{selectedFrames}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrameStatsCard;
