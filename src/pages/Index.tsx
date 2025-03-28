
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import FrameRenamerHeader from '@/components/FrameRenamerHeader';
import FrameStatsCard from '@/components/FrameStatsCard';
import RenameActionButtons from '@/components/RenameActionButtons';
import StatusMessage from '@/components/StatusMessage';
import HelpText from '@/components/HelpText';
import * as figmaService from '@/services/figmaService';

const Index = () => {
  const { toast } = useToast();
  const [frameStats, setFrameStats] = useState({ total: 0, selected: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [status, setStatus] = useState<{ 
    type: 'success' | 'error' | 'info' | null; 
    message: string;
    details?: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    // Get initial frame stats
    const stats = figmaService.getFrameStats();
    setFrameStats(stats);
  }, []);

  const handleRenameSelected = async () => {
    setIsProcessing(true);
    setStatus({ type: 'info', message: 'Renaming selected frames...' });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const result = figmaService.renameSelectedFrames();
      
      if (result.success > 0) {
        setCanUndo(true);
        setStatus({ 
          type: 'success', 
          message: `Successfully renamed ${result.success} frames`,
          details: result.failed > 0 ? `${result.failed} frames had no detectable title` : undefined
        });
        
        toast({
          title: "Frames Renamed",
          description: `${result.success} frames were successfully renamed.`,
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: 'No frames were renamed',
          details: 'Selected frames may not contain title text'
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error renaming frames',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRenameAll = async () => {
    setIsProcessing(true);
    setStatus({ type: 'info', message: 'Renaming all frames...' });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    try {
      const result = figmaService.renameAllFrames();
      
      if (result.success > 0) {
        setCanUndo(true);
        setStatus({ 
          type: 'success', 
          message: `Successfully renamed ${result.success} frames`,
          details: result.failed > 0 ? `${result.failed} frames had no detectable title` : undefined
        });
        
        toast({
          title: "All Frames Renamed",
          description: `${result.success} frames were successfully renamed.`,
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: 'No frames were renamed',
          details: 'Frames may not contain title text'
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error renaming frames',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = async () => {
    setIsProcessing(true);
    setStatus({ type: 'info', message: 'Undoing rename operations...' });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const undoCount = figmaService.undoRenameOperations();
      
      if (undoCount > 0) {
        setStatus({ 
          type: 'success', 
          message: `Undid rename for ${undoCount} frames`,
        });
        
        setCanUndo(false);
        
        toast({
          title: "Changes Undone",
          description: `Reverted ${undoCount} frames to their original names.`,
        });
      } else {
        setStatus({ 
          type: 'info', 
          message: 'Nothing to undo',
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error undoing operations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto p-6">
        <FrameRenamerHeader />
        
        <FrameStatsCard 
          totalFrames={frameStats.total} 
          selectedFrames={frameStats.selected} 
        />
        
        {status.type && (
          <StatusMessage 
            status={status.type} 
            message={status.message} 
            details={status.details} 
          />
        )}
        
        <RenameActionButtons 
          onRenameSelected={handleRenameSelected}
          onRenameAll={handleRenameAll}
          onUndo={handleUndo}
          isProcessing={isProcessing}
          canUndo={canUndo}
        />
        
        <HelpText />
      </div>
    </div>
  );
};

export default Index;
