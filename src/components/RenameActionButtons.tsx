
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, RefreshCw } from 'lucide-react';

interface RenameActionButtonsProps {
  onRenameSelected: () => void;
  onRenameAll: () => void;
  onUndo: () => void;
  isProcessing: boolean;
  canUndo: boolean;
}

const RenameActionButtons = ({
  onRenameSelected,
  onRenameAll,
  onUndo,
  isProcessing,
  canUndo
}: RenameActionButtonsProps) => {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full bg-figma-blue hover:bg-figma-blue/90" 
        onClick={onRenameSelected}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Check className="mr-2 h-4 w-4" />
        )}
        Rename Selected Frames
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full border-figma-blue text-figma-blue hover:bg-figma-blue/10"
        onClick={onRenameAll}
        disabled={isProcessing}
      >
        Rename All Frames
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full text-gray-500"
        onClick={onUndo}
        disabled={!canUndo || isProcessing}
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Undo Rename
      </Button>
    </div>
  );
};

export default RenameActionButtons;
